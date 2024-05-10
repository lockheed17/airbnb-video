'use client';

import Container from "@/app/components/Container";
import {TbBeach, TbMountain, TbPool} from "react-icons/tb";
import {
    GiBarn,
    GiBoatFishing,
    GiCactus,
    GiCastle,
    GiCaveEntrance,
    GiForestCamp,
    GiIsland,
    GiWindmill
} from "react-icons/gi";
import {MdOutlineVilla} from "react-icons/md";
import CategoryBox from "@/app/components/CategoryBox";
import {usePathname, useSearchParams} from "next/navigation";
import {FaSkiing} from "react-icons/fa";
import {BsSnow} from "react-icons/bs";
import {IoDiamond} from "react-icons/io5";

export const categories = [
    {
        label: 'Beach',
        labelUk: 'Пляжі',
        icon: TbBeach,
        description: 'This property is close to the beach!',
        descriptionUk: 'Це помешкання знаходиться недалеко від пляжу!',
    },
    {
        label: 'Windmills',
        labelUk: 'Вітряки',
        icon: GiWindmill,
        description: 'This property has windmills!',
        descriptionUk: 'У цьому помешканні є вітряки!',
    },
    {
        label: 'Modern',
        labelUk: 'Модерн',
        icon: MdOutlineVilla,
        description: 'This property is modern!',
        descriptionUk: 'Це помешкання в стилі модерн',
    },
    {
        label: 'Countryside',
        labelUk: 'Сільська місцевість',
        icon: TbMountain,
        description: 'This property is in the countryside!',
        descriptionUk: 'Ця нерухомість знаходиться в сільській місцевості!'
    },
    {
        label: 'Pools',
        labelUk: 'Басейни',
        icon: TbPool,
        description: 'This property has a pool!',
        descriptionUk: 'У цьому помешканні є басейн!'
    },
    {
        label: 'Islands',
        labelUk: 'Острови',
        icon: GiIsland,
        description: 'This property is on an island!',
        descriptionUk: 'Це помешкання знаходиться на острові!'
    },
    {
        label: 'Lake',
        labelUk: 'Біля озера',
        icon: GiBoatFishing,
        description: 'This property is close to a lake!',
        descriptionUk: 'Цей помешкання знаходиться поруч з озером!'
    },
    {
        label: 'Skiing',
        labelUk: 'Катання на лижах',
        icon: FaSkiing,
        description: 'This property has skiing activities!',
        descriptionUk: 'Біля цього помешкання є можливість зайнятися лижним спортом!'
    },
    {
        label: 'Castles',
        labelUk: 'Замки',
        icon: GiCastle,
        description: 'This property is in a castle!',
        descriptionUk: 'Це помешкання знаходиться в замку!'
    },
    {
        label: 'Camping',
        labelUk: 'Кемпінги',
        icon: GiForestCamp,
        description: 'This property camping activities!',
        descriptionUk: 'Це помешкання для кемпінгу!'
    },
    {
        label: 'Arctic',
        labelUk: 'Арктика',
        icon: BsSnow,
        description: 'This property is in the Arctic!',
        descriptionUk: 'Це помешкання знаходиться в Арктиці!'
    },
    {
        label: 'Cave',
        labelUk: 'Печери',
        icon: GiCaveEntrance,
        description: 'This property is in a cave!',
        descriptionUk: 'Це помешкання знаходиться в печері!'
    },
    {
        label: 'Desert',
        labelUk: 'Пустеля',
        icon: GiCactus,
        description: 'This property is in a desert!',
        descriptionUk: 'Це помешкання знаходиться в пустелі!'
    },
    {
        label: 'Barns',
        labelUk: 'Стодоли',
        icon: GiBarn,
        description: 'This property is in the barn!',
        descriptionUk: 'Це помешкання знаходиться в сараї!'
    },
    {
        label: 'Lux',
        labelUk: 'Люкс',
        icon: IoDiamond,
        description: 'This property is luxurious!',
        descriptionUk: 'Це розкішне помешкання!'
    },
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div
                className="
                    pt-4
                    flex
                    flex-row
                    items-center
                    justify-between
                    overflow-x-auto
                "
            >
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        labelUk={item.labelUk}
                        selected={category === item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
}

export default Categories;