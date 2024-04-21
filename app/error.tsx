"use client"
import { useEffect } from "react"
import EmptyState from "./components/EmptyState"

interface ErrorProps {
    error: Error
}

const Error: React.FC<ErrorProps> = ({error}) => {
    useEffect(()=>{
        console.log(error);
    },[error]);
  return (
    <EmptyState title="Uh Oh" subtitle="Something went wrong!"/>
  )
}

export default Error
