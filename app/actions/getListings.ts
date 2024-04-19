import prisma from "@/app/libs/prismadb";

export interface IListingParams {
    userId?: string
}

export default async function getListings (params: IListingParams) {
    try {
        const {userId} = params;
        let query: any = {};
        if(userId){
            query.userId = userId;
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