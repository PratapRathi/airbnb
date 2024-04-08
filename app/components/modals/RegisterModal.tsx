"use client"
import axios from "axios";
import * as z from 'zod'
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/app/schema/registerSchema';
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    axios.post("/api/register", data).then((res) => {
      registerModal.onClose();
      toast.success("Account created succesfully");
    }).catch((err) => {
      toast.error(err.response.data);
    }).finally(() => {
      setIsLoading(false);
      reset();
    })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account" />
      <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} />
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} />
      <Input id="password" type="password" label="Password" disabled={isLoading} register={register} errors={errors} />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col mt-3 gap-4">
      <hr />
      <Button outline label="Continue with Google" onClick={() => { }} icon={FcGoogle} />
      <Button outline label="Continue with Github" onClick={() => { }} icon={AiFillGithub} />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>Already have an account?</div>
          <div onClick={registerModal.onClose} className="text-neutral-800 cursor-pointer hover:underline">Login</div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal
