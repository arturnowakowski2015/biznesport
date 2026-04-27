import * as React from "react";
import { Message } from "../messagesApi";
import { Button } from "../../../components/ui/button/button";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table/index";

type Props = {
    messages: Message[];
    isLoading: boolean;
    isError: boolean;
    onEdit: (message: Message) => void;
    onDelete: (id: number) => void;
    deleting: boolean;
};

export const MessageTable = ({
    messages,
    isLoading,
    isError,
    onEdit,
    onDelete,
    deleting,
}: Props) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span>Ładowanie danych...</span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4 text-red-500 border border-red-200 rounded bg-red-50">
                Wystąpił błąd podczas ładowania wiadomości.
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Wiadomość</TableHead>
                    <TableHead className="text-right">Akcje</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {messages.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                            Brak dostępnych wiadomości
                        </TableCell>
                    </TableRow>
                ) : (
                    messages.map((m) => (
                        <TableRow key={m.id}>
                            <TableCell className="font-medium">{m.id}</TableCell>
                            <TableCell>{m.content}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onEdit(m)}
                                        title="Edytuj"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => onDelete(m.id)}
                                        disabled={deleting}
                                        title="Usuń"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
};
