"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema, MessageFormValues } from "../schema/messageSchema";
import { useEffect } from "react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function MessageForm({
    defaultValue = "",
    onSubmit,
    isLoading,
}: {
    defaultValue?: string;
    onSubmit: (data: MessageFormValues) => void;
    isLoading?: boolean;
}) {
    const form = useForm({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            content: "",
        },
    });
    const handleSubmit = async (data: { content: string; }) => {
        await onSubmit(data);
        form.reset({ content: "" }); // 🔥 czyszczenie inputa
    };
    useEffect(() => {
        form.reset({ content: defaultValue });
    }, [defaultValue]);

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex justify-center">
                <Textarea
                    {...form.register("content")}
                    placeholder="write message..."
                />
            </div>

            <Button type="submit" className="w-full mt-3" disabled={isLoading}>
                {isLoading ? "saving.." : "Zapisz"}
            </Button>
        </form>
    );
}