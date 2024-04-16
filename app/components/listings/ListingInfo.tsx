"use client"
import { User } from "@prisma/client"
import { IconType } from "react-icons"
import { categories } from "@/app/components/navbar/Categories";
import useCountries from "@/app/hooks/useCountries";
import Avatar from "@/app/components/Avatar";
import ListingCategory from "@/app/components/listings/ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(()=> import("@/app/components/Map"), {ssr: false});

type categoryType = typeof categories[0] | undefined;

interface ListingInfoProps {
    user: User
    description: string
    roomCount: number
    guestCount: number
    bathroomCount: number
    locationValue: string
    category: categoryType
}

const ListingInfo: React.FC<ListingInfoProps> = ({ user, description, category, locationValue, roomCount, guestCount, bathroomCount }) => {
    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlng
    return (
        <div className="flex flex-col col-span-4 gap-8">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center text-xl font-semibold gap-2">
                    <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>{guestCount} Guests</div>
                    <div>{roomCount} rooms</div>
                    <div>{bathroomCount} bathroom</div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory icon={category.icon} label={category.label} description={category.description} />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">{description}</div>
            <hr />
            <Map center={coordinates}/>
        </div>
    )
}

export default ListingInfo
