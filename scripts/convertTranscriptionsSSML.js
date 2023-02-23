// Import other required libraries
const fs = require("fs");
const util = require("util");

async function quickStart() {
  // The text to synthesize
  fs.readdir("./transcriptionsJSONParsed", (err, files) => {
    files.forEach(async (file) => {
      if (!file.endsWith(".json")) {
        console.log(file);
        return;
      }

      const text = fs.readFileSync(`./transcriptionsJSONParsed/${file}`);
      const transcriptions = JSON.parse(text);
      let ssml = "<speak>\n\t<par>";

      for (const section of transcriptions) {
        ssml = `${ssml}\n\t\t<media begin="${section.startTime}">\n\t\t\t<speak>${section.transcript}</speak>\n\t\t</media>`;
      }

      ssml = `${ssml}\n\t</par>\n</speak>`;

      const writeFile = util.promisify(fs.writeFile);

      await writeFile(
        `./transcriptionsSSML/${file.split(".json")[0]}.txt`,
        ssml
      );
    });
  });
}
quickStart();
