"use client"
import axios from "axios";
import * as z from 'zod'
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/app/schema/registerSchema';
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onClose = () => {
        loginModal.onClose();
        registerModal.onOpen();
    }

    const onSubmit = (data: z.infer<typeof loginSchema>) => {
        setIsLoading(true);
        signIn("credentials",{
            ...data,
            redirect: false
        }).then((callback)=>{
            setIsLoading(false);
            if(callback?.ok){
                toast.success("Logged in successfully")
                router.refresh();
                loginModal.onClose();
            }
            if(callback?.error){
                toast.error("Invalid credentials")
            }
            reset();
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subtitle="Login to your account" />
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} />
            <Input id="password" type="password" label="Password" disabled={isLoading} register={register} errors={errors} />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col mt-3 gap-4">
            <hr />
            <Button outline label="Continue with Google" onClick={() => signIn("google")} icon={FcGoogle} />
            <Button outline label="Continue with Github" onClick={() => signIn("github")} icon={AiFillGithub} />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row items-center gap-2 justify-center">
                    <div>Do not have any account?</div>
                    <div onClick={onClose} className="text-neutral-800 cursor-pointer hover:underline">Register</div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal;
