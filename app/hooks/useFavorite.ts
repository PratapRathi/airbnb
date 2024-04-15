import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { User } from "@prisma/client";
import useLoginModal from "@/app/hooks/useLoginModal";
import toast from "react-hot-toast";


interface IuseFavorite {
    listingId: string,
    currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: IuseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || []
        return list.includes(listingId);
    }, [listingId, currentUser]);

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!currentUser) return loginModal.onOpen();

        try {
            let request;
            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`)
            }
            else {
                request = () => axios.post(`/api/favorites/${listingId}`)
            }
            await request();
            router.refresh();
            toast.success("Success");
        } catch (error) {
            toast.error("Something went wrong");
        }
    }, [currentUser, hasFavorited, loginModal, router, listingId])

    return {
        hasFavorited, toggleFavorite
    }
}

export default useFavorite;