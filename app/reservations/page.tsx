import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import ReservationsClient from "@/app/reservations/ReservationsClient";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

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

    const reservations = await getReservations({
        authorId: currentUser.id
    });

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Бронювання не знайдено"
                    subtitle="Схоже, у вас немає бронювань на ваші об'єкти нерухомості"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ReservationsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}

export default ReservationsPage;