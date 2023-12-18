import { redirectToSignIn } from "@clerk/nextjs";
import { currentProfile } from "./current-profile";
import { db } from "./db";

export const LastActiveSub = async () => {
    const profile = await currentProfile();

    if (!profile) return redirectToSignIn();

    const curr = new Date();

    const activeSubs = await db.subscription.findMany({
        where: {
            profileId: profile.id,
            endDate: {
                gt: curr,
            },
            cancel: false,
        },
        orderBy: {
            endDate: "desc",
        },
    });

    if (activeSubs?.length === 0) return null;

    return activeSubs?.[0];
};
