"use client"
import { Listing, User } from "@prisma/client"
import Container from "@/app/components/Container"
import Heading from "@/app/components/Heading"
import ListingCard from "@/app/components/listings/ListingCard"

interface FavoriteClientProps {
    currentUser?: User | null
    listings: Listing[]
}

const FavoriteClient: React.FC<FavoriteClientProps> = ({ listings, currentUser }) => {
    return (
        <Container>
            <Heading title="Favorites" subtitle="List of your favorite places"/>
            <div className="mt-10 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {listings.map((listing)=>(
                    <ListingCard key={listing.id} currentUser={currentUser} data={listing}/>
                ))}
            </div>
        </Container>
    )
}

export default FavoriteClient
