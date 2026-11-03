
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { authClient } from "@/lib/auth-client"

import {
    FiCheck,
    FiXCircle,
    FiCalendar,
    FiClock,
    FiMapPin,
    FiUsers,
    FiUser,
} from "react-icons/fi"

import CancelBooking from "@/components/CancelBooking"

// Booking Status
type BookingStatus =
    | "Pending"
    | "Confirmed"
    | "Completed"
    | "Cancelled"

// Booking Interface
interface Booking {
    _id: string
    customerName: string
    customerEmail: string
    studioTitle: string
    studioCategory: string
    studioLocation: string
    studioImage: string
    ownerName: string
    ownerEmail: string
    ownerImage?: string
    bookingDate: string
    startTime: string
    durationHours: number
    guests: number
    hourlyRate: number
    subtotal: number
    securityDeposit: number
    totalAmount: number
    specialRequest?: string
    status: string
    createdAt: string
}

// Normalize Status
const normalizeStatus = (status?: string): BookingStatus | null => {
    switch (status?.trim().toLowerCase()) {
        case "pending": return "Pending"
        case "confirmed": return "Confirmed"
        case "completed": return "Completed"
        case "cancelled":
        case "canceled": return "Cancelled"
        default: return null
    }
}

// Booking Progress
const BookingProgress = ({
    status,
}: {
    status: BookingStatus | null
}) => {

    if (status === "Cancelled") {
        return (
            <div className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-[#F4F5F6] p-4">
                <FiXCircle className="h-5 w-5 text-[#6B7280]" />
                <div>
                    <p className="text-sm font-semibold text-[#1E1E1E]">
                        Booking Cancelled
                    </p>
                    <p className="text-xs text-[#6B7280]">
                        This reservation is no longer active.
                    </p>
                </div>
            </div>
        )
    }

    const steps = ["Pending", "Confirmed", "Completed"]
    const currentIndex = status ? steps.indexOf(status) : -1

    return (
        <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFBF9] p-4 sm:p-5">

            <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-semibold text-[#1E1E1E]">
                    Booking Progress
                </p>

                <span className="rounded-full border border-[#9CF237] bg-[#9CF237]/20 px-3 py-1 text-xs font-semibold text-[#1E1E1E]">
                    {status || "Unknown"}
                </span>
            </div>

            <div className="flex items-start">
                {steps.map((step, index) => {

                    const completed =
                        status === "Completed" || index < currentIndex

                    const active = index === currentIndex

                    return (
                        <div key={step} className="flex flex-1 items-start">

                            <div className="flex min-w-0 flex-col items-center text-center">

                                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ${completed
                                        ? "border-[#9CF237] bg-[#9CF237] text-[#1E1E1E]"
                                        : active
                                            ? "border-[#9CF237] bg-white text-[#1E1E1E] shadow-[0_0_0_4px_rgba(156,242,55,0.15)]"
                                            : "border-[#E5E7EB] bg-white text-[#9CA3AF]"
                                    }`}>
                                    {completed ? <FiCheck /> : index + 1}
                                </div>

                                <p className={`mt-2 text-[10px] font-semibold sm:text-xs ${completed || active
                                        ? "text-[#1E1E1E]"
                                        : "text-[#9CA3AF]"
                                    }`}>
                                    {step}
                                </p>

                                {active && (
                                    <span className="mt-1 text-[9px] text-[#6B7280]">
                                        Current
                                    </span>
                                )}
                            </div>

                            {index !== 2 && (
                                <div className={`mx-2 mt-[17px] h-[2px] flex-1 ${index < currentIndex
                                        ? "bg-[#9CF237]"
                                        : "bg-[#E5E7EB]"
                                    }`} />
                            )}

                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// Main My Booking Page
const MyBooking = () => {

    // Auth Session
    const { data: session, isPending } = authClient.useSession()
    const user = session?.user

    // Booking States
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    // Fetch Bookings
    useEffect(() => {

        if (isPending) return

        if (!user?.email) {
            return
        }

        const controller = new AbortController()

        const fetchBookings = async () => {
            setLoading(true)
            setError("")

            const res = await fetch(
                `http://localhost:5000/booking/${encodeURIComponent(user.email)}`,
                {
                    cache: "no-store",
                    signal: controller.signal,
                }
            )

            if (!res.ok) {
                throw new Error("Failed to fetch bookings.")
            }

            const data: Booking[] = await res.json()

            if (!Array.isArray(data)) {
                throw new Error("Invalid booking data.")
            }

            if (!controller.signal.aborted) {
                setBookings(
                    data.sort(
                        (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                    )
                )
            }
        }

        fetchBookings()
            .catch((err) => {
                if (!controller.signal.aborted) {
                    setError(err.message || "Something went wrong.")
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setLoading(false)
                }
            })

        return () => controller.abort()

    }, [user?.email, isPending])

    // Format Date
    const formatDate = (date: string) => {
        if (!date) return "—"

        return new Date(`${date.slice(0, 10)}T00:00:00`)
            .toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })
    }

    // Format Time
    const formatTime = (time: string) => {
        if (!time) return "—"

        const [hours, minutes] = time.split(":").map(Number)
        const date = new Date()
        date.setHours(hours, minutes, 0, 0)

        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        })
    }

    // Format Price
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
        }).format(price || 0)
    }



    // Loading
    if (isPending || (loading && Boolean(user?.email))) {
        return (
            <main className="min-h-screen bg-white px-4 py-12">
                <div className="mx-auto max-w-7xl space-y-6">
                    <div className="h-10 w-56 animate-pulse rounded-lg bg-[#F4F5F6]" />
                    {[1, 2].map((item) => (
                        <div
                            key={item}
                            className="h-64 animate-pulse rounded-2xl bg-[#F4F5F6]"
                        />
                    ))}
                </div>
            </main>
        )
    }

    // Not Logged In
    if (!user) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center bg-white px-4">
                <div className="text-center">
                    <FiUser className="mx-auto mb-4 h-9 w-9 text-[#6B7280]" />

                    <h2 className="font-serif text-3xl font-bold text-[#1E1E1E]">
                        Sign In Required
                    </h2>

                    <p className="mt-2 text-sm text-[#6B7280]">
                        Please sign in to view your bookings.
                    </p>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-white">

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

                {/* Header */}
                <div className="mb-9 border-b border-[#E5E7EB] pb-7">
                    <h1 className="font-serif text-3xl font-bold text-[#1E1E1E] sm:text-4xl">
                        My Bookings
                    </h1>

                    <p className="mt-3 text-sm text-[#6B7280]">
                        Manage and track your creative workspace reservations.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-xl border border-[#E5E7EB] bg-[#F4F5F6] p-4 text-sm text-[#1E1E1E]">
                        {error}
                    </div>
                )}

                {/* Empty State */}
                {!error && bookings.length === 0 && (
                    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#E5E7EB] bg-[#FAFBF9] text-center">
                        <FiCalendar className="mb-4 h-10 w-10 text-[#9CA3AF]" />

                        <h2 className="font-serif text-2xl font-bold text-[#1E1E1E]">
                            No Bookings Yet
                        </h2>

                        <p className="mt-2 text-sm text-[#6B7280]">
                            Your reservations will appear here.
                        </p>
                    </div>
                )}

                {/* Booking Cards */}
                {!error && bookings.map((booking) => {

                    const currentStatus = normalizeStatus(booking.status)

                    return (
                        <article
                            key={booking._id}
                            className="mb-6 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_5px_25px_rgba(30,30,30,0.04)]"
                        >
                            <div className="flex flex-col lg:flex-row">

                                {/* Studio Image */}
                                <div className="relative h-56 w-full shrink-0 bg-[#F4F5F6] sm:h-64 lg:min-h-[420px] lg:w-[280px]">

                                    {booking.studioImage && (
                                        <Image
                                            src={booking.studioImage}
                                            alt={booking.studioTitle}
                                            fill
                                            unoptimized
                                            sizes="(max-width: 1024px) 100vw, 280px"
                                            className="object-cover"
                                        />
                                    )}

                                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#1E1E1E]">
                                        {booking.studioCategory}
                                    </span>
                                </div>

                                {/* Card Content */}
                                <div className="min-w-0 flex-1 p-5 sm:p-6 lg:p-7">

                                    {/* Studio Title */}
                                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
                                        Booking #{booking._id.slice(-8)}
                                    </p>

                                    <h2 className="font-serif text-xl font-bold text-[#1E1E1E] sm:text-2xl">
                                        {booking.studioTitle}
                                    </h2>

                                    <p className="mt-2 flex items-center gap-2 text-sm text-[#6B7280]">
                                        <FiMapPin />
                                        {booking.studioLocation}
                                    </p>

                                    {/* Booking Progress */}
                                    <div className="mt-6">
                                        <BookingProgress status={currentStatus} />
                                    </div>

                                    {/* Reservation Details */}
                                    <div className="mt-7">
                                        <h3 className="mb-4 text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                                            Reservation Details
                                        </h3>

                                        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
                                            <div>
                                                <p className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                                                    <FiCalendar /> Date
                                                </p>

                                                <p className="mt-2 text-sm font-semibold text-[#1E1E1E]">
                                                    {formatDate(booking.bookingDate)}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                                                    <FiClock /> Start Time
                                                </p>

                                                <p className="mt-2 text-sm font-semibold text-[#1E1E1E]">
                                                    {formatTime(booking.startTime)}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-[#6B7280]">
                                                    Duration
                                                </p>

                                                <p className="mt-2 text-sm font-semibold text-[#1E1E1E]">
                                                    {booking.durationHours} Hours
                                                </p>
                                            </div>

                                            <div>
                                                <p className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                                                    <FiUsers /> Guests
                                                </p>

                                                <p className="mt-2 text-sm font-semibold text-[#1E1E1E]">
                                                    {booking.guests} People
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Studio Host */}
                                    <div className="mt-7 border-t border-[#E5E7EB] pt-5">
                                        <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                                            Your Studio Host
                                        </p>

                                        <div className="flex items-center gap-3">
                                            {booking.ownerImage ? (
                                                <Image
                                                    src={booking.ownerImage}
                                                    alt={booking.ownerName}
                                                    width={42}
                                                    height={42}
                                                    unoptimized
                                                    className="h-[42px] w-[42px] rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#9CF237]/20">
                                                    <FiUser className="h-5 w-5" />
                                                </div>
                                            )}

                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-[#1E1E1E]">
                                                    {booking.ownerName}
                                                </p>

                                                <p className="mt-1 truncate text-xs text-[#6B7280]">
                                                    {booking.ownerEmail}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Special Request */}
                                    {booking.specialRequest && (
                                        <div className="mt-5 rounded-xl bg-[#F4F5F6] p-4">
                                            <p className="text-xs font-semibold text-[#1E1E1E]">
                                                Special Request
                                            </p>

                                            <p className="mt-1 text-sm text-[#6B7280]">
                                                {booking.specialRequest}
                                            </p>
                                        </div>
                                    )}

                                    {/* Price Summary */}
                                    <div className="mt-6 rounded-xl border border-[#E5E7EB] bg-[#FAFBF9] p-4 sm:p-5">
                                        <h3 className="mb-4 text-sm font-bold text-[#1E1E1E]">
                                            Price Summary
                                        </h3>

                                        <div className="space-y-3">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-[#6B7280]">Hourly Rate</span>
                                                <span className="font-semibold text-[#1E1E1E]">
                                                    {formatPrice(booking.hourlyRate)}
                                                </span>
                                            </div>

                                            <div className="flex justify-between text-xs">
                                                <span className="text-[#6B7280]">Subtotal</span>
                                                <span className="font-semibold text-[#1E1E1E]">
                                                    {formatPrice(booking.subtotal)}
                                                </span>
                                            </div>

                                            <div className="flex justify-between text-xs">
                                                <span className="text-[#6B7280]">Security Deposit</span>
                                                <span className="font-semibold text-[#1E1E1E]">
                                                    {formatPrice(booking.securityDeposit)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-4 border-t border-[#E5E7EB] pt-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-semibold text-[#1E1E1E]">
                                                    Total Amount
                                                </span>

                                                <span className="font-serif text-2xl font-bold text-[#1E1E1E]">
                                                    {formatPrice(booking.totalAmount)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cancel Booking Component */}
                                    <CancelBooking
                                        bookingId={booking._id}
                                        studioTitle={booking.studioTitle}
                                        onDeleted={(id) => {
                                            setBookings((prev) =>
                                                prev.filter((item) => item._id !== id)
                                            )
                                        }}
                                    />

                                </div>
                            </div>
                        </article>
                    )
                })}

            </div>
        </main>
    )
}

export default MyBooking
