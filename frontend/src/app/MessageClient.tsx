"use client";

import styles from "./globals.css";
import { useMessages } from "@/features/messages/hooks/useMessages";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { MessageForm } from "@/features/messages/components/MessageForm";
import { MessageTable } from "@/features/messages/components/MessageTable";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog/dialog";

const MAX_CONTENT_LENGTH = 500;

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

    if (isError) return <p>Błąd ładowania danych 😢</p>;

    return (
        <div className={styles.container}>

            {/* MODAL EDYCJI */}
            <Dialog
                open={!!state.editingMessage}
                onOpenChange={(open) => !open && handlers.closeEdit()}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edytuj wiadomość</DialogTitle>
                    </DialogHeader>

                    <MessageForm
                        value={state.editContent}
                        error={state.editError}
                        isLoading={updateState.isLoading}
                        maxLength={MAX_CONTENT_LENGTH}
                        onChange={(v) =>
                            dispatch({ type: "setEditContent", payload: v })
                        }
                        onSubmit={handlers.handleEdit}
                    />
                </DialogContent>
            </Dialog>

            <Card>
                <CardHeader>
                    <CardTitle>Panel wiadomości</CardTitle>
                </CardHeader>
                <CardContent>
                    <MessageForm
                        value={state.newContent}
                        error={state.newError}
                        isLoading={addState.isLoading}
                        maxLength={MAX_CONTENT_LENGTH}
                        onChange={(v) =>
                            dispatch({ type: "setNewContent", payload: v })
                        }
                        onSubmit={handlers.handleAdd}
                    />
                </CardContent>
            </Card>

            {/* LISTA */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Lista</CardTitle>
                </CardHeader>
                <CardContent>
                    <MessageTable
                        messages={messages}
                        isLoading={isLoading}
                        isError={isError}
                        onEdit={handlers.openEdit}
                        onDelete={handlers.handleDelete}
                        deleting={deleteState.isLoading}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
