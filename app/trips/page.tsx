import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservation";
import TripsClient from "@/app/trips/TripsClient";



const TripsPage = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return (
            <EmptyState title="Unauthorized" subtitle="Please Login" />
        )
    }

    const reservations = await getReservations({userId: currentUser.id});
    if(reservations.length === 0) {
        return (
            <EmptyState title="No trips found" subtitle="Looks like you haven't booked any trips"/>
        )
    }

    return (
        <TripsClient reservations={reservations} currentUser={currentUser}/>
    )
}

export default TripsPage
