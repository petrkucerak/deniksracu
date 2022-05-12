export async function toilet2github(data) {

    // 1. sent data to proxy server
    // 2. wait for ACK
    // 3. return succes message
    console.log(data);

    const url = "http://localhost:8787/"

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => {
            if (!response.ok) {
                console.log("Nejakej error");
                throw new Error(response.error);
            }
            if(response.ok){
                console.log("Oukeeej");
            }
            return response.json();
        })
        .then(data => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}