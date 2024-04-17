"use client"
import ListingCard from "@/app/components/listings/ListingCard"
import { Listing, Reservation, User } from "@prisma/client"
import Container from "@/app/components/Container"
import Heading from "@/app/components/Heading"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"


interface TripsClientProps {
    currentUser?: User
    reservations: Array<Reservation & {listing: Listing}>
}

const TripsClient: React.FC<TripsClientProps> = ({ reservations, currentUser }) => {
    console.log(reservations);
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/reservation/${id}`).then(() => {
            toast.success("Reservation cancelled");
            router.refresh();
        }).catch((error) => {
            toast.error(error?.response?.data?.error);
        }).finally(() => {
            setDeletingId("");
        })
    }, [router]);

    return (
        <Container>
            <Heading title="Trips" subtitle="Where you've been and where you're going" />
            <div className="mt-10 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel reservation"
                        currentUser={currentUser}
                        reservation={reservation}
                    />
                ))}
            </div>
        </Container>
    )
}

export default TripsClient
