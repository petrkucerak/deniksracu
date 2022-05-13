const fs = require("fs");
const path = require("path");

/**
 * Function to read and join all JSON data
 * @returns JSON object with all toilets
 */
function getDataFromJSONs() {
  const jsonsInDir = fs
    .readdirSync("./_toilets/")
    .filter((file) => path.extname(file) === ".json");

  let data = new Array();
  for (let i = 0; i < jsonsInDir.length; i++) {
    const fileData = fs.readFileSync(path.join("./_toilets", jsonsInDir[i]));
    data.push(JSON.parse(fileData.toString()));
  }
  return data;
}

/**
 * Function to create dir and generate JSON file
 * @param {*} data JSON data to serialize
 */
function createJSONFile(data) {
  // create folder if doesn't exits
  const dir = "./toilets";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  // create a file
  const string = JSON.stringify(data);
  fs.writeFile("./toilets/toilets.json", string, (err) => {
    if (err) console.log("error", err);
  });
}

/**
 * The main function
 */
module.exports.jsons2json = () => {
  const data = getDataFromJSONs();
  createJSONFile(data);
};
