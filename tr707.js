// Author: Devin Lo
// Uses the Web Audio API
// Follows the tutorial shown here: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques

// Web Audio API apps should start by declaring the AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// filepaths of the samples
// may need to put in another js file
const filepaths = [
    './simple707/samples/Kick 1 R1.wav',
    './simple707/samples/Kick 2 R1.wav',
    './simple707/samples/Snare 1 R1.wav',
    './simple707/samples/Snare 2 R1.wav',
    './simple707/samples/Tom 1 R1.wav',
    './simple707/samples/Tom 2 R1.wav',
    './simple707/samples/Tom 3 R1.wav',
    './simple707/samples/Rim R1.wav',
    './simple707/samples/Cowbell R1.wav',
    './simple707/samples/Clap R1.wav',
    './simple707/samples/Tambourine R1.wav',
    './simple707/samples/Hat Closed R1.wav',
    './simple707/samples/Hat Closed R1.wav',
    './simple707/samples/Hat Open R1.wav',
    './simple707/samples/Crash R1.wav',
    './simple707/samples/Ride R1.wav'
];

// this code snippet is taken directly from the tutorial
// the purpose of this is to load the external audio file, and turn it into a buffer
async function getFile(audioContext, filepath) {
    const response = await fetch(filepath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
}

// modified from the original by using a for loop to grab buffers of all the 707 sample sounds
async function setupSample() {
    const samples = []; // const array can be pushed to - https://www.w3schools.com/js/js_const.asp

    for (let i = 0; i < filepaths.length; i++) {
        samples.push(await getFile(audioCtx, filepaths[i]));
    }

    return samples;
}

// this code snippet is taken directly from the tutorial
// the purpose of this is to direct the buffer to the sound output of the computer, and play at the given time
function playSample(audioContext, audioBuffer, time) {
    const sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(audioContext.destination)
    sampleSource.start(time);
    return sampleSource;
}

// also adapted from the tutorial
// when the sample has loaded allow play
let loadingEl = document.querySelector('.loading');
// const playButton = document.querySelector('[data-playing]'); // not needed yet in my current manual play implementation
// let isPlaying = false;
setupSample()
    .then((samples) => {
        // loadingEl.style.display = 'none'; // remove loading screen

        // https://developer.chrome.com/blog/autoplay/
        window.addEventListener('click', function () {
            context.resume().then(() => {
                console.log('Playback resumed successfully');
            });

            // manual play
            // adapted from here: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key#example
            window.addEventListener('keydown', function (event) {
                if (event.defaultPrevented) {
                    return; // Do nothing if the event was already processed
                }

                switch (event.key) {
                    case "q":
                        playSample(audioCtx, samples[0], audioCtx.currentTime);
                        break;
                    case "w":
                        playSample(audioCtx, samples[1], audioCtx.currentTime);
                        break;
                    case "e":
                        playSample(audioCtx, samples[2], audioCtx.currentTime);
                        break;
                    case "r":
                        playSample(audioCtx, samples[3], audioCtx.currentTime);
                        break;
                    case "s":
                        playSample(audioCtx, samples[4], audioCtx.currentTime);
                        break;
                    case "d":
                        playSample(audioCtx, samples[5], audioCtx.currentTime);
                        break;
                    case "f":
                        playSample(audioCtx, samples[6], audioCtx.currentTime);
                        break;
                    case "u":
                        playSample(audioCtx, samples[7], audioCtx.currentTime);
                        break;
                    case "i":
                        playSample(audioCtx, samples[8], audioCtx.currentTime);
                        break;
                    case "o":
                        playSample(audioCtx, samples[9], audioCtx.currentTime);
                        break;
                    case "p":
                        playSample(audioCtx, samples[10], audioCtx.currentTime);
                        break;
                    case "h":
                        playSample(audioCtx, samples[11], audioCtx.currentTime);
                        break;
                    case "j":
                        playSample(audioCtx, samples[12], audioCtx.currentTime);
                        break;
                    case "k":
                        playSample(audioCtx, samples[13], audioCtx.currentTime);
                        break;
                    case "l":
                        playSample(audioCtx, samples[14], audioCtx.currentTime);
                        break;
                    case ";":
                        playSample(audioCtx, samples[15], audioCtx.currentTime);
                        break;
                    default:
                        return;
                }

                // Cancel the default action to avoid it being handled twice
                event.preventDefault();
            }, true);
        });

    });