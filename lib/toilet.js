import Swal from "sweetalert2";
/**
 * Define own data strucutre. Data description in deniksracu.cz/form
 */
export class Toilet {
    constructor(latitude, longtitude, placeName, isClean, hasPaper, canLock, hasWater, isFree, bonusCategory, comment, nickName) {

        this.latitude = latitude;
        this.longtitude = longtitude;
        this.placeName = placeName;

        this.isClean = isClean;
        this.hasPaper = hasPaper;
        this.canLock = canLock;
        this.hasWater = hasWater;
        this.isFree = isFree;
        this.bonusCategory = bonusCategory;
        this.comment = comment;

        this.nickName = nickName;

        this.timeStamp = new Date();
    }
}

export function Form2JSONToilet(bonusTags) {
    let latitude = document.getElementById("latitude").value;
    let longtitude = document.getElementById("longtitude").value;
    let placeName = document.getElementById("placeName").value;

    let isClean = document.getElementById("isClean").checked;
    let hasPaper = document.getElementById("hasPaper").checked;
    let canLock = document.getElementById("canLock").checked;
    let hasWater = document.getElementById("hasWater").checked;
    let isFree = document.getElementById("isFree").checked;
    let bonusCategory = bonusTags;

    let comment = document.getElementById("comment").value;

    let nickName = document.getElementById("nickName").value;

    if (placeName === "např. Hospůdka Pod Zelenou lípou") placeName = "";
    if (comment === "Tvůj komentář ...") comment = "";
    if (nickName === "Tvoje přezdívka ....") nickName = "";

    if (latitude !== "" && longtitude !== "" && placeName !== "") {
        const toilet = new Toilet(latitude, longtitude, placeName, isClean, hasPaper, canLock, hasWater, isFree, bonusCategory, comment, nickName);
        let date = toilet.timeStamp.getTime();
        // console.log(date);
        // console.log(toilet);
        downloadObjectAsJson(toilet, date);
    } else {
        // console.error("Nevyplneny vsechny pozadovane hodnoty");
        Swal.fire({
            title: "Chyba!",
            text: "Nevyplnil jsi všechny požadované položky!",
            icon: "error",
            confirmButtonColor: "#0078D4",
        });
    }
}

function downloadObjectAsJson(exportObj, exportName) {
    const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(exportObj));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for Firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}