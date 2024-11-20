"use client";

import { ReactNode,  useRef } from "react";


// Avoid instantiating objects as default values for your properties
// This can lead to infinite loops 
// Instead - instantiate a single object outside of the function
// See: https://stackoverflow.com/questions/71060000/what-is-the-status-of-the-default-props-rerender-trap-in-react
const emptyObject = {};

export function useConfirmationModal(options: {
    title?: ReactNode;
    body?: ReactNode;

    // The idea here is that we want to allow the user to provide their own component if they want
    // But we need to make it a renderProp, not just a ReactNode, as we need a way to pass in the click handler
    cancelButton?: string | ((onClick: () => void) => ReactNode);
    confirmButton?: string | ((onClick: () => void) => ReactNode);
} = emptyObject): [content: ReactNode, openModal: (onConfirmHandler: () => void) => void] {

    // Setting up our default values
    const { title = "Are you sure?", body = null, cancelButton = "Cancel", confirmButton = "Confirm" } = options;

    // We store the onConfirm callback in a ref, for use when the user presses the confirm button
    const onConfirmCallbackRef = useRef(null as null | (() => void));

    // For this example, I'm using the dialog element 
    // You could implement a similar solution using whatever design system you are using.
    const dialogRef = useRef<HTMLDialogElement>(null);

    const onCancel = () => {
        // For the dialog element, we interact with the element directly
        dialogRef.current?.close();
    }

    const onConfirm = () => {
        dialogRef.current?.close();

        // Call our stored onConfirm callback
        onConfirmCallbackRef.current?.();
    }

    // Declare the JSX to be rendered
    const content = <dialog ref={dialogRef}>
        <div>{title}</div>
        <div>{body}</div>

        {typeof cancelButton === "function" ? cancelButton(onCancel) : <button onClick={onCancel}>
            {cancelButton}</button>}

        {typeof confirmButton === "function" ? confirmButton(onConfirm) : <button onClick={onCancel}>
            {confirmButton}</button>}
    </dialog>;

    // Function that will be called to open the modal
    const showModalFn = (onConfirmHandler: () => void) => {
        // Show the modal
        onConfirmCallbackRef.current = onConfirmHandler;
        // Store the callback to be called if the user clicks confirm
        dialogRef.current?.showModal();
    }


    return [content, showModalFn]
}