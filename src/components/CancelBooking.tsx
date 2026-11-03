
"use client"

import { useState } from "react"
import { FiXCircle } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Bounce, toast } from "react-toastify"

interface CancelBookingProps {
    bookingId: string
    studioTitle: string
    onDeleted: (id: string) => void
}

const CancelBooking = ({
    bookingId,
    studioTitle,
    onDeleted,
}: CancelBookingProps) => {

    const [loading, setLoading] = useState(false)

    const handleCancel = async () => {
        

       
        try {
            setLoading(true)

            const res = await fetch(
                `http://localhost:5000/bookingdelet/${bookingId}`,
                {
                    method: "DELETE",
                }
            )

            if (!res.ok) {
                throw new Error("Failed to cancel booking")
            }

            const data = await res.json()

            console.log("Booking Deleted:", data)

            // Remove booking from parent UI
            onDeleted(bookingId)

        } catch (error) {
            console.error("Cancel Booking Error:", error)
            
            toast.warn('Unable to cancel booking. Please try again.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mt-5 flex justify-end">
            <Button
                type="button"
                disabled={loading}
                onClick={handleCancel}
                className="group h-11 w-full gap-2 rounded-xl !border !border-[#E5E7EB] !bg-white px-5 text-sm font-semibold !text-[#6B7280] shadow-sm transition-all duration-200 hover:!border-[#1E1E1E] hover:!bg-[#1E1E1E] hover:!text-white active:scale-[0.98] sm:w-auto disabled:cursor-not-allowed disabled:opacity-50"
            >
                <FiXCircle className="h-4 w-4 transition-transform duration-200 group-hover:rotate-[-12deg]" />

                {loading ? "Cancelling..." : "Cancel Booking"}
            </Button>
        </div>
    )
}

export default CancelBooking
