import fs from "fs";

const titles = ["Sráč zelenáč", "Sráč", "Sráč mazák", "Velesráč"];
const classes = ["srac-zelenac", "srac", "srac-mazak", "velesrac"];
const extension = ["trůn", "trůny", "trůny", "trůny", "trůnů"];

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
      out.push({
        extension: extension[0],
        title: titles[0],
        class: classes[0],
        nickName: el.nickName,
        score: 1,
      });
    } else {
      // if exists, increase a score
      out[index].score += 1;
      if (out[index].score >= 5) {
        out[index].title = titles[1];
        out[index].class = classes[1];
      }
      if (out[index].score == 2) out[index].extension = extension[1];
      if (out[index].score == 3) out[index].extension = extension[2];
      if (out[index].score == 4) out[index].extension = extension[3];
      if (out[index].score == 5) out[index].extension = extension[4];
      if (out[index].score > 20) {
        out[index].title = titles[2];
        out[index].class = classes[2];
      }
      if (out[index].score > 50) {
        out[index].title = titles[3];
        out[index].class = classes[3];
      }
    }
  });
  console.log(out);
  return out;
}
