export async function toilet2github(data) {

    // 1. sent data to proxy server
    // 2. wait for ACK
    // 3. return succes message
    console.log(data);

    const url = "http://localhost:8787/"

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}