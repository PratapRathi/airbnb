"use client"
import { useCallback, useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io"
import Button from "@/app/components/Button"

interface ModalProps {
    isOpen?: boolean
    onClose: () => void
    onSubmit: () => void
    title?: string
    body?: React.ReactNode
    footer?: React.ReactNode
    actionLabel: string
    disabled?: boolean
    secondaryAction?: () => void
    secondaryLabel?: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, body, footer, actionLabel, disabled, secondaryAction, secondaryLabel }) => {
    const [showModal, setShowModal] = useState(isOpen);
    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) return;
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300)
    }, [onClose, disabled]);

    const handleSubmit = useCallback(() => {
        if (disabled) return;
        onSubmit();
    }, [disabled, onSubmit])

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) return;

    }, [disabled, secondaryAction]);

    if (!isOpen) return null;

    return (
        <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
                <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto lg:h-auto">
                    {/* Content */}
                    <div className={`
                    translate duration-300 h-full 
                    ${showModal ? 'translate-y-0' : 'translate-y-full'}
                    ${showModal ? 'opacity-100' : 'opacity-0'}
                    `}>
                        <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg
                            relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/* Header */}
                                <div className="flex items-center justify-center p-6 rounded-t relative border-b-[1px]">
                                    <button onClick={handleClose} className="p-1 border-0 transition hover:opacity-0 absolute left-9">
                                        <IoMdClose size={18}/>
                                    </button>
                                    <div className="text-lg font-semibold">{title}</div>
                                </div>
                                {/* Body */}
                                <div className="p-6 relative flex-auto">{body}</div>
                                {/* Footer */}
                                <div className="flex flex-col gap-2 p-6">
                                    <div className="flex flex-row items-center gap-4 w-full">
                                        {secondaryLabel && secondaryAction && (
                                            <Button outline disabled={disabled} onClick={handleSecondaryAction} label={secondaryLabel} />
                                        )}
                                        <Button disabled={disabled} onClick={handleSubmit} label={actionLabel} />
                                    </div>
                                    {footer}
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
