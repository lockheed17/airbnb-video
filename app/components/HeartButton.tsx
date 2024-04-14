'use client';

import {SafeUser} from "../types";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";

interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

const HeartButton = ({listingId, currentUser, size=28}: HeartButtonProps) => {
    const hasFavorited = false;
    const toggleFavorite = () => {};

    return (
        <div
            onClick={toggleFavorite}
            className="
                relative
                hover:opacity-80
                transition
                cursor-pointer
            "
        >
            <AiOutlineHeart
                size={size}
                className="
                    fill-white
                    absolute
                    -top-[2px]
                    -right-[2px]
                "
            />
            <AiFillHeart
                size={size - 4}
                className={
                    hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"
                }
            />
        </div>
    );
}

export default HeartButton;