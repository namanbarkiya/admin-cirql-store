"use client";

import { useEffect } from "react";

import { UserButton } from "@clerk/nextjs";
import { useModalStore } from "@/hooks/use-modal-store";

export default function Home() {
    const isOpen = useModalStore((state) => state.isOpen);
    const onOpen = useModalStore((state) => state.onOpen);

    useEffect(() => {
        if (!isOpen) {
            onOpen();
        }
    }, [isOpen]);

    return (
        <div className="flex min-h-screen flex-col items-center p-24">
            <UserButton afterSignOutUrl="/" />
        </div>
    );
}
