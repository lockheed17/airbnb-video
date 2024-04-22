import React from 'react';
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getFavoriteListings from "@/app/actions/getFavoriteListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import FavoritesClient from "@/app/favorites/FavoritesClient";

const FavoritesPage = async () => {
    const listings = await getFavoriteListings()
    const currentUser = await getCurrentUser()

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Вибране не знайдено"
                    subtitle="Схоже, у вас немає вибраних оголошень."
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <FavoritesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
};

export default FavoritesPage;