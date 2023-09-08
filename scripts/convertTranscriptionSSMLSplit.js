// Import other required libraries
const fs = require("fs");
const util = require("util");

const numberOfParts = 2;

const fileName = "gated_content_mod";

async function quickStart() {
  // The text to synthesize

  const text = fs.readFileSync(`./transcriptionsJSONParsed/${fileName}.json`);
  const transcriptions = JSON.parse(text);

  let totalTranscriptions = transcriptions.length;
  let totalTranscriptionsPerPart = Math.round(
    totalTranscriptions / numberOfParts
  );

  for (let i = 0; i < numberOfParts; i++) {
    let ssml = "<speak>\n\t<par>";
    let startTranscription = transcriptions[i * totalTranscriptionsPerPart];

    for (const section of transcriptions.slice(
      i * totalTranscriptionsPerPart,
      (i + 1) * totalTranscriptionsPerPart
    )) {
      ssml = `${ssml}\n\t\t<media begin="${
        i > 0
          ? `${(
              Number(section.startTime.split("s")[0]) -
              Number(startTranscription.startTime.split("s")[0])
            ).toFixed(3)}s`
          : section.startTime
      }">\n\t\t\t<speak>${section.transcript}</speak>\n\t\t</media>`;
    }

    ssml = `${ssml}\n\t</par>\n</speak>`;

    const writeFile = util.promisify(fs.writeFile);

    await writeFile(`./transcriptionsSSML/${fileName}-${i}.txt`, ssml);
  }
}
quickStart();
