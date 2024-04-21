import prisma from "@/app/libs/prismadb";

export interface IListingParams {
    userId?: string
    guestCount?: number
    roomCount?: number
    bathroomCount?: number
    startDate?: string
    endDate?: string
    locationValue?: string
    category?: string
}

export default async function getListings(params: IListingParams) {
    try {
        const { userId, category, guestCount, roomCount, bathroomCount, startDate, endDate, locationValue } = params;

        let query: any = {};

        if (userId) query.userId = userId;

        if (category) query.category = category;

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }
        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }
        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }

        if (locationValue) query.locationValue = locationValue;

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            {
                                endDate: { gte: endDate },
                                startDate: { lte: endDate }
                            }
                        ]
                    }
                }
            }
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: "desc"
            }
        })
        return listings;
    } catch (error: any) {
        throw new Error(error);
    }
}