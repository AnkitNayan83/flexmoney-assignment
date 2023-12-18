"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { YogaSlots } from "@prisma/client";
import { useModal } from "@/hooks/use-modal";
import { useState } from "react";

const slotMap = {
    [YogaSlots.s1_6TO7]: "6 to 7 am",
    [YogaSlots.s1_7TO8]: "7 to 8 am",
    [YogaSlots.s1_8TO9]: "8 to 9 am",
    [YogaSlots.s1_5TO6]: "5 to 6 pm",
};

const CancelSubscriptionModal = () => {
    const { isOpen, type, onClose, data } = useModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { subscription } = data;
    const curr = new Date();
    const isActive =
        subscription && subscription?.startDate <= curr && subscription?.endDate >= curr;

    const currentSlot = subscription?.slot || YogaSlots.s1_6TO7;

    const isModalOpen = isOpen && type === "cancelSubscription";

    const handelCancel = async () => {
        try {
            setIsLoading(true);
            await axios.patch(`/api/cancel/${subscription?.id}`);
            router.refresh();
            onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handelClose = () => {
        onClose();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handelClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Cancel Subscription
                    </DialogTitle>
                    <DialogDescription className="text-red-500">
                        Are you sure you want to canel?
                    </DialogDescription>
                    <DialogDescription className="text-lg font-semibold ">
                        Your Slot: {slotMap[currentSlot]}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <Button onClick={() => handelCancel()} disabled={isLoading}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CancelSubscriptionModal;
