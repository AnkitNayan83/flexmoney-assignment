import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {
        params,
    }: {
        params: { subscriptionId: string };
    }
) {
    try {
        const profile = await currentProfile();
        const subscriptionId = params.subscriptionId;

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!subscriptionId) {
            return new NextResponse("subscription id not found", { status: 401 });
        }

        const subscription = await db.subscription.update({
            where: {
                id: subscriptionId,
                profileId: profile.id,
            },
            data: {
                paid: true,
            },
        });

        if (!subscription) {
            return new NextResponse("no subscription found", { status: 404 });
        }

        return NextResponse.json(subscription);
    } catch (error) {
        console.log(error);
        return new NextResponse("UPDATE_ERROR_SUB", { status: 500 });
    }
}
