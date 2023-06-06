export const GET = async (req, {params}) => {
    try{
        const positionPromise = await fetch(`https://aeroapi.flightaware.com/aeroapi/flights/${params.flightId}/position`, {
            cache: 'no-store',
            headers: {
                "x-apikey": process.env.AEROAPI_KEY,
            }
        });
        const position = await positionPromise.json();
        if(position){
            return new Response(JSON.stringify(position.last_position),{status:200})
        }else{
            return new Response("No flight position found", {status:404})
        }
    }catch (e) {
        return new Response("Failed to fetch flight position",{status:500})
    }
}