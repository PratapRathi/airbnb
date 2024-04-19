"use client"

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "@/app/components/Avatar"
import { useCallback, useState } from "react"
import MenuItem from "@/app/components/navbar/MenuItem"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"
import useRentModal from "@/app/hooks/useRentModal"
import { useRouter } from "next/navigation"

interface UserMenuProps {
    currentUser?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(()=>{
        if(!currentUser) return loginModal.onOpen();
        rentModal.onOpen();
    },[currentUser, loginModal, rentModal]);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={onRent} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full transition hover:bg-neutral-100 cursor-pointer">
                    Airbnb your home
                </div>
                <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {!currentUser ? (
                            <>
                                <MenuItem onClick={loginModal.onOpen} label="Login" />
                                <MenuItem onClick={registerModal.onOpen} label="SignUp" />
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={() => router.push("/trips")} label="My Trips" />
                                <MenuItem onClick={() => router.push("/favorites")} label="My Favorites" />
                                <MenuItem onClick={() => router.push("/reservations")} label="My Reservations" />
                                <MenuItem onClick={() => router.push("/properties")} label="My Properties" />
                                <MenuItem onClick={rentModal.onOpen} label="Airbnb My Home" />
                                <hr />
                                <MenuItem onClick={() => signOut()} label="Logout" />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu
