"use client";

import { useModalStore } from "@/hooks/use-modal-store";
import { Modal } from "@/components/ui/modal";

export const StoreModal = () => {
    const data = useModalStore();

    return (
        <Modal
            title="Hello"
            description="hello"
            isOpen={data.isOpen}
            onClose={data.onClose}
        >
            YO
        </Modal>
    );
};
