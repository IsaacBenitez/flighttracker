'use client'
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import {useEffect, useState} from "react";

export default function Map({flightId}) {

    const [position, setPosition] = useState({lat:0,lng:0})
    const [heading,setHeading] = useState(0)
    const [zoom, setZoom] = useState(3)

    const getMap = async () => {
            const response = await fetch(`/api/flightaware/flightPosition/${flightId}`, {
                cache: "no-store"
            })
            if(!response.ok){throw new Error("Failed to fetch flight position")}
            const lastPosition = await response.json();
            const {heading, latitude, longitude} = lastPosition;
            setPosition({lat: latitude, lng: longitude});
            setHeading(heading);
            setZoom(6)
    }

    useEffect(() => {
        if(flightId){
            getMap();
            const interval = setInterval(getMap,15000);
            return () => clearInterval(interval);
        }
    }, [flightId]);

    const icon = `images/aircraft_${heading}.png`;

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <GoogleMap zoom={zoom} center={position}
                   mapContainerClassName="map_container">
            {flightId && <Marker position={position} icon={icon}></Marker>}
        </GoogleMap>
    )
}