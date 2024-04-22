'use client';

import Modal from "@/app/components/modals/Modal";

import useRentModal from "@/app/hooks/useRentModal";
import {useMemo, useState} from "react";
import Heading from "@/app/components/Heading";
import {categories} from "@/app/components/navbar/Categories";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import CountrySelect from "@/app/components/inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "@/app/components/inputs/Counter";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import Input from "@/app/components/inputs/input";
import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: '',
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext()
        }

        setIsLoading(true)

        axios.post('/api/listings', data)
            .then(() => {
                toast.success("Оголошення створено!")
                router.refresh()
                reset()
                setStep(STEPS.CATEGORY)
                rentModal.onClose()
            })
            .catch(() => {
                toast.error("Щось пішло не так.")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Створити';
        }

        return 'Далі'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return 'Назад';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Що з цього найкраще описує ваше місце?"
                subtitle="Оберіть категорію"
            />
            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                    max-h-[50vh]
                    overflow-y-auto
                "
            >
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) =>
                                setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            labelUk={item.labelUk}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Де знаходиться ваше місце?"
                    subtitle="Допоможіть вашим гостям знайти вас!"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map
                    center={location?.latlng}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Поділіться деякими відомостями про ваше місце"
                    subtitle="Які зручності у вас є?"
                />
                <Counter
                    title="Гості"
                    subtitle="Скільки гостей ви можете прийняти?"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr/>
                <Counter
                    title="Кімнати"
                    subtitle="Скільки кімнат ви маєте?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr/>
                <Counter
                    title="Ванні кімнати"
                    subtitle="Скільки ванних кімнат ви маєте?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Додайте фото вашого місця"
                    subtitle="Покажіть гостям, як виглядає ваше місце!"
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Як би ви описали своє місце?"
                    subtitle="Коротко і зрозуміло працює найкраще!"
                />
                <Input
                    id="title"
                    label="Назва"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr/>
                <Input
                    id="description"
                    label="Опис"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Встановіть свою ціну"
                    subtitle="Скільки ви берете за ніч?"
                />
                <Input
                    id="price"
                    label="Ціна"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Здайте ваше житло!"
            body={bodyContent}
        />
    );
}

export default RentModal;