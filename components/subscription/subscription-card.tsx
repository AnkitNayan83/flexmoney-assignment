"use client";

import { Subscription, YogaSlots } from "@prisma/client";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal";

interface SubscriptionCardProps {
    subscriptions: Subscription;
}

const DATE_FORMAT = "d MMM yyyy, HH:mm";
const slotMap = {
    [YogaSlots.s1_6TO7]: "6 to 7 am",
    [YogaSlots.s1_7TO8]: "7 to 8 am",
    [YogaSlots.s1_8TO9]: "8 to 9 am",
    [YogaSlots.s1_5TO6]: "5 to 6 pm",
};

const SubscriptionCard = ({ subscriptions }: SubscriptionCardProps) => {
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
            <div className="flex items-center justify-between">
                <div>Booked on {format(new Date(subscriptions.createdAt), DATE_FORMAT)}</div>
                <div className="flex items-center gap-2">
                    {isActive && (
                        <Button className="bg-green-500 h-8 hover:bg-green-400">Active</Button>
                    )}
                    <div>{daysDifference} days left</div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div>Start Date {format(new Date(subscriptions.startDate), DATE_FORMAT)}</div>
                <div>End Date {format(new Date(subscriptions.endDate), DATE_FORMAT)}</div>
            </div>
            <div>
                <p>
                    You can pay at anytime during your subscription. You have to bring your own mat
                    for yoga classes. <strong>Dont be late!</strong>
                </p>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h1>
                        Your Slot: <strong>{slotMap[subscriptions.slot]}</strong>
                    </h1>
                    {isActive && (
                        <Button
                            className="h-8"
                            onClick={() => onOpen("changeSlot", { subscription: subscriptions })}
                        >
                            Change Slot
                        </Button>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {!subscriptions.paid && (
                        <Button className="bg-green-500 h-8 hover:bg-green-400">Pay Now</Button>
                    )}
                    {!subscriptions.cancel && (
                        <Button variant="destructive" className="h-8">
                            cancel
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionCard;
