
"use client"

import { useState, type FormEvent } from "react"
import Image from "next/image"
import { authClient } from "@/lib/auth-client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect } from "next/navigation"

interface StudioDetailsProps {
    studioDetails: {
        _id: string
        title: string
        category: string
        hourlyRate: number
        securityDeposit: number
        maxCapacity: number
        location: string
        imageURL: string
        amenities: string[]
        overview: string
        rating?: number
        reviews?: {
            _id?: string
            name?: string
            rating: number
            comment: string
            createdAt?: string
        }[]
        gallery?: string[]
        owner: {
            name: string
            email: string
            image?: string
        }
    }
}

// Booking Status Types
type BookingStatus =
    | "Pending"
    | "Confirmed"
    | "Completed"
    | "Cancelled"

// All Available Booking Statuses
const BOOKING_STATUSES: BookingStatus[] = [
    "Pending",
    "Confirmed",
    "Completed",
    "Cancelled",
]

const SecendBook = ({ studioDetails }: StudioDetailsProps) => {

    // Logged-in User Information
    const { data: session, isPending } = authClient.useSession()

    const user = session?.user

    const [open, setOpen] = useState(false)

    // Booking Form
    const [formData, setFormData] = useState({
        bookingDate: "",
        startTime: "",
        durationHours: "2",
        guests: "1",
        specialRequest: "",
    })

    // Current Date
    const today = (() => {
        const date = new Date()

        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")

        return `${year}-${month}-${day}`
    })()

    // Dynamic Pricing
    const duration = Number(formData.durationHours) || 0
    const guests = Number(formData.guests) || 0

    const hourlyRate = studioDetails.hourlyRate
    const subtotal = hourlyRate * duration
    const securityDeposit = studioDetails.securityDeposit
    const totalAmount = subtotal + securityDeposit

    // Handle Input Changes
    const handleChange = (
        field: keyof typeof formData,
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    // Reset Form
    const resetForm = () => {
        setFormData({
            bookingDate: "",
            startTime: "",
            durationHours: "2",
            guests: "1",
            specialRequest: "",
        })
    }

    // Handle Booking Submit
    const handleBooking = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Check Authentication
        if (!user) {
            console.log("Please login before booking.")
            return
        }

        // Validation
        if (
            !formData.bookingDate ||
            !formData.startTime ||
            duration < 1 ||
            duration > 24 ||
            guests < 1 ||
            guests > studioDetails.maxCapacity
        ) {
            return
        }

        const now = new Date().toISOString()

        // Complete Booking Data
        const bookingData = {

            // Customer Information (Better Auth)
          
            customerName: user.name,
            customerEmail: user.email,
            customerImage: user.image || "",

            // Studio Information
           
            studioTitle: studioDetails.title,
            studioCategory: studioDetails.category,
            studioLocation: studioDetails.location,
            studioImage: studioDetails.imageURL,

            // Owner Information
            ownerName: studioDetails.owner.name,
            ownerEmail: studioDetails.owner.email,
            ownerImage: studioDetails.owner.image || "",

            // Booking Schedule
            bookingDate: formData.bookingDate,
            startTime: formData.startTime,
            durationHours: duration,
            guests,

            // Pricing Information
            hourlyRate,
            subtotal,
            securityDeposit,
            totalAmount,

            // Additional Information
            specialRequest: formData.specialRequest.trim(),

            // Initial Booking Status
            status: "Pending" as BookingStatus,

            // Booking Metadata
            createdAt: now,
            updatedAt: now,
        }

        // Console Output
        // ==================================== OUT PUT ==================================================

        console.log("Complete Booking Data:", bookingData)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
            method:"POST",
             headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(bookingData),
        })
        const data = await res.json()
        console.log(data)

        setOpen(false)
        resetForm()
        redirect("/studios")
        
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                setOpen(value)

                if (!value) {
                    resetForm()
                }
            }}
        >
            {/* Booking Button */}
            <DialogTrigger
                render={
                    <Button
                        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#9CF237] text-sm font-bold text-[#1E1E1E] transition-colors hover:bg-[#8DE62B]"
                    >
                        Book Workspace Now
                        <span className="text-lg">→</span>
                    </Button>
                }
            />

            {/* Booking Modal */}
            <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border-[#E5E7EB] bg-white p-5 sm:max-w-lg sm:p-7">

                <DialogHeader className="space-y-2">
                    <DialogTitle className="font-serif text-2xl font-bold text-[#1E1E1E]">
                        Book Your Workspace
                    </DialogTitle>

                    <DialogDescription className="text-sm leading-relaxed text-[#6B7280]">
                        Complete your booking details to reserve this creative space.
                    </DialogDescription>
                </DialogHeader>

                {/* Studio Summary */}
                <div className="rounded-xl border border-[#E5E7EB] bg-[#F4F5F6] p-4">
                    <div className="flex items-center justify-between gap-3">

                        <div className="min-w-0">
                            <p className="text-xs font-medium text-[#6B7280]">
                                Selected Workspace
                            </p>

                            <h3 className="mt-1 truncate text-sm font-semibold text-[#1E1E1E]">
                                {studioDetails.title}
                            </h3>

                            <p className="mt-1 text-xs text-[#6B7280]">
                                {studioDetails.category} · {studioDetails.location}
                            </p>
                        </div>

                        <div className="shrink-0 text-right">
                            <p className="text-lg font-bold text-[#1E1E1E]">
                                ${hourlyRate.toLocaleString()}
                            </p>

                            <p className="text-xs text-[#6B7280]">
                                Per hour
                            </p>
                        </div>

                    </div>
                </div>

                {/* Logged-in User Information */}
                {isPending ? (
                    <div className="rounded-xl border border-[#E5E7EB] bg-[#F4F5F6] p-4">
                        <p className="text-sm text-[#6B7280]">
                            Loading account information...
                        </p>
                    </div>
                ) : user ? (
                    <div className="rounded-xl border border-[#E5E7EB] bg-[#F4F5F6] p-4">
                        <p className="mb-3 text-sm font-semibold text-[#1E1E1E]">
                            Booking As
                        </p>

                        <div className="flex items-center gap-3">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name}
                                    width={44}
                                    height={44}
                                    className="h-11 w-11 rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#9CF237] font-bold text-[#1E1E1E]">
                                    {user.name?.charAt(0).toUpperCase() || "U"}
                                </div>
                            )}

                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-[#1E1E1E]">
                                    {user.name}
                                </p>

                                <p className="truncate text-xs text-[#6B7280]">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-xl border border-[#E5E7EB] bg-[#F4F5F6] p-4">
                        <p className="text-sm font-medium text-[#1E1E1E]">
                            Please sign in to book this workspace.
                        </p>
                    </div>
                )}

                <form onSubmit={handleBooking} className="space-y-5">

                    <FieldGroup className="gap-4">

                        {/* Booking Schedule */}
                        <div>
                            <h3 className="mb-3 text-sm font-semibold text-[#1E1E1E]">
                                Booking Schedule
                            </h3>

                            <div className="space-y-3">

                                <Field>
                                    <Label htmlFor="bookingDate">
                                        Booking Date
                                    </Label>

                                    <Input
                                        id="bookingDate"
                                        type="date"
                                        min={today}
                                        value={formData.bookingDate}
                                        onChange={(e) =>
                                            handleChange("bookingDate", e.target.value)
                                        }
                                        required
                                        className="h-11 rounded-lg"
                                    />
                                </Field>

                                <Field>
                                    <Label htmlFor="startTime">
                                        Start Time
                                    </Label>

                                    <Input
                                        id="startTime"
                                        type="time"
                                        value={formData.startTime}
                                        onChange={(e) =>
                                            handleChange("startTime", e.target.value)
                                        }
                                        required
                                        className="h-11 rounded-lg"
                                    />
                                </Field>

                                <div className="grid grid-cols-2 gap-3">

                                    <Field>
                                        <Label htmlFor="durationHours">
                                            Duration (Hours)
                                        </Label>

                                        <Input
                                            id="durationHours"
                                            type="number"
                                            min={1}
                                            max={24}
                                            value={formData.durationHours}
                                            onChange={(e) =>
                                                handleChange("durationHours", e.target.value)
                                            }
                                            required
                                            className="h-11 rounded-lg"
                                        />
                                    </Field>

                                    <Field>
                                        <Label htmlFor="guests">
                                            Number of Guests
                                        </Label>

                                        <Input
                                            id="guests"
                                            type="number"
                                            min={1}
                                            max={studioDetails.maxCapacity}
                                            value={formData.guests}
                                            onChange={(e) =>
                                                handleChange("guests", e.target.value)
                                            }
                                            required
                                            className="h-11 rounded-lg"
                                        />
                                    </Field>

                                </div>

                                <p className="text-xs text-[#6B7280]">
                                    Maximum capacity: {studioDetails.maxCapacity} guests
                                </p>

                            </div>
                        </div>

                        {/* Special Request */}
                        <Field>
                            <Label htmlFor="specialRequest">
                                Special Request (Optional)
                            </Label>

                            <textarea
                                id="specialRequest"
                                rows={3}
                                maxLength={500}
                                placeholder="Tell us about your equipment or other requirements..."
                                value={formData.specialRequest}
                                onChange={(e) =>
                                    handleChange("specialRequest", e.target.value)
                                }
                                className="w-full resize-none rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm text-[#1E1E1E] outline-none placeholder:text-[#9CA3AF] focus:border-[#9CF237] focus:ring-2 focus:ring-[#9CF237]/20"
                            />
                        </Field>

                    </FieldGroup>

                    {/* Price Summary */}
                    <div className="space-y-3 rounded-xl border border-[#E5E7EB] p-4">

                        <h3 className="text-sm font-semibold text-[#1E1E1E]">
                            Price Summary
                        </h3>

                        <div className="flex justify-between gap-3 text-sm">
                            <span className="text-[#6B7280]">
                                ${hourlyRate.toLocaleString()} × {duration} hours
                            </span>

                            <span className="font-medium text-[#1E1E1E]">
                                ${subtotal.toLocaleString()}
                            </span>
                        </div>

                        <div className="flex justify-between gap-3 text-sm">
                            <span className="text-[#6B7280]">
                                Security Deposit
                            </span>

                            <span className="font-medium text-[#1E1E1E]">
                                ${securityDeposit.toLocaleString()}
                            </span>
                        </div>

                        <div className="border-t border-[#E5E7EB] pt-3">
                            <div className="flex items-center justify-between gap-3">

                                <span className="font-semibold text-[#1E1E1E]">
                                    Total Amount
                                </span>

                                <span className="text-xl font-bold text-[#1E1E1E]">
                                    ${totalAmount.toLocaleString()}
                                </span>

                            </div>
                        </div>

                    </div>

                    {/* Actions */}
                    <DialogFooter className="flex-col gap-2 sm:flex-row">

                        <DialogClose
                            render={
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-11 w-full rounded-xl border-[#E5E7EB] sm:w-auto"
                                >
                                    Cancel
                                </Button>
                            }
                        />

                        <Button
                            type="submit"
                            disabled={
                                isPending ||
                                !user ||
                                duration < 1 ||
                                duration > 24 ||
                                guests < 1 ||
                                guests > studioDetails.maxCapacity
                            }
                            className="h-11 w-full rounded-xl bg-[#9CF237] font-semibold text-[#1E1E1E] hover:bg-[#8DE62B] sm:flex-1"
                        >
                            Confirm Booking →
                        </Button>

                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    )
}

export default SecendBook
