import { FormEvent } from "react";
import { Message } from "../messagesApi";

type Props = {
    message: Message | null;
    value: string;
    error?: string;
    isOpen: boolean;
    isLoading: boolean;
    onChange: (v: string) => void;
    onClose: () => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};