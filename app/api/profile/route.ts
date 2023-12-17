import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const user = await currentUser();
        const { age } = await req.json();
        if (!user) {
            return new NextResponse("unauthenticated", { status: 401 });
        }

        if (!age) {
            return new NextResponse("no age found", { status: 400 });
        }

        if (age < 18 || age > 65) {
            return new NextResponse("Invalid age", { status: 401 });
        }

        const newUser = await db.profile.create({
            data: {
                age,
                userId: user.id,
                name: user.firstName + " " + user.lastName,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress,
            },
        });

        return NextResponse.json(newUser);
    } catch (error) {
        console.log(error);
        return new NextResponse("internal error", { status: 500 });
    }
}
