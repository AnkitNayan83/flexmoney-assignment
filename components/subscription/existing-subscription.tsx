import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import SubscriptionCard from "./subscription-card";
import NoSubFound from "./no-sub-found";

const ExistingSubscription = async () => {
    const profile = await currentProfile();
    const currDate = new Date();
    const subscriptions = await db.subscription.findMany({
        where: {
            profileId: profile?.id,
            endDate: {
                gt: currDate,
            },
        },
        include: {
            profile: true,
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    return (
        <div className="p-4 md:py-6 md:px-16 mt-4 flex flex-col items-center gap-4">
            {subscriptions?.length === 0 && <NoSubFound />}
            {subscriptions?.map((sub) => (
                <SubscriptionCard subscriptions={sub} key={sub.id} />
            ))}
        </div>
    );
};

export default ExistingSubscription;
