"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const UserButtonAction = () => {
    const router = useRouter();
    const handelClick = (type: string) => {
        console.log("h");
        if (type === "a") {
            router.push("/sign-in");
        } else {
            router.push("/sign-up");
        }
    };
    return (
        <div className="flex items-center gap-x-2">
            <Button className="h-6 w-max text-xs md:text-lg" onClick={() => handelClick("a")}>
                Sign in
            </Button>
            <Button
                onClick={() => handelClick("b")}
                className="bg-white text-black hover:text-white h-6 w-max text-xs md:text-lg"
            >
                Sign Up
            </Button>
        </div>
    );
};

export default UserButtonAction;
