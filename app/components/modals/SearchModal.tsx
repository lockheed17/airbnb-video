'use client';

import Modal from "@/app/components/modals/Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import {useRouter, useSearchParams} from "next/navigation";
import {useCallback, useMemo, useState} from "react";
import {Range} from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, {CountrySelectValue} from "@/app/components/inputs/CountrySelect";
import qs from "query-string";
import {formatISO} from "date-fns";
import Heading from "@/app/components/Heading";
import Calendar from "@/app/components/inputs/Calendar";
import Counter from "@/app/components/inputs/Counter";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [location, setLocation] = useState<CountrySelectValue>()
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    });

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }),[location]);

    const onBack = useCallback(() => {
        setStep(value => value - 1)
    }, []);

    const onNext = useCallback(() => {
        setStep(value => value + 1)
    }, []);

    const onSubmit = useCallback(async () => {
        if(step !== STEPS.INFO){
            return onNext()
        }

        let currentQuery = {}

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        }

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate)
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true})


        setStep(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);
    },[
        step,
        searchModal,
        location,
        router,
        guestCount,
        roomCount,
        bathroomCount,
        dateRange,
        onNext,
        params
    ]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Пошук';
        }

        return 'Далі'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined;
        }

        return 'Назад';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Куди ви хочете поїхати?"
                subtitle="Знайдіть ідеальне місце!"
            />
            <CountrySelect
                value={location}
                onChange={(value) => {
                    setLocation(value as CountrySelectValue)
                }}
            />
            <hr/>
            <Map center={location?.latlng} />
        </div>
    );

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Коли ви плануєте їхати?"
                    subtitle="Переконайтеся, що всі дні вільні!"
                />
                <Calendar
                    value={dateRange}
                    onChange={ value => setDateRange(value.selection)}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Додаткова інформація"
                    subtitle="Знайдіть своє ідеальне місце!"
                />
                <Counter
                    title="Гості"
                    subtitle="Скільки буде гостей?"
                    value={guestCount}
                    onChange={value => setGuestCount(value)}
                />
                <Counter
                    title="Кімнати"
                    subtitle="Скільки кімнат вам потрібно?"
                    value={roomCount}
                    onChange={value => setRoomCount(value)}
                />
                <Counter
                    title="Ванні кімнати"
                    subtitle="Скільки ванних кімнат вам потрібно?"
                    value={bathroomCount}
                    onChange={value => setBathroomCount(value)}
                />
            </div>
        )
    }

    return (
        <div>
            <Modal
                isOpen={searchModal.isOpen}
                onClose={searchModal.onClose}
                onSubmit={onSubmit}
                title="Фільтри"
                actionLabel={actionLabel}
                secondaryActionLabel={secondaryActionLabel}
                secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
                body={bodyContent}
            />
        </div>
    );
}

export default SearchModal;