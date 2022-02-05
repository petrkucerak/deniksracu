
export async function toilet2github() {
    console.log("Try to create request!");

    const user = {
        name: "Pedro",
        surname: "Kuceroo"
    };

    const url = "https://deniksracu-form-api.petr7111.workers.dev/";

    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "appliaction/json"
        },
        body: JSON.stringify(user)

    });

    let result = await response.json();
    console.log(result);

    return null;
}