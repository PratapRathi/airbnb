import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    if (!currentUser) return new NextResponse("Not Authorized", { status: 400 });

    const body = await request.json();
    const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price } = body;

    if(!category) return new NextResponse("Please Select Category too", { status: 400 });
    if(!imageSrc) return new NextResponse("Please upload image also", { status: 400 });
    if(!location) return new NextResponse("Please choose location also", { status: 400 });

    const listing = await prisma.listing.create({
        data:{
            title, 
            description, 
            imageSrc, 
            category, 
            roomCount, 
            bathroomCount, 
            guestCount, 
            locationValue: location.value, 
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing);
}