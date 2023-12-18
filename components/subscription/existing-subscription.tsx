import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import SubscriptionCard from "./subscription-card";
import NoSubFound from "./no-sub-found";
import { LastActiveSub } from "@/lib/last-active-sub";
import { Subscription } from "@prisma/client";

const ExistingSubscription = async () => {
    const profile = await currentProfile();
    const currDate = new Date();
    const subscriptions = await db.subscription.findMany({
        where: {
            profileId: profile?.id,
            endDate: {
                gt: currDate,
            },
            cancel: false,
        },
        include: {
            profile: true,
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    const lastSub: Subscription = await LastActiveSub();

    return (
        <div className="p-4 md:py-6 md:px-16 mt-4 flex flex-col items-center gap-4">
            {subscriptions?.length === 0 && <NoSubFound />}
            {subscriptions?.map((sub) => (
                <SubscriptionCard subscriptions={sub} key={sub.id} lastSubId={lastSub?.id} />
            ))}
        </div>
    );
};

export default ExistingSubscription;
