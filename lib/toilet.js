/**
 * Define own data strucutre. Data description in deniksracu.cz/form
 */
export class Toilet {
    constructor(latitude, longtitude, placeName, isClean, hasPaper, canLock, hasWater, isFree, bonusCategory, comment, nicName) {

        this.location.coord.latitude = latitude;
        this.location.coord.longtitude = longtitude;
        this.location.placeName = placeName;

        this.category.isClean = isClean;
        this.category.hasPaper = hasPaper;
        this.category.canLock = canLock;
        this.category.hasWater = hasWater;
        this.category.isFree = isFree;
        this.category.bonusCategory = bonusCategory;
        this.category.comment = comment;

        this.srac.nicName = nicName;

        this.meta.timeStamp = new Date();
    }
}

export function Form2JSONToilet() {
    const latitude = document.getElementById("latitude").value;
    const longtitude = document.getElementById("longtitude").value;
    const placeName = document.getElementById("placeName").value;

    const isClean = document.getElementById("isClean").value;
    const hasPaper = document.getElementById("hasPaper").value;
    const canLock = document.getElementById("canLock").value;
    const hasWater = document.getElementById("hasWater").value;
    const isFree = document.getElementById("isFree").value;
    const bonusCategory = document.getElementById("bonusCategory").value;

    const comment = document.getElementById("comment").value;

    const nicName = document.getElementById("nicName").value;

    if (latitude !== "" && longtitude !== "" && placeName !== "") {
        const toilet = new Toilet(latitude, longtitude, placeName, isClean, hasPaper, canLock, hasWater, isFree, bonusCategory, comment, nicName);
        console.log(date);
        downloadObjectAsJson(toilet, date);
    } else {
        console.error("Nevyplneny vsechny pozadovane hodnoty");
    }
}