import Image from "next/image";
import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";

const Description = () => {
    return (
        <div className="p-20 bg-yellow-300 flex flex-col items-center justify-between  h-[calc(100vh_-_72px)]">
            <div className="flex flex-col items-center gap-10">
                <h1 className="text-6xl font-semibold">Welcom to yoga app</h1>
                <p className="text-zinc-600 text-justify ">
                    Yoga app is a place where you can book your yoga classes and live a healthy
                    life. So what are you waiting for book a slot today.
                </p>
            </div>

            <div className="relative h-[300px] w-[300px]">
                <Image src={"/head.png"} alt="homepage" fill />
            </div>
            <div>
                <a href="/subscriptions">
                    <Button className="w-[200px]">Book a slot</Button>
                </a>
            </div>
        </div>
    );
};

export default Description;
