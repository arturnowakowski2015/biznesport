import { Message } from "../messagesApi";
import { Button } from "../../../components/ui/button/button";
import { Pencil, Trash2 } from "lucide-react";

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
    deleting
}: Props) => {
    if (isLoading) return <p>Ladowanie...</p>;
    if (isError) return <p>Blad ladowania</p>;

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Wiadomosc</th>
                    <th>Akcje</th>
                </tr>
            </thead>

            <tbody>
                {messages.length === 0 && (
                    <tr>
                        <td colSpan={3}>Brak danych</td>
                    </tr>
                )}

                {messages.map((m) => (
                    <tr key={m.id}>
                        <td>{m.id}</td>
                        <td>{m.content}</td>
                        <td>
                            <Button onClick={() => onEdit(m)}>
                                <Pencil />
                            </Button>

                            <Button
                                onClick={() => onDelete(m.id)}
                                disabled={deleting}
                            >
                                <Trash2 />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};