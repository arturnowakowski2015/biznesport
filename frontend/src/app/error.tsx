"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div>
            <p>Coś poszło nie tak 😢</p>
            <button onClick={reset}>Spróbuj ponownie</button>
        </div>
    );
}