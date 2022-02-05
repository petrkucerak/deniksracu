
export async function toilet2github(data) {

    const url = "https://deniksracu-form-api.petr7111.workers.dev/";

    // console.log(data);

    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "appliaction/json"
        },
        body: JSON.stringify(data)

    });

    console.log(await response.json());

    return null;
}