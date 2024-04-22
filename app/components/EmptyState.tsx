'use client';

import {useRouter} from "next/navigation";
import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";

interface EmptyStateProps {
    title?: string
    subtitle?: string
    showReset?: boolean
}

const EmptyState = ({
    title = "Немає точних збігів",
    subtitle = "Спробуйте змінити або видалити деякі фільтри",
    showReset
}: EmptyStateProps) => {
    const router = useRouter();



    return (
        <div
            className="
                h-[60vh]
                flex flex-col
                justify-center items-center
                gap-2
            "
        >
            <Heading
                center
                title={title}
                subtitle={subtitle}
            />
            <div className="w-48 mt-4">
                {showReset && (
                    <Button
                        outline
                        label="Видалити усі фільтри"
                        onClick={() => router.push('/')}
                    />
                )}
            </div>
        </div>
    );
}

export default EmptyState;