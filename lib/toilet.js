import Swal from "sweetalert2";
/**
 * Define own data strucutre. Data description in deniksracu.cz/form
 */
export class Toilet {
  constructor(
    latitude,
    longtitude,
    toiletType,
    placeName,
    wayDescription,
    isClean,
    hasPaper,
    canLock,
    hasWater,
    isFree,
    bonusCategory,
    comment,
    nickName
  ) {
    this.latitude = latitude;
    this.longtitude = longtitude;
    this.placeName = placeName;

    this.wayDescription = wayDescription;
    this.toiletType = toiletType;

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

export function Form2JSONToilet(bonusTags, method) {
  let latitude = document.getElementById("latitude").value;
  let longtitude = document.getElementById("longtitude").value;
  let placeName = document.getElementById("placeName").value;

  let wayDescription = document.getElementById("wayDescription").value;
  let toiletType = document.getElementById("toiletType").value;

  let isClean = document.getElementById("isClean").checked;
  let hasPaper = document.getElementById("hasPaper").checked;
  let canLock = document.getElementById("canLock").checked;
  let hasWater = document.getElementById("hasWater").checked;
  let isFree = document.getElementById("isFree").checked;
  let bonusCategory = bonusTags;

  let comment = document.getElementById("comment").value;

  let nickName = document.getElementById("nickName").value;

  if (latitude !== "" && longtitude !== "" && placeName !== "") {
    const toilet = new Toilet(
      latitude,
      longtitude,
      placeName,
      wayDescription,
      toiletType,
      isClean,
      hasPaper,
      canLock,
      hasWater,
      isFree,
      bonusCategory,
      comment,
      nickName
    );
    let date = toilet.timeStamp.getTime();
    if (method === `download`) {
      downloadObjectAsJson(toilet, date);
    } else if (method === `request`) {
      createRequest(toilet, date);
    }
  } else {
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

async function createRequest(exportObj, fileName) {
  const body = `
  {
    "filename": "${fileName}",
    "content": ${JSON.stringify(exportObj)},
    "title": "${exportObj.placeName}"
}
  `;

  const response = await fetch("https://api.deniksracu.cz/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body,
  });

  response.json().then((data) => {
    if (data.status === "OK") {
      Swal.fire({
        title: "Rulička!",
        text: "BOT Rulička úspěšně vytvořil žádost o přidání nového trůnu. Díky",
        icon: "success",
        confirmButtonColor: "#0078D4",
      });
    } else {
      Swal.fire({
        title: "Rulička!",
        text: "V procesu přidání nového trůnu zaznamenal BOT Rulička problém.",
        icon: "error",
        confirmButtonColor: "#0078D4",
      });
    }
  });
}
