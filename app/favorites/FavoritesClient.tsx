'use client'

import {SafeListing, SafeUser} from "@/app/types";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";

type Props = {
    listings: SafeListing[]
    currentUser?: SafeUser | null
};

const FavoritesClient = ({listings, currentUser}: Props) => {

    return (
        <Container>
            <Heading
                title="Вибране"
                subtitle="Список місць, які ви додали до вибраного"
            />
            <div className="
                mt-10
                grid grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            ">
                {listings.map(listing => (
                    <ListingCard
                        key={listing.id}
                        currentUser={currentUser}
                        data={listing}
                    />
                ))}
            </div>
        </Container>
    );
};

export default FavoritesClient;