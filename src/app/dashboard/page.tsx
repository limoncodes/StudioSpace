
"use client";

import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getTokenFormClient } from "@/lib/getTokenFormClient";

type BookingStatus =
    | "Pending"
    | "Confirmed"
    | "Completed"
    | "Cancelled";

type Booking = {
    _id: string;
    customerName: string;
    customerEmail: string;
    customerImage: string;
    studioTitle: string;
    studioCategory: string;
    studioLocation: string;
    studioImage: string;
    ownerName: string;
    ownerEmail: string;
    ownerImage: string;
    bookingDate: string;
    startTime: string;
    durationHours: number;
    guests: number;
    hourlyRate: number;
    subtotal: number;
    securityDeposit: number;
    totalAmount: number;
    specialRequest: string;
    status: BookingStatus;
    createdAt: string;
    updatedAt: string;
};

type Filter = "All" | BookingStatus;

const filters: Filter[] = [
    "All",
    "Pending",
    "Confirmed",
    "Completed",
    "Cancelled",
];

const statusConfig: Record<
    BookingStatus,
    {
        label: string;
        symbol: string;
        dot: string;
        badge: string;
        text: string;
    }
> = {
    Pending: {
        label: "Pending",
        symbol: "◷",
        dot: "bg-amber-500",
        badge: "border-amber-200 bg-amber-50",
        text: "text-amber-700",
    },
    Confirmed: {
        label: "Confirmed",
        symbol: "✓",
        dot: "bg-blue-500",
        badge: "border-blue-200 bg-blue-50",
        text: "text-blue-700",
    },
    Completed: {
        label: "Completed",
        symbol: "✓",
        dot: "bg-emerald-500",
        badge: "border-emerald-200 bg-emerald-50",
        text: "text-emerald-700",
    },
    Cancelled: {
        label: "Cancelled",
        symbol: "×",
        dot: "bg-red-500",
        badge: "border-red-200 bg-red-50",
        text: "text-red-700",
    },
};

// Normalize Booking Status
const normalizeStatus = (status: unknown): BookingStatus => {
    const value =
        typeof status === "string"
            ? status.charAt(0).toUpperCase() +
              status.slice(1).toLowerCase()
            : "Pending";

    return value in statusConfig
        ? (value as BookingStatus)
        : "Pending";
};

// Format Number
const formatMoney = (amount?: number) =>
    Number(amount || 0).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

// Premium Dollar Typography
const Money = ({
    amount,
    className = "",
    symbolColor,
}: {
    amount: number;
    className?: string;
    symbolColor?: string;
}) => (
    <span className={`inline-flex items-baseline gap-1 ${className}`}>
        <span
            className={`text-[0.65em] font-medium ${
                symbolColor || "text-[#9CA3AF]"
            }`}
        >
            $
        </span>

        <span>{formatMoney(amount)}</span>
    </span>
);

// Format Booking Date
const formatDate = (date?: string) => {
    if (!date) return "Date unavailable";

    const [year, month, day] = date.split("-").map(Number);

    if (
        !year ||
        !month ||
        !day ||
        month < 1 ||
        month > 12 ||
        day < 1 ||
        day > 31
    ) {
        return date;
    }

    const months = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec",
    ];

    return `${String(day).padStart(2, "0")} ${months[month - 1]} ${year}`;
};

// Format Booking Time
// Uses no current Date() value during rendering.
const formatTime = (time?: string) => {
    if (!time) return "Time unavailable";

    const [hourString, minuteString] = time.split(":");

    const hours = Number(hourString);
    const minutes = Number(minuteString);

    if (
        !Number.isInteger(hours) ||
        !Number.isInteger(minutes) ||
        hours < 0 ||
        hours > 23 ||
        minutes < 0 ||
        minutes > 59
    ) {
        return time;
    }

    const period = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12;

    return `${String(formattedHour).padStart(2, "0")}:${String(
        minutes
    ).padStart(2, "0")} ${period}`;
};

