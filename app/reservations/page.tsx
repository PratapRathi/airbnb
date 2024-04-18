import getCurrentUser from "@/app/actions/getCurrentUser"
import getReservations from "@/app/actions/getReservation";
import EmptyState from "@/app/components/EmptyState";
import ReservationClient from "@/app/reservations/ReservationClient";


const ReservationPage = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return (
            <EmptyState title="Unauthorized" subtitle="Please Login" />
        )
    }

    const reservations = await getReservations({ authorId: currentUser.id });
    if (reservations.length === 0) {
        return (
            <EmptyState title="No reservation found" subtitle="Looks like you have no reservations on your property" />
        )
    }

    return (
        <ReservationClient reservations={reservations} currentUser={currentUser}/>
    )
}

export default ReservationPage
