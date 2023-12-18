"use client";

import { useEffect, useState } from "react";
import BuySubscriptionModal from "../modals/buy-subscription";
import ChangeSubscriptionModal from "../modals/change-slot";
import PaySubscriptionModal from "../modals/pay-subscription";
import CancelSubscriptionModal from "../modals/cancel-subscription";

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
            <PaySubscriptionModal />
            <CancelSubscriptionModal />
        </>
    );
};

export default ModalProvider;
