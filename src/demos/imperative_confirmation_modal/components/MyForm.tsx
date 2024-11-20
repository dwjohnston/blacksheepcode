"use client";
import { useConfirmationModal } from "../hooks/useConfirmationModal";

export function MyForm() {

    const [content, openModal] = useConfirmationModal();
    return <div>
        {content}
        <form onSubmit={(e) => {
            e.preventDefault();

            openModal(() => {
                alert("Hello world!")
            })

        }}>
            <p>This is a form</p>

            <button type="submit">Submit</button>
        </form>
    </div>
}