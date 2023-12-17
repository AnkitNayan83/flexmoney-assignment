"use client";

import { useEffect, useState } from "react";
import BuySubscriptionModal from "../modals/buy-subscription";
import ChangeSubscriptionModal from "../modals/change-slot";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <BuySubscriptionModal />
            <ChangeSubscriptionModal />
        </>
    );
};

export default ModalProvider;
