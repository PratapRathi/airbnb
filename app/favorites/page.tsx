import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListing from "@/app/actions/getFavoriteListing"
import EmptyState from "@/app/components/EmptyState";
import FavoriteClient from "@/app/favorites/FavoriteClient";


const FavoritePage = async () => {
    const [favorite, currentUser] = await Promise.all([getFavoriteListing(), getCurrentUser()]);

    if(favorite.length === 0) {
        return (
            <EmptyState title="No favorite found" subtitle="Looks like you have no favorite property"/>
        )
    }

    return (
        <FavoriteClient currentUser={currentUser} listings={favorite}/>
    )
}

export default FavoritePage
