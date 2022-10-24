import React from 'react';
import { useSession } from 'next-auth/react';

const MyReservation = () => {
    const { data: session, status } = useSession();
    console.log(session)

    return (
        <div>MyReservation</div>
    )
}

export default MyReservation