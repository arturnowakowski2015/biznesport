import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function MessagesTable({
    messages,
    isLoading,
    deleting,
    onEdit,
    onDelete,
}: any) {
    if (isLoading) return <p className="p-4 text-center">loading...</p>;
    useEffect(() => {
        console.log("TABLE DATA:", messages);
    }, [messages]);
    return (
        <div className="card container highlight">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>content</TableHead>
                        <TableHead className="text-right">Akcje</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {messages.length > 0 ? (
                        messages.map((msg: any) => (
                            <TableRow key={msg.id}>
                                <TableCell className="font-medium">{msg.id}</TableCell>
                                <TableCell>{msg.content}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onEdit(msg)}
                                        >
                                            edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            disabled={deleting}
                                            onClick={() => onDelete(msg.id)}
                                        >
                                            delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} className="h-24 text-center">
                                Brak wiadomości.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
