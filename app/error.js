'use client'; // Error components must be Client Components

import {useEffect, useTransition} from 'react';
import {useRouter} from "next/navigation";

export default function Error({ error, reset }) {
    const router = useRouter();
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div>
            <h2>Something went wrong! Check if the flightId you provided is correct</h2>
            <button
                onClick={
                    () => reset()
                }
            >
                Try again
            </button>
            <button
                onClick={
                    () => window.location.href = '/'
                }
            >
                Go back home
            </button>
        </div>
    );
}