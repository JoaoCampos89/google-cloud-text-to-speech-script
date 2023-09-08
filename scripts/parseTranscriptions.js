// Import other required libraries
const fs = require("fs");
const util = require("util");

async function quickStart() {
  // The text to synthesize
  fs.readdir("./transcriptionsJSON", (err, files) => {
    files.forEach(async (file) => {
      const text = fs.readFileSync(`./transcriptionsJSON/${file}`);
      const transcription = JSON.parse(text);
      const results = transcription.results;
      const speechText = [];
      if (results && results.length) {
        for (const section of results) {
          const alt = section.alternatives;
          if (
            section.alternatives.length &&
            alt[0].confidence > 0 &&
            alt[0]?.words &&
            alt[0].transcript
          ) {
            speechText.push({
              transcript: alt[0].transcript,
              confidence: alt[0].confidence,
              startTime: alt[0]?.words[0].startTime,
              endTime: alt[0]?.words[alt[0]?.words.length - 1].endTime,
            });
          }
        }
      }

      const writeFile = util.promisify(fs.writeFile);
      await writeFile(
        `./transcriptionsJSONParsed/${file}`,
        JSON.stringify(speechText)
      );
    });
  });
}
quickStart();
