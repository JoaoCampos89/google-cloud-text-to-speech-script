# Set of scripts to help speech-to-text-to-speech

We at DexKit decided to use these synthetic voices to improve our documentation and be fast to deliver proofreaded voices.

## Before Begin

You need to setup your environment: https://cloud.google.com/text-to-speech/docs/before-you-begin

## What was our strategy

Record screen video with what we want to say on the video. This way we get matched voice with text more easily.

We pick up the audio file and use the [Google UI tool](https://console.cloud.google.com/speech/overview) to generate transcripted text using almost all default parameters, identified by Google. We only needed to put voice as english and option to enhanced Video

Then we downloaded all json transcripts on TranscriptionsJSON directory and run script

```
yarn parse-transcripted-files
```

this command will parse all transcriptions as an array of transcripts with follow structure for each transcript:

```
{
    "transcript": "here in the general section you can change all the basic options for your Marketplace",
    "confidence": 0.89731306,
    "startTime": "4.400s",
    "endTime": "9.900s"
}

```

Then we need to convert the generated array to SSML in order to send it to Google text-to-speech. Now is a good
place to proofread all the audio transcriptions.

We run the script

```
yarn convert-transcripted-files-to-ssml
```

You can add additional ssml tags if you want to change default behavior. A list of them can be found here: [SSML tags](https://cloud.google.com/text-to-speech/docs/ssml)

Finally, run script to convert ssml to audios:

```
yarn convert-transcriptions-to-audio
```
