'use client';

import {CldUploadWidget} from "next-cloudinary";
import Image from "next/image"
import {useCallback} from "react";
import {TbPhotoPlus} from "react-icons/tb";

declare global {
    var cloudinary: any
}

const uploadPreset = "m1c8txd5";

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload = ({onChange, value}: ImageUploadProps) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url)
    }, [onChange])


    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset={uploadPreset}
            options={{
                maxFiles: 1
            }}
        >
            {({open}) => {
                return (
                    <div
                        onClick={() => open?.()}
                        className="
                                relative
                                cursor-pointer
                                hover:opacity-70
                                transition
                                border-dashed border-2 border-neutral-300
                                p-20
                                flex flex-col
                                justify-center items-center
                                gap-4
                                text-neutral-600
                        "
                    >
                        <TbPhotoPlus size={50} />
                        <div className="font-semibold text-lg">
                            Натисніть для завантаження
                        </div>
                        {value && (
                            <div
                                className="absolute inset-0 w-full h-full"
                            >
                                <Image
                                    alt="Завантажити"
                                    fill
                                    style={{objectFit: 'cover'}}
                                    src={value}
                                />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    );
}

export default ImageUpload;