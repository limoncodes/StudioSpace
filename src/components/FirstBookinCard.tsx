import Link from "next/link"
import SecendBook from "./SecendBook";
interface StudioDetailsProps {
    studioDetails: {
        _id: string;
        title: string;
        category: string;
        hourlyRate: number;
        securityDeposit: number;
        maxCapacity: number;
        location: string;
        imageURL: string;
        amenities: string[];
        overview: string;
        rating?: number;
        reviews?: {
            _id?: string;
            name?: string;
            rating: number;
            comment: string;
            createdAt?: string;
        }[];
        gallery?: string[];
        owner: {
            name: string;
            email: string;
            image?: string;
        };
    }
}

const FirstBookinCard = ({ studioDetails }: StudioDetailsProps) => {
    const formatPrice = (price: number) =>
        new Intl.NumberFormat("en-US", {
            maximumFractionDigits: 2,
        }).format(price);

    return (
        <>
            <aside className="lg:sticky lg:top-28">
                <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-[0_12px_35px_rgba(0,0,0,0.05)]">

                    <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#9CA3AF]">
                        Starting From
                    </p>

                    <p className="mt-2 text-3xl font-bold text-[#1E1E1E]">
                        ${formatPrice(studioDetails.hourlyRate)}
                        <span className="text-sm font-normal text-[#6B7280]">
                            {" "}/ hour
                        </span>
                    </p>

                    <div className="my-6 space-y-4 border-y border-[#E5E7EB] py-5">
                        <div className="flex justify-between gap-3 text-sm">
                            <span className="text-[#6B7280]">Category</span>
                            <span className="text-right font-semibold text-[#1E1E1E]">
                                {studioDetails.category}
                            </span>
                        </div>

                        <div className="flex justify-between gap-3 text-sm">
                            <span className="text-[#6B7280]">Capacity</span>
                            <span className="font-semibold text-[#1E1E1E]">
                                {studioDetails.maxCapacity} People
                            </span>
                        </div>

                        <div className="flex justify-between gap-3 text-sm">
                            <span className="text-[#6B7280]">Security Deposit</span>
                            <span className="font-semibold text-[#1E1E1E]">
                                ${formatPrice(studioDetails.securityDeposit)}
                            </span>
                        </div>
                    </div>

                    <SecendBook studioDetails={studioDetails}/>

                    <p className="mt-4 text-center text-xs leading-5 text-[#9CA3AF]">
                        Booking availability and final confirmation are subject to host approval.
                    </p>
                </div>
            </aside>
        </>
    )
}

export default FirstBookinCard