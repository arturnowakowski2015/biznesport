import { FormEvent } from "react";
import { Button } from "../../../components/ui/button/button";
import { Textarea } from "../../../components/ui/textarea/textarea";
import { Label } from "../../../components/ui/label/label";

type Props = {
    value: string;
    error?: string;
    isLoading: boolean;
    maxLength: number;
    onChange: (value: string) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export const MessageForm = ({
    value,
    error,
    isLoading,
    maxLength,
    onChange,
    onSubmit
}: Props) => {
    return (
        <form onSubmit={onSubmit}>
            <Label htmlFor="message-content">Nowa wiadomosc</Label>

            <Textarea
                id="message-content"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                maxLength={maxLength}
                placeholder="Wpisz tresc wiadomosci..."
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{value.length}/{maxLength}</span>

                <Button disabled={isLoading} type="submit">
                    {isLoading ? "Dodawanie..." : "Dodaj"}
                </Button>
            </div>
        </form>
    );
};