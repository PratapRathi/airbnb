"use client"
import { Listing, Reservation, User } from "@prisma/client"
import ListingCard from "@/app/components/listings/ListingCard"
import Container from "@/app/components/Container"
import Heading from "@/app/components/Heading"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"

interface ReservationClientProps {
    currentUser?: User
    reservations: Array<Reservation & { listing: Listing }>
}

const ReservationClient: React.FC<ReservationClientProps> = ({ reservations, currentUser }) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`).then(() => {
            toast.success("Reservation cancelled");
            router.refresh();
        }).catch((error) => {
            toast.error("Something went wrong")
        }).finally(() => {
            setDeletingId("");
        })
    }, [router]);

    return (
        <Container>
            <Heading title="Reservations" subtitle="Booking on your properties" />
            <div className="mt-10 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {reservations.map((reservation)=>(
                    <ListingCard 
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel guest reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default ReservationClient
