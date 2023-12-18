"use client";

import { Subscription, YogaSlots } from "@prisma/client";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal";
import { BadgeCheck, PyramidIcon } from "lucide-react";

interface SubscriptionCardProps {
    subscriptions: Subscription;
    lastSubId: string;
}

const DATE_FORMAT = "d MMM yyyy, HH:mm";
const slotMap = {
    [YogaSlots.s1_6TO7]: "6 to 7 am",
    [YogaSlots.s1_7TO8]: "7 to 8 am",
    [YogaSlots.s1_8TO9]: "8 to 9 am",
    [YogaSlots.s1_5TO6]: "5 to 6 pm",
};

const SubscriptionCard = ({ subscriptions, lastSubId }: SubscriptionCardProps) => {
    const curr = new Date();
    const { onOpen } = useModal();

    const utcStartDate = Date.UTC(curr.getFullYear(), curr.getMonth(), curr.getDate());
    const utcEndDate = Date.UTC(
        subscriptions.endDate.getFullYear(),
        subscriptions.endDate.getMonth(),
        subscriptions.endDate.getDate()
    );
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const timeDifference = utcEndDate - utcStartDate;
    const daysDifference = Math.floor(timeDifference / millisecondsPerDay);

    const isActive = subscriptions.startDate <= curr && subscriptions.endDate >= curr;

    return (
        <div className="flex flex-col gap-6 border-2 border-dashed border-green-600 bg-green-200 w-full p-4">
            <div className="flex items-center justify-between text-xs md:text-lg">
                <div>Booked on {format(new Date(subscriptions.createdAt), DATE_FORMAT)}</div>
                <div className="flex items-center gap-2">
                    {isActive && (
                        <Button className="bg-green-500 h-6 md:h-8 hover:bg-green-400">
                            Active
                        </Button>
                    )}
                    <div>{daysDifference} days left</div>
                </div>
            </div>
            <div className="flex items-center justify-between text-sm md:text-lg">
                <div>
                    Start Date{" "}
                    <strong> {format(new Date(subscriptions.startDate), DATE_FORMAT)}</strong>
                </div>
                <div>
                    End Date{" "}
                    <strong> {format(new Date(subscriptions.endDate), DATE_FORMAT)}</strong>
                </div>
            </div>
            <div className="text-sm md:text-lg">
                <p>
                    You can pay at anytime during your subscription. You have to bring your own mat
                    for yoga classes. <strong>Dont be late!</strong>
                </p>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-0  md:items-center justify-between text-sm md:text-lg">
                <div className="flex items-center gap-2">
                    <h1>
                        Your Slot: <strong>{slotMap[subscriptions.slot]}</strong>
                    </h1>
                    {subscriptions?.id === lastSubId && (
                        <Button
                            className="h-6 md:h-8"
                            onClick={() => onOpen("changeSlot", { subscription: subscriptions })}
                        >
                            Change Slot
                        </Button>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {!subscriptions.paid ? (
                        <Button
                            className="bg-green-500 h-8 hover:bg-green-400"
                            onClick={() =>
                                onOpen("subscriptionPayment", { subscription: subscriptions })
                            }
                        >
                            Pay Now
                        </Button>
                    ) : (
                        <Button className="h-8 bg-white hover:bg-white">
                            <BadgeCheck className="text-green-600" />
                            <p className="text-green-500">Paid</p>
                        </Button>
                    )}
                    {!subscriptions.cancel && (
                        <Button
                            onClick={() =>
                                onOpen("cancelSubscription", { subscription: subscriptions })
                            }
                            variant="destructive"
                            className="h-8"
                        >
                            cancel
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionCard;
