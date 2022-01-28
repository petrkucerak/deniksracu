export function setJSON() {
    const XMLHttpRequest = require('xhr2');
    const xhr = new XMLHttpRequest();
    const url = "https://solitary-sea-3ef5.petr7111.workers.dev";

    // ToDo: implement POST verification

    // open the connection
    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200)
            console.log(this.responseText);
    };

    const data = JSON.stringify({
        "name": "kamaradee",
        "email": "mujmail@czko.fus"
    });
    console.log(data);

    xhr.send(data);
}