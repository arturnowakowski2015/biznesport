import { useReducer, type FormEvent } from "react";
import {
    useAddMessageMutation,
    useDeleteMessageMutation,
    useGetMessagesQuery,
    useUpdateMessageMutation,
    type Message
} from "../messagesApi";
import { appReducer, initialState } from "../messagesReducer";

const MAX_CONTENT_LENGTH = 500;

const validateMessage = (value: string): string => {
    const trimmed = value.trim();

    if (!trimmed) return "Wiadomosc nie moze byc pusta.";
    if (trimmed.length > MAX_CONTENT_LENGTH)
        return `Wiadomosc nie moze przekraczac ${MAX_CONTENT_LENGTH} znakow.`;

    return "";
};

export const useMessages = () => {
    const { data: messages = [], isLoading, isError } = useGetMessagesQuery();

    const [addMessage, addState] = useAddMessageMutation();
    const [updateMessage, updateState] = useUpdateMessageMutation();
    const [deleteMessage, deleteState] = useDeleteMessageMutation();

    const [state, dispatch] = useReducer(appReducer, initialState);
    const { newContent, newError, editingMessage, editContent, editError } = state;


    const handleAdd = async (data: { content: string }) => {
        console.log("BEFORE MUTATION");
        await addMessage({ content: data.content }).unwrap();
        console.log("AFTER MUTATION");
        dispatch({ type: "resetNewForm" });
    };

    const handleEdit = async (data: { content: string }) => {
        if (!editingMessage) return;

        const error = validateMessage(data.content);
        dispatch({ type: "setEditError", payload: error });

        if (error) return;

        await updateMessage({
            id: editingMessage.id,
            content: data.content.trim()
        }).unwrap();

        dispatch({ type: "resetEditForm" });
    };

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm("Czy na pewno chcesz usunac te wiadomosc?");
        if (!confirmed) return;

        await deleteMessage(id).unwrap();
    };

    const openEdit = (message: Message) => {
        dispatch({
            type: "openEdit",
            payload: message
        });
    };

    const closeEdit = () => {
        dispatch({ type: "closeEdit" });
    };
    return {
        messages,
        isLoading,
        isError,

        addState,
        updateState,
        deleteState,

        state,
        dispatch,

        handlers: {
            handleAdd,
            handleEdit,
            handleDelete,
            openEdit,
            closeEdit
        }
    };
};