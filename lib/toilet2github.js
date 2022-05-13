export async function toilet2github(data) {

    // 1. sent data to proxy server
    // 2. wait for ACK
    // 3. return succes message
    // console.log(data);

    const url = "http://localhost:8787/"

    // fetch(url, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     }
    // })
    //     .then((response) => {
    //         if (!response.ok) {
    //             console.log("Nejakej error");
    //             throw new Error(response.error);
    //         }
    //         if(response.ok){
    //             console.log("Oukeeej");
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log("Success:", data);
    //     })
    //     .catch((error) => {
    //         console.error("Error:", error);
    //     });

    const XMLHttpRequest = require('xhr2');
    const xhr = new XMLHttpRequest();
    // const url = "https://solitary-sea-3ef5.petr7111.workers.dev";

    // ToDo: implement POST verification

    // open the connection
    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200)
            console.log(this.responseText);
    };

    // const data = JSON.stringify({
    //     "name": "kamaradee",
    //     "email": "mujmail@czko.fus"
    // });
    console.log(data);

    xhr.send(data);
}
