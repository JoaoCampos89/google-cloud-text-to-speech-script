// Imports the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");

// Import other required libraries
const fs = require("fs");
const util = require("util");
// Creates a client
const client = new textToSpeech.TextToSpeechClient();
async function quickStart() {
  // The text to synthesize
  fs.readdir("./texts/DexKitExplainer2", (err, files) => {
    files.forEach(async (file) => {
      const text = fs.readFileSync(`./texts/DexKitExplainer2/${file}`);
      const request = {
        input: {
          text: text,
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
        `./audios/DexKitExplainer2/${file.split(".")[0]}.mp3`,
        response.audioContent,
        "binary"
      );
      console.log("Audio content written to file: output.mp3");
    });
  });

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
