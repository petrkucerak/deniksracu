addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
})

// ToDo need to be specified
const corsHeaders = {
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Origin": "*"
}
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
    if (request.method === "OPTIONS") {
        return new Response("OK", { headers: corsHeaders });
    }
    if (request.method === "POST") {
        return new Response(JSON.stringify(request.body), {
            headers: {
                "Content-type": "appliaction/json",
                ...corsHeaders
            }
        });
    }

}
