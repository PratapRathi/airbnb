"use client"
import * as z from 'zod';
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { BiRupee } from "react-icons/bi"
import { registerSchema } from '@/app/schema/registerSchema';

interface InputProps {
    id: keyof z.infer<typeof registerSchema>
    label: string
    type?: string
    disabled?: boolean
    formatPrice?: string
    required?: boolean
    register: UseFormRegister<z.infer<typeof registerSchema>>
    errors: FieldErrors
}

const Input: React.FC<InputProps> = ({ id, label, type = "text", disabled, formatPrice, required, errors, register }) => {
    if(errors){
        console.log(errors);
    }
    return (
        <div className="w-full relative">
            {formatPrice && <BiRupee size={24} className="absolute top-5 left-2 text-neutral-700" />}
            <input id={id} disabled={disabled} {...register(id)} type={type} placeholder=" " className={`
            peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition
            disabled:opacity-70 disabled:cursor-not-allowed
            ${formatPrice ? "pl-9" : "pl-4"}
            ${errors[id] ? "border-rose-500" : "border-neutral-300"}
            ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
      `} />
            <label htmlFor={id} className={`
                absolute text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
                ${formatPrice? "left-9" : "left-4"}
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-4
                ${errors[id]? "text-rose-500":"text-zinc-400"}
            `}>
                {label}
            </label>
        </div>
    )
}

export default Input
