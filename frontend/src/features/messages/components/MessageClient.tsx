"use client";

import { useMessages } from "@/features/messages/hooks/useMessages";
import MessagesForm from "./MessageForm";
import MessagesTable from "./MessageTable";
import EditMessageModal from "./EditMessageModal";
import MessageForm from "./MessageForm";

export default function MessagesClient() {
    const {
        messages,
        isLoading,
        isError,
        addState,
        updateState,
        deleteState,
        state,
        dispatch,
        handlers,
    } = useMessages();
    const isOpen = Boolean(state.editingMessage);
    if (isError) return <p>loading error 😢</p>;
    console.log("editingMessage:", state.editingMessage);
    return (
        <div className="space-y-6 flex flex-col justify-center items-center min-h-screen">
            <MessageForm onSubmit={handlers.handleAdd} />

            <MessagesTable
                messages={messages}
                isLoading={isLoading}
                deleting={deleteState.isLoading}
                onEdit={handlers.openEdit}
                onDelete={handlers.handleDelete}
            />



            <EditMessageModal
                open={!!state.editingMessage}
                onClose={handlers.closeEdit}
                value={state.editContent}
                onSubmit={handlers.handleEdit}
            />
        </div>
    );
}