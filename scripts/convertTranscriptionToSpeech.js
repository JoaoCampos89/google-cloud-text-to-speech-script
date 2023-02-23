// Imports the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");

// Import other required libraries
const fs = require("fs");
const util = require("util");
// Creates a client
const client = new textToSpeech.TextToSpeechClient();
async function quickStart() {
  const text = fs.readFileSync(
    `./transcriptionsSSML/creating-nft-collection-edited-2.txt`
  );

  const request = {
    input: {
      ssml: text,
    },
    // Select the language and SSML voice gender (optional)
    voice: {
      languageCode: "en-US",
      ssmlGender: "NEUTRAL",
      voiceName: "en-US-Wavenet-J",
    },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(
    `./audios/creating-nft-collection-2.mp3`,
    response.audioContent,
    "binary"
  );
  //console.log(`Audio content written to file: ${file.split(".")[0]}.mp3}`);

  /*
    // Construct the request
  const request = {
    input: {
      ssml: text,
    },
    // Select the language and SSML voice gender (optional)
    voice: {
      languageCode: "en-US",
      ssmlGender: "NEUTRAL",
      voiceName: "en-US-Wavenet-J",
    },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile("output.mp3", response.audioContent, "binary");
  console.log("Audio content written to file: output.mp3");*/
}
quickStart();
