import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { LastActiveSub } from "@/lib/last-active-sub";
import { YogaSlots } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const profile = await currentProfile();
        const { type } = await req.json();

        if (!profile) {
            return new NextResponse("unauthenticated", { status: 401 });
        }

        if (!type) {
            return new NextResponse("no slot found", { status: 400 });
        }

        const lastActive = await LastActiveSub();
        console.log(lastActive);
        const today = new Date();
        let startDate = today;

        if (lastActive) startDate = new Date(lastActive.endDate);

        console.log(startDate);

        const startDate1 = new Date();
        const endDate = new Date(startDate1);
        endDate.setMonth(startDate1.getMonth() + 1);

        const sub = await db.subscription.create({
            data: {
                slot: type as YogaSlots,
                paid: false,
                cancel: false,
                profileId: profile.id,
                endDate,
                startDate,
            },
        });

        return NextResponse.json(sub);
    } catch (error) {
        console.log(error);
        return new NextResponse("internal error", { status: 500 });
    }
}
