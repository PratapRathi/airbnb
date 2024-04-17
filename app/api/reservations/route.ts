import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();

    const body = await request.json();
    const { totalPrice, startDate, endDate, listingId } = body;

    if (!totalPrice || !startDate || !endDate || !listingId) {
        return NextResponse.error();
    }

    const listingAndReservation = await prisma.listing.update({
        where: { id: listingId },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    })

    return NextResponse.json(listingAndReservation);
}