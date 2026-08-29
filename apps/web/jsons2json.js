const fs = require("fs");

const jsonRegex = new RegExp("^.*.(json)$");

module.exports.jsons2json = () => {
  console.log("The jsons2json function has been started!");

  // read and collect data
  const filenames = fs.readdirSync("_toilets");
  let content = new Array();
  for (let id = 0; id < filenames.length; id += 1) {
    if (jsonRegex.test(filenames[id])) {
      const data = fs.readFileSync(`_toilets/${filenames[id]}`, "utf-8");
      const dataFormated = JSON.parse(data);

      // if the nickname is an empty set the Ghost name
      if (dataFormated.nickName == "") dataFormated.nickName = "Ghost";

      content.push(dataFormated);
    }
  }

  // create output file
  fs.writeFileSync(
    "public/toilets/toilets-unsorted.json",
    JSON.stringify(content)
  );

  console.log(
    "The unsorted file with JSON toilets data has been created successfully"
  );
};
