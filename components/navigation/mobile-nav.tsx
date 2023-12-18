import { Menu } from "lucide-react";

import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";
import UserButtonAction from "../userActions/user-buttons";
import { currentProfile } from "@/lib/current-profile";

const MobileToggle = async () => {
    const profile = await currentProfile();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex gap-0">
                <a href="/subscriptions">
                    <Button>Book a slot</Button>
                </a>
                {profile ? (
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                avatarBox: "h-[48px] w-[48px]",
                            },
                        }}
                    />
                ) : (
                    <UserButtonAction />
                )}
            </SheetContent>
        </Sheet>
    );
};

export default MobileToggle;
