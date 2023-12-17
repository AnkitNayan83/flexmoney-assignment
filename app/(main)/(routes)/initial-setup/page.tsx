import { initailProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const UserSetup = async () => {
    const profile = await initailProfile();

    if (profile) {
        return redirect("/subscriptions");
    }

    return redirect("/user-info");
};

export default UserSetup;
