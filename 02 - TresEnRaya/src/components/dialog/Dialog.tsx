import React, { useEffect } from "react";
import "./Dialog.css";

interface DialogProps {
    isOpen: boolean;
    message:string;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    resetGame: () => void;
}

export default function Dialog({isOpen, message, setOpenModal, resetGame}:DialogProps) : JSX.Element | null {
    if(!isOpen)return null;

    const dialog = React.createRef<HTMLDialogElement>();

    useEffect(() => { 
        dialog.current?.showModal();
    },[]);

    return(
        <dialog className="dg-modal" ref={dialog}>
            <h1>{message}</h1>
            <button onClick={() => {
                setOpenModal(false);
                dialog.current?.close();
                setTimeout(resetGame, 200);
            }}>Close</button>
        </dialog>
    );
}