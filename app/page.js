
import React from "react";
import Search from "@/components/searchBar";
import Map from "@/components/map"

const getFlightInfo = async (search) => {
        if (!search) {
            return ''
        }
        const flightInfoResponse = await fetch(`http://localhost:3000/api/flightaware/flightInfo/${search}`,{
            cache:"no-store"
        })
        const flightInfo = await flightInfoResponse.json()
        return flightInfo
}


export default async function Home({searchParams}) {

    const flightInfo = await getFlightInfo(searchParams.search);

    return (
        <div className="mt-8">
            <div className="flex justify-center mb-4">
                <Search />
            </div>

            <div className="flex justify-center mt-4">
                <Map flightId={flightInfo.fa_flight_id}/>
                {/*<img src={`data:image/png;base64,${mapString.map}`} alt="mapa"/>*/}
            </div>
        </div>
    );
};
