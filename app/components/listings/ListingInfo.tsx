'use client';

import {IconType} from "react-icons";
import {SafeUser} from "@/app/types";
import useCountries from "@/app/hooks/useCountries";
import Avatar from "@/app/components/Avatar";
import ListingCategory from "@/app/components/listings/ListingCategory";
import dynamic from "next/dynamic";
import {getGuestEnding} from "@/app/utils/getGuestEnding";
import {getRoomEnding} from "@/app/utils/getRoomEnding";
import {getBathroomEnding} from "@/app/utils/getBathroomEnding";

const Map = dynamic(() => import('../Map'), {
    ssr: false,
});

interface ListingInfoProps {
    user: SafeUser,
    description: string
    guestCount: number,
    roomCount: number,
    bathroomCount: number,
    category: {
        icon: IconType
        label: string
        labelUk?: string
        description: string
        descriptionUk: string
    } | undefined,
    locationValue: string
}

const ListingInfo = ({
        roomCount,
        bathroomCount,
        guestCount,
        locationValue,
        description,
        user,
        category
}: ListingInfoProps) => {
    const {getByValue} = useCountries();

    const coordinates = getByValue(locationValue)?.latlng;

    const guestEnding = getGuestEnding(guestCount);
    const roomEnding = getRoomEnding(roomCount);
    const bathroomEnding = getBathroomEnding(bathroomCount);

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="
                    text-xl
                    font-semibold
                    flex flex-row
                    items-center
                    gap-2
                ">
                    <div>Розмістив {user?.name}</div>
                    <Avatar src={user?.image}/>
                </div>
                <div className="
                    flex flex-row
                    items-center
                    gap-4
                    font-light
                    text-neutral-500
                ">
                    <div>
                        {guestCount} {guestEnding}
                    </div>
                    <div>
                        {roomCount} {roomEnding}
                    </div>
                    <div>
                        {bathroomCount} {bathroomEnding}
                    </div>
                </div>
            </div>
            <hr/>
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    labelUk={category.labelUk}
                    description={category.description}
                    descriptionUk={category.descriptionUk}
                />
            )}
            <hr/>
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr/>
            <Map center={coordinates}/>
        </div>
    );
}

export default ListingInfo;