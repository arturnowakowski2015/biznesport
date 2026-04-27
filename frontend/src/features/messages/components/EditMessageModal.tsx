"use client";

import * as Dialog from "@radix-ui/react-dialog";
import MessageForm from "./MessageForm";

type Props = {
    open: boolean;
    value: string;
    isLoading?: boolean;
    onClose: () => void;
    onSubmit: (data: { content: string }) => void;
};

export default function EditMessageModal({
    open,
    value,
    isLoading,
    onClose,
    onSubmit,
}: Props) {
    return (
        <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
            <Dialog.Portal>

                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />


                <Dialog.Content
                    className="
            fixed top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            w-[420px]
            bg-white
            p-6
            rounded-xl
            shadow-2xl
            z-50
          "
                >
                    <Dialog.Close asChild>
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                            aria-label="Zamknij"
                        >
                            ✕
                        </button>
                    </Dialog.Close>

                    {/* title */}
                    <Dialog.Title className="text-lg font-semibold mb-2">
                        edit Your content
                    </Dialog.Title>

                    <Dialog.Description className="text-sm text-gray-500 mb-4">
                        edit text and save item
                    </Dialog.Description>

                    {/* form */}
                    <MessageForm
                        defaultValue={value}
                        isLoading={isLoading}
                        onSubmit={onSubmit}
                    />
                </Dialog.Content>

            </Dialog.Portal>
        </Dialog.Root>
    );
}