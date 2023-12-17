"use client";

import { Frown } from "lucide-react";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal";

const NoSubFound = () => {
    const { onOpen } = useModal();
    return (
        <div className="flex flex-col items-start gap-2 w-full p-4 border-2 border-dashed rounded-md border-rose-600 bg-rose-200">
            <h1 className="text-xl font-bold">No active Subscription</h1>
            <p className="flex items-center gap-2">
                You currently dont have any active subscriptions. <Frown className="w-8 h-8" />{" "}
            </p>
            <Button variant="destructive" onClick={() => onOpen("buySubscription", {})}>
                Book Now
            </Button>
        </div>
    );
};

export default NoSubFound;
