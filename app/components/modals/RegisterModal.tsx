'use client';

import axios from 'axios';
import {AiFillGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import {useCallback, useState} from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import {signIn} from "next-auth/react";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                toast.success("Ви успішно зареєструвалися!")
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error) => {
                toast.error(`Щось пішло не так`);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent =  (
        <div className="flex flex-col gap-4">
            <Heading
                title="Ласкаво просимо до Place2live"
                subtitle="Створіть акаунт!"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Ім'я"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label="Пароль"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
            <Button
                outline
                label="Продовжити через Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Продовжити через GitHub"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div
                className="
                    text-neutral-500
                    text-center
                    mt-4
                    font-light
                "
            >
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        Вже маєте акаунт?
                    </div>
                    <div
                        onClick={toggle}
                        className="
                            text-neutral-800
                            cursor-pointer
                            hover:underline
                        "
                    >
                        Увійти
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Реєстрація"
            actionLabel="Продовжити"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModal;