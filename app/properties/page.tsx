import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";
import PropertiesClient from "@/app/properties/PropertiesClient";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Ви не авторизовані"
                    subtitle="Будь ласка, увійдіть або зареєструйтеся."
                />
            </ClientOnly>
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    })

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Не знайдено жодного об'єкта нерухомості"
                    subtitle="Схоже, ви не додали жодного об'єкту нерухомості"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
};

export default PropertiesPage;