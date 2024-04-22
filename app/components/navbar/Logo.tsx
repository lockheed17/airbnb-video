'use client';

import Image from "next/image";
import {useRouter} from "next/navigation";
import {TbHomeDollar} from "react-icons/tb";


const Logo = () => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push('/')}
            className="
                hidden
                lg:flex flex-col justify-center items-center
                cursor-pointer select-none
            "
        >
            <div>
                <TbHomeDollar
                    size={30}
                />
            </div>
            <div className="font-bold">Place2live</div>
        </div>
    );
}

export default Logo;