const Dashboard = () => {
    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState<Filter>("All");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const hasUserEmail = Boolean(user?.email);
    const displayBookings = hasUserEmail ? bookings : [];
    const userEmail = user?.email;

    // =====================================
    // FETCH OWNER BOOKINGS
    // =====================================

    const fetchBookings = useCallback(
        async (signal?: AbortSignal) => {
            if (!userEmail) {
                setBookings([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                // Get Better Auth Token
                const token = await getTokenFormClient();

                if (!token) {
                    throw new Error(
                        "Authentication token not found. Please login again."
                    );
                }

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/bookingowner/${encodeURIComponent(
                        userEmail
                    )}`,
                    {
                        cache: "no-store",
                        signal,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const responseText = await res.text();

                let data: unknown;

                try {
                    data = JSON.parse(responseText);
                } catch {
                    throw new Error(
                        "Invalid response from backend. Check your API."
                    );
                }

                if (!res.ok) {
                    throw new Error(
                        typeof data === "object" &&
                            data !== null &&
                            "message" in data
                            ? String(data.message)
                            : "Failed to fetch bookings."
                    );
                }

                if (!Array.isArray(data)) {
                    throw new Error("Invalid booking data.");
                }

                const formattedData: Booking[] = data.map(
                    (item: Partial<Booking>) =>
                        ({
                            ...item,
                            status: normalizeStatus(item.status),
                        }) as Booking
                );

                setBookings(formattedData);
            } catch (err) {
                if (
                    err instanceof Error &&
                    err.name === "AbortError"
                ) {
                    return;
                }

                console.error("Fetch Error:", err);

                setError(
                    err instanceof Error
                        ? err.message
                        : "Unable to load bookings."
                );
            } finally {
                if (!signal?.aborted) {
                    setLoading(false);
                }
            }
        },
        [userEmail]
    );

    // Initial Fetch
    useEffect(() => {
        if (isPending) return;

        if (!user?.email) {
            return;
        }

        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => {
            void fetchBookings(controller.signal);
        }, 0);

        return () => {
            window.clearTimeout(timeoutId);
            controller.abort();
        };
    }, [isPending, user?.email, fetchBookings]);

    // =====================================
    // UPDATE BOOKING STATUS
    // =====================================

    const handleUpdate = async (
        bookingId: string,
        status: BookingStatus
    ) => {
        if (!user?.email || updatingId !== null) return;

        try {
            setUpdatingId(bookingId);
            setError("");
            setSuccess("");

            // Get Better Auth Token
            const token = await getTokenFormClient();

            if (!token) {
                throw new Error(
                    "Authentication token not found. Please login again."
                );
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/UpdateBooking/${encodeURIComponent(
                    user.email
                )}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        bookingId,
                        status,
                    }),
                }
            );

            const responseText = await res.text();

            let data: { message?: string };

            try {
                data = JSON.parse(responseText);
            } catch {
                throw new Error(
                    "Invalid response from backend."
                );
            }

            if (!res.ok) {
                throw new Error(
                    data.message || "Failed to update booking."
                );
            }

            // Update UI Instantly
            setBookings((prev) =>
                prev.map((booking) =>
                    booking._id === bookingId
                        ? {
                              ...booking,
                              status,
                              updatedAt: new Date().toISOString(),
                          }
                        : booking
                )
            );

            setSuccess(
                `Booking successfully updated to ${status}.`
            );
        } catch (err) {
            console.error("Update Error:", err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong."
            );
        } finally {
            setUpdatingId(null);
        }
    };

    // =====================================
    // DASHBOARD STATISTICS
    // =====================================

    const statistics = useMemo(() => {
        const count = (status: BookingStatus) =>
            displayBookings.filter(
                (booking) => booking.status === status
            ).length;

        const completedBookings = displayBookings.filter(
            (booking) => booking.status === "Completed"
        );

        // Earnings: Completed studio fees only
        const earnings = completedBookings.reduce(
            (total, booking) =>
                total + Number(booking.subtotal || 0),
            0
        );

        // Total booking value excluding cancelled bookings
        const totalAmount = displayBookings
            .filter(
                (booking) => booking.status !== "Cancelled"
            )
            .reduce(
                (total, booking) =>
                    total + Number(booking.totalAmount || 0),
                0
            );

        return {
            total: displayBookings.length,
            pending: count("Pending"),
            confirmed: count("Confirmed"),
            completed: count("Completed"),
            cancelled: count("Cancelled"),
            earnings,
            totalAmount,
            averageEarnings:
                completedBookings.length > 0
                    ? earnings / completedBookings.length
                    : 0,
        };
    }, [displayBookings]);

    // =====================================
    // FILTER BOOKINGS
    // =====================================

    const filteredBookings = useMemo(() => {
        if (activeFilter === "All") return displayBookings;

        return displayBookings.filter(
            (booking) => booking.status === activeFilter
        );
    }, [displayBookings, activeFilter]);

    // =====================================
    // SESSION LOADING
    // =====================================

    if (isPending) {
        return (
            <main className="flex min-h-[65vh] items-center justify-center bg-[#F4F5F6]">
                <div className="text-center">
                    <div className="mx-auto h-9 w-9 animate-spin rounded-full border-[3px] border-[#E5E7EB] border-t-[#9CF237]" />

                    <p className="mt-4 text-sm text-[#6B7280]">
                        Preparing your workspace...
                    </p>
                </div>
            </main>
        );
    }

    // =====================================
    // AUTH CHECK
    // =====================================

    if (!user) {
        return (
            <main className="flex min-h-[65vh] items-center justify-center bg-[#F4F5F6] px-4">
                <div className="w-full max-w-md rounded-3xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#9CF237] text-3xl font-bold text-[#1E1E1E]">
                        S
                    </div>

                    <h2 className="mt-6 font-serif text-2xl font-bold text-[#1E1E1E]">
                        Welcome to StudioSpace
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                        Sign in to access your owner dashboard and manage your studio bookings.
                    </p>
                </div>
            </main>
        );
    }

    // =====================================
    // STATISTIC CARDS
    // =====================================

    const stats = [
        {
            name: "Pending",
            description: "Awaiting confirmation",
            value: statistics.pending,
            symbol: "◷",
            color: "text-amber-600",
            background: "bg-amber-50",
            border: "border-amber-100",
        },
        {
            name: "Confirmed",
            description: "Upcoming sessions",
            value: statistics.confirmed,
            symbol: "✓",
            color: "text-blue-600",
            background: "bg-blue-50",
            border: "border-blue-100",
        },
        {
            name: "Completed",
            description: "Successfully finished",
            value: statistics.completed,
            symbol: "✓",
            color: "text-emerald-600",
            background: "bg-emerald-50",
            border: "border-emerald-100",
        },
        {
            name: "Cancelled",
            description: "Cancelled reservations",
            value: statistics.cancelled,
            symbol: "×",
            color: "text-red-600",
            background: "bg-red-50",
            border: "border-red-100",
        },
    ];

    return (
        <main className="min-h-screen bg-[#F4F5F6] font-sans">
            <div className="mx-auto max-w-[1320px] px-4 py-7 sm:px-6 sm:py-10 lg:px-8">

                {/* DASHBOARD HEADER */}

                <section className="mb-9 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#9CF237]" />

                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
                                Your creative workspace
                            </p>
                        </div>

                        <h1 className="font-serif text-3xl font-bold tracking-tight text-[#1E1E1E] sm:text-4xl lg:text-[44px]">
                            Owner Dashboard
                        </h1>

                        <p className="mt-2 max-w-lg text-sm leading-6 text-[#6B7280] sm:text-base">
                            Manage your studio reservations, track your earnings and grow your business.
                        </p>
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-3.5 shadow-sm">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#F4F5F6] ring-2 ring-[#9CF237]/50">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name || "Owner"}
                                    fill
                                    unoptimized
                                    sizes="48px"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-[#9CF237] text-lg font-bold text-[#1E1E1E]">
                                    {user.name?.charAt(0) || "O"}
                                </div>
                            )}
                        </div>

                        <div className="min-w-0 pr-2">
                            <p className="max-w-[180px] truncate text-sm font-semibold text-[#1E1E1E]">
                                {user.name}
                            </p>

                            <p className="max-w-[190px] truncate text-xs text-[#6B7280]">
                                {user.email}
                            </p>

                            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#719E33]">
                                Studio Owner
                            </p>
                        </div>
                    </div>
                </section>

                {/* BOOKING STATISTICS */}

                <section className="mb-7">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-base font-bold text-[#1E1E1E]">
                                Booking Overview
                            </h2>

                            <p className="mt-1 text-xs text-[#9CA3AF]">
                                Your reservation performance at a glance.
                            </p>
                        </div>

                        <span className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-medium text-[#6B7280]">
                            {statistics.total} Total Bookings
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 xl:grid-cols-5">

                        {stats.map((stat, index) => (
                            <div
                                key={stat.name}
                                className="group rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_3px_16px_rgba(30,30,30,0.025)] transition duration-300 hover:-translate-y-1 hover:border-[#C8E8A0] hover:shadow-lg sm:p-6"
                            >
                                <div className="flex items-center justify-between">
                                    <div
                                        className={`flex h-11 w-11 items-center justify-center rounded-xl border text-xl font-semibold ${stat.background} ${stat.color} ${stat.border}`}
                                    >
                                        {stat.symbol}
                                    </div>

                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#B0B4B0]">
                                        0{index + 1}
                                    </span>
                                </div>

                                <p className="mt-6 text-3xl font-bold tracking-tight text-[#1E1E1E] sm:text-4xl">
                                    {loading ? "—" : stat.value}
                                </p>

                                <h3 className="mt-1 text-sm font-semibold text-[#1E1E1E]">
                                    {stat.name}
                                </h3>

                                <p className="mt-1 text-xs text-[#9CA3AF]">
                                    {stat.description}
                                </p>
                            </div>
                        ))}

                        {/* TOTAL BOOKING AMOUNT */}
                        <div className="group rounded-2xl border border-[#DDEBCF] bg-white p-5 shadow-[0_3px_16px_rgba(30,30,30,0.025)] transition duration-300 hover:-translate-y-1 hover:border-[#9CF237] hover:shadow-lg sm:p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C8E8A0] bg-[#F2FBE8] text-xl font-semibold text-[#719E33]">
                                    $
                                </div>

                                <span className="rounded-full bg-[#F2FBE8] px-2.5 py-1 text-[10px] font-semibold text-[#719E33]">
                                    Active
                                </span>
                            </div>

                            <div className="mt-6">
                                <p className="whitespace-nowrap text-2xl font-bold tracking-tight text-[#1E1E1E] sm:text-[27px]">
                                    {loading ? (
                                        "—"
                                    ) : (
                                        <Money
                                            amount={statistics.totalAmount}
                                        />
                                    )}
                                </p>

                                <h3 className="mt-2 text-sm font-semibold text-[#1E1E1E]">
                                    Total Booking Amount
                                </h3>

                                <p className="mt-1 text-xs text-[#9CA3AF]">
                                    Excluding cancelled bookings
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TOTAL EARNINGS */}

                <section className="mb-9 overflow-hidden rounded-3xl bg-[#1E1E1E] shadow-[0_12px_35px_rgba(30,30,30,0.08)]">
                    <div className="relative grid gap-7 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10 lg:py-9">

                        {/* Decorative Circles */}
                        <div className="pointer-events-none absolute -right-16 -top-28 h-72 w-72 rounded-full border border-white/10" />

                        <div className="pointer-events-none absolute -right-5 -top-16 h-52 w-52 rounded-full border border-white/10" />

                        {/* Earnings Content */}
                        <div className="relative z-10">
                            <div className="mb-5 flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-[#9CF237]" />

                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C8D0C1]">
                                    Completed Booking Revenue
                                </p>
                            </div>

                            <div className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                                {loading ? (
                                    "—"
                                ) : (
                                    <Money
                                        amount={statistics.earnings}
                                        className="font-serif"
                                        symbolColor="text-[#9CF237]"
                                    />
                                )}
                            </div>

                            <p className="mt-3 max-w-md text-sm leading-6 text-[#B5B8B1]">
                                Revenue generated from completed studio sessions.
                            </p>

                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <span className="rounded-full border border-[#9CF237]/30 bg-[#9CF237]/10 px-3 py-1.5 text-xs font-semibold text-[#B7F477]">
                                    {statistics.completed} Completed Sessions
                                </span>

                                <span className="text-xs text-[#A0A49D]">
                                    Security deposits excluded
                                </span>
                            </div>
                        </div>

                        {/* Earnings Details */}
                        <div className="relative z-10 flex min-w-[210px] flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm">
                            <div>
                                <p className="text-xs text-[#B5B8B1]">
                                    Average Earnings / Session
                                </p>

                                <p className="mt-2 text-2xl font-bold text-[#9CF237]">
                                    {loading ? (
                                        "—"
                                    ) : (
                                        <Money
                                            amount={statistics.averageEarnings}
                                            symbolColor="text-[#B7F477]"
                                        />
                                    )}
                                </p>
                            </div>

                            <div className="border-t border-white/10 pt-4">
                                <p className="text-xs text-[#B5B8B1]">
                                    Total Reservations
                                </p>

                                <p className="mt-1 text-xl font-bold text-white">
                                    {statistics.total}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CUSTOMER BOOKINGS */}

                <section className="overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-[0_5px_25px_rgba(30,30,30,0.025)]">

                    {/* Section Header */}
                    <div className="flex flex-col justify-between gap-4 border-b border-[#E5E7EB] px-5 py-6 sm:px-7 sm:py-7 md:flex-row md:items-center">
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="font-serif text-2xl font-bold text-[#1E1E1E] sm:text-[28px]">
                                    Customer Bookings
                                </h2>

                                <span className="rounded-full bg-[#F4F5F6] px-3 py-1 text-xs font-semibold text-[#6B7280]">
                                    {bookings.length}
                                </span>
                            </div>

                            <p className="mt-2 text-sm text-[#6B7280]">
                                Review customer requests and manage reservations.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => void fetchBookings()}
                            disabled={loading}
                            className="flex items-center justify-center gap-2 self-start rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#1E1E1E] transition hover:border-[#9CF237] hover:bg-[#F9FFF2] disabled:opacity-50 md:self-auto"
                        >
                            <span className={loading ? "animate-spin" : ""}>
                                ↻
                            </span>

                            Refresh
                        </button>
                    </div>

                    {/* Status Filters */}
                    <div className="border-b border-[#E5E7EB] px-5 py-4 sm:px-7">
                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {filters.map((filter) => {
                                const count =
                                    filter === "All"
                                        ? statistics.total
                                        : statistics[
                                              filter.toLowerCase() as
                                                  | "pending"
                                                  | "confirmed"
                                                  | "completed"
                                                  | "cancelled"
                                          ];

                                return (
                                    <button
                                        key={filter}
                                        type="button"
                                        onClick={() =>
                                            setActiveFilter(filter)
                                        }
                                        className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold transition sm:text-sm ${
                                            activeFilter === filter
                                                ? "border-[#9CF237] bg-[#9CF237] text-[#1E1E1E]"
                                                : "border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#C8E8A0] hover:bg-[#F9FFF2]"
                                        }`}
                                    >
                                        {filter}

                                        <span className="text-[11px] opacity-70">
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mx-5 mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 sm:mx-7">
                            <p className="text-sm text-red-600">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={() => void fetchBookings()}
                                className="text-sm font-semibold text-red-700 underline"
                            >
                                Try again
                            </button>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="mx-5 mt-5 flex items-center justify-between gap-3 rounded-xl border border-[#D6EDBD] bg-[#F5FBEF] px-4 py-3 sm:mx-7">
                            <p className="text-sm font-medium text-[#527C2C]">
                                ✓ {success}
                            </p>

                            <button
                                type="button"
                                onClick={() => setSuccess("")}
                                className="text-sm text-[#527C2C]"
                                aria-label="Dismiss"
                            >
                                ×
                            </button>
                        </div>
                    )}

                    {/* Loading / Empty / Cards */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-[#E5E7EB] border-t-[#9CF237]" />

                            <p className="mt-4 text-sm text-[#6B7280]">
                                Loading customer reservations...
                            </p>
                        </div>
                    ) : filteredBookings.length === 0 ? (
                        <div className="flex flex-col items-center justify-center px-5 py-20 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4F5F6] text-3xl text-[#9CA3AF]">
                                ▦
                            </div>

                            <h3 className="mt-5 font-serif text-xl font-bold text-[#1E1E1E]">
                                {activeFilter === "All"
                                    ? "No bookings yet"
                                    : `No ${activeFilter} bookings`}
                            </h3>

                            <p className="mt-2 max-w-sm text-sm leading-6 text-[#9CA3AF]">
                                {activeFilter === "All"
                                    ? "When customers book your studio, their reservations will appear here."
                                    : `There are no ${activeFilter.toLowerCase()} reservations at the moment.`}
                            </p>
                        </div>
                    ) : (
                        /* Booking Cards */
                        <div className="divide-y divide-[#F0F1F2]">
                            {filteredBookings.map((booking) => {
                                const status = statusConfig[booking.status];

                                return (
                                    <article
                                        key={booking._id}
                                        className="p-5 transition-colors duration-200 hover:bg-[#FCFDFB] sm:p-7"
                                    >
                                        <div className="grid gap-5 lg:grid-cols-[210px_minmax(0,1fr)] xl:grid-cols-[230px_minmax(0,1fr)_210px]">

                                            {/* Studio Image */}
                                            <div className="relative h-52 overflow-hidden rounded-2xl bg-[#F4F5F6] lg:h-full lg:min-h-[230px]">
                                                {booking.studioImage ? (
                                                    <Image
                                                        src={booking.studioImage}
                                                        alt={booking.studioTitle || "Studio"}
                                                        fill
                                                        unoptimized
                                                        sizes="(max-width: 768px) 100vw, 230px"
                                                        className="object-cover transition-transform duration-500 hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-4xl text-[#9CA3AF]">
                                                        ▦
                                                    </div>
                                                )}

                                                <div className="absolute bottom-3 left-3">
                                                    <span className="rounded-lg border border-white/60 bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-[#1E1E1E] shadow-sm">
                                                        {booking.studioCategory}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Booking Information */}
                                            <div className="flex min-w-0 flex-col justify-between gap-5">

                                                {/* Studio Details */}
                                                <div>
                                                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                                                        <span
                                                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${status.badge} ${status.text}`}
                                                        >
                                                            <span
                                                                className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                                                            />

                                                            {status.label}
                                                        </span>

                                                        <span className="max-w-full truncate text-[10px] text-[#9CA3AF]">
                                                            #{booking._id}
                                                        </span>
                                                    </div>

                                                    <h3 className="font-serif text-xl font-bold leading-snug text-[#1E1E1E] sm:text-2xl">
                                                        {booking.studioTitle}
                                                    </h3>

                                                    <p className="mt-2 flex items-center gap-2 text-sm text-[#6B7280]">
                                                        <span className="text-[#9CF237]">
                                                            ⌖
                                                        </span>

                                                        {booking.studioLocation}
                                                    </p>
                                                </div>

                                                {/* Customer Profile */}
                                                <div className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-3">
                                                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#F4F5F6]">
                                                        {booking.customerImage ? (
                                                            <Image
                                                                src={booking.customerImage}
                                                                alt={booking.customerName || "Customer"}
                                                                fill
                                                                unoptimized
                                                                sizes="44px"
                                                                className="object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center bg-[#9CF237] font-bold text-[#1E1E1E]">
                                                                {booking.customerName?.charAt(0) || "C"}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="text-[10px] font-medium uppercase tracking-wider text-[#9CA3AF]">
                                                            Booked By
                                                        </p>

                                                        <p className="truncate text-sm font-semibold text-[#1E1E1E]">
                                                            {booking.customerName}
                                                        </p>

                                                        <p className="truncate text-xs text-[#6B7280]">
                                                            {booking.customerEmail}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Booking Details */}
                                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                                    <div className="rounded-xl bg-[#F7F8F7] p-3">
                                                        <p className="text-[10px] font-medium uppercase tracking-wider text-[#9CA3AF]">
                                                            Booking Date
                                                        </p>

                                                        <p className="mt-1.5 text-xs font-semibold text-[#1E1E1E]">
                                                            {formatDate(booking.bookingDate)}
                                                        </p>
                                                    </div>

                                                    <div className="rounded-xl bg-[#F7F8F7] p-3">
                                                        <p className="text-[10px] font-medium uppercase tracking-wider text-[#9CA3AF]">
                                                            Start Time
                                                        </p>

                                                        <p className="mt-1.5 text-xs font-semibold text-[#1E1E1E]">
                                                            {formatTime(booking.startTime)}
                                                        </p>
                                                    </div>

                                                    <div className="col-span-2 rounded-xl bg-[#F7F8F7] p-3 sm:col-span-1">
                                                        <p className="text-[10px] font-medium uppercase tracking-wider text-[#9CA3AF]">
                                                            Duration / Guests
                                                        </p>

                                                        <p className="mt-1.5 text-xs font-semibold text-[#1E1E1E]">
                                                            {booking.durationHours} Hours · {booking.guests} Guests
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Special Request */}
                                                {booking.specialRequest && (
                                                    <div className="rounded-xl border border-[#E5E7EB] p-3">
                                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
                                                            Special Request
                                                        </p>

                                                        <p className="mt-1 text-xs leading-5 text-[#6B7280]">
                                                            {booking.specialRequest}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Payment Summary & Actions */}
                                            <div className="flex flex-col justify-between rounded-2xl border border-[#E5E7EB] bg-[#FCFCFB] p-4 sm:p-5">

                                                {/* Price Breakdown */}
                                                <div>
                                                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9CA3AF]">
                                                        Booking Summary
                                                    </p>

                                                    <div className="mt-5 space-y-4">
                                                        <div className="flex items-center justify-between gap-2 text-xs text-[#6B7280]">
                                                            <span>Hourly Rate</span>

                                                            <Money
                                                                amount={booking.hourlyRate}
                                                                className="text-sm font-semibold text-[#1E1E1E]"
                                                            />
                                                        </div>

                                                        <div className="flex items-center justify-between gap-2 text-xs text-[#6B7280]">
                                                            <span>Subtotal</span>

                                                            <Money
                                                                amount={booking.subtotal}
                                                                className="text-sm font-semibold text-[#1E1E1E]"
                                                            />
                                                        </div>

                                                        <div className="flex items-center justify-between gap-2 text-xs text-[#6B7280]">
                                                            <span>Security Deposit</span>

                                                            <Money
                                                                amount={booking.securityDeposit}
                                                                className="text-sm font-semibold text-[#1E1E1E]"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="my-5 border-t border-dashed border-[#D8DBD7]" />

                                                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9CA3AF]">
                                                        Total Amount
                                                    </p>

                                                    <Money
                                                        amount={booking.totalAmount}
                                                        className="mt-2 text-3xl font-bold tracking-tight text-[#1E1E1E]"
                                                    />
                                                </div>

                                                {/* Owner Actions */}
                                                <div className="mt-6 space-y-2">

                                                    {/* Pending -> Confirmed */}
                                                    {booking.status === "Pending" && (
                                                        <button
                                                            type="button"
                                                            disabled={updatingId !== null}
                                                            onClick={() =>
                                                                handleUpdate(
                                                                    booking._id,
                                                                    "Confirmed"
                                                                )
                                                            }
                                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#9CF237] px-4 py-3 text-sm font-semibold text-[#1E1E1E] shadow-[0_3px_10px_rgba(156,242,55,0.15)] transition hover:bg-[#8DDF2D] disabled:cursor-not-allowed disabled:opacity-50"
                                                        >
                                                            {updatingId === booking._id ? (
                                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#1E1E1E]/30 border-t-[#1E1E1E]" />
                                                            ) : (
                                                                "✓"
                                                            )}

                                                            Confirm Booking
                                                        </button>
                                                    )}

                                                    {/* Confirmed -> Completed */}
                                                    {booking.status === "Confirmed" && (
                                                        <button
                                                            type="button"
                                                            disabled={updatingId !== null}
                                                            onClick={() =>
                                                                handleUpdate(
                                                                    booking._id,
                                                                    "Completed"
                                                                )
                                                            }
                                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#9CF237] px-4 py-3 text-sm font-semibold text-[#1E1E1E] transition hover:bg-[#8DDF2D] disabled:cursor-not-allowed disabled:opacity-50"
                                                        >
                                                            {updatingId === booking._id ? (
                                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#1E1E1E]/30 border-t-[#1E1E1E]" />
                                                            ) : (
                                                                "✓"
                                                            )}

                                                            Mark Completed
                                                        </button>
                                                    )}

                                                    {/* Cancel Booking */}
                                                    {(booking.status === "Pending" ||
                                                        booking.status === "Confirmed") && (
                                                        <button
                                                            type="button"
                                                            disabled={updatingId !== null}
                                                            onClick={() =>
                                                                handleUpdate(
                                                                    booking._id,
                                                                    "Cancelled"
                                                                )
                                                            }
                                                            className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-medium text-[#6B7280] transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >
                                                            Cancel Booking
                                                        </button>
                                                    )}

                                                    {/* Final Status */}
                                                    {(booking.status === "Completed" ||
                                                        booking.status === "Cancelled") && (
                                                        <div className="rounded-xl bg-[#F4F5F6] px-3 py-3 text-center text-xs font-medium text-[#6B7280]">
                                                            {booking.status === "Completed"
                                                                ? "✓ Session completed"
                                                                : "Booking cancelled"}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default Dashboard;
