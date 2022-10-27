import fs from "fs";

export function getData2HallOfShits() {
  // load JSON
  const data = JSON.parse(
    fs.readFileSync("./public/toilets/toilets-unsorted.json", "utf-8")
  );
  // create a array for output
  let out = new Array();
  data.map((el) => {
    // try to find index of a nickname
    const index = out.findIndex((element) => element.nickName == el.nickName);
    if (index === -1) {
      // if doens't exist, create a new
      out.push({ nickName: el.nickName, score: 1 });
    } else {
      // if exists, increase a score
      out[index].score += 1;
    }
  });
  return out;
}
