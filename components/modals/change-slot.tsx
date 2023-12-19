"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { YogaSlots } from "@prisma/client";
import { useModal } from "@/hooks/use-modal";

const formSchema = z.object({
    type: z.nativeEnum(YogaSlots),
});

const slotMap = {
    [YogaSlots.s1_6TO7]: "6 to 7 am",
    [YogaSlots.s1_7TO8]: "7 to 8 am",
    [YogaSlots.s1_8TO9]: "8 to 9 am",
    [YogaSlots.s1_5TO6]: "5 to 6 pm",
};

const ChangeSubscriptionModal = () => {
    const { isOpen, type, onClose, data } = useModal();
    const router = useRouter();

    const { subscription } = data;
    const curr = new Date();
    const isActive =
        subscription && subscription?.startDate <= curr && subscription?.endDate >= curr;

    const currentSlot = subscription?.slot || YogaSlots.s1_6TO7;

    let notCurrentSlot: YogaSlots = YogaSlots.s1_6TO7;

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: notCurrentSlot,
        },
    });

    const isModalOpen = isOpen && type === "changeSlot";

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (isActive) {
                await axios.post("api/subscriptions", values);
            } else {
                await axios.patch(`/api/subscriptions/${subscription?.id}`, values);
            }
            form.reset();
            router.refresh();
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    const handelClose = () => {
        form.reset();
        onClose();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handelClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Book Your Slot
                    </DialogTitle>
                    <DialogDescription className="text-zinc-500">
                        {isActive
                            ? "Your changes will be applied from next month"
                            : "You can change this slot"}
                    </DialogDescription>
                    <DialogDescription className="text-xl font-semibold ">
                        Current Slot: {slotMap[currentSlot]}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Slots
                                        </FormLabel>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                                                    <SelectValue placeholder="Select a channel type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(YogaSlots).map((type, i) => {
                                                    if (type === subscription?.slot) return null;
                                                    return (
                                                        <SelectItem
                                                            value={type}
                                                            key={type}
                                                            className="uppercase"
                                                        >
                                                            {slotMap[type].toUpperCase()}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button disabled={isLoading}>Save</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ChangeSubscriptionModal;
