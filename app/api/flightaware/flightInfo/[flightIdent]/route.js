
export const GET = async (req, { params }) => {
    try {
        const flightsInfoResponse = await fetch(`https://aeroapi.flightaware.com/aeroapi/flights/${params.flightIdent}`,
            {
                headers: {
                    "x-apikey": process.env.AEROAPI_KEY
                },
            }
        );
        const flightsInfo = await flightsInfoResponse.json();

        const activeFlight = flightsInfo.flights.find((flight) =>
            flight.status.startsWith("En Vuelo"));

        if(activeFlight){
            return new Response(JSON.stringify(activeFlight), {status: 200});
        }
        else{
            return new Response("No flight found", { status: 404 });
        }
    } catch (error) {
        return new Response("Failed to fetch flights", { status: 500 });
    }
};

