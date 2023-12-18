import Image from "next/image";
import { Button } from "../ui/button";
import { currentProfile } from "@/lib/current-profile";
import { UserButton } from "@clerk/nextjs";
import UserButtonAction from "../userActions/user-buttons";
import MobileToggle from "./mobile-nav";

const Navbar = async () => {
    const profile = await currentProfile();

    return (
        <div className=" p-4 flex items-center justify-between">
            <a href="/">
                <div className="flex items-center gap-x-2">
                    <h1 className="text-lg md:text-3xl font-bold">Yoga App</h1>

                    <div className="w-[40px] h-[40px] rounded-full relative">
                        <Image src={"/yoga.png"} fill alt="logo" />
                    </div>
                </div>
            </a>

            <div className="flex items-center gap-2 md:gap-x-12">
                <a href="/subscriptions">
                    <Button className="hidden md:flex">Book a slot</Button>
                </a>
                {profile ? (
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                avatarBox: "md:h-[48px] w-md:[48px]",
                            },
                        }}
                    />
                ) : (
                    <UserButtonAction />
                )}
            </div>
        </div>
    );
};

export default Navbar;
