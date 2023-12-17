import Image from "next/image";
import { Button } from "../ui/button";
import { currentProfile } from "@/lib/current-profile";
import { UserButton } from "@clerk/nextjs";
import UserButtonAction from "../userActions/user-buttons";

const Navbar = async () => {
    const profile = await currentProfile();

    return (
        <div className=" p-4 bg-neutral-100 flex items-center justify-between">
            <a href="/">
                <div className="flex items-center gap-x-2">
                    <h1 className="text-3xl font-bold">Yoga App</h1>

                    <div className="w-[40px] h-[40px] rounded-full relative">
                        <Image src={"/yoga.png"} fill alt="logo" />
                    </div>
                </div>
            </a>

            <div className="flex items-center gap-x-12">
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
            </div>
        </div>
    );
};

export default Navbar;
