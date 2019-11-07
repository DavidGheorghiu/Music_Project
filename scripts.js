var cMajor = [
    261.6, 293.7, 329.7, 349.2,
    392.0, 440.0, 493.0, 523.3
];

//var oscillator = audioContext.createOscillator();
//oscillator.type = 'sine';
//oscillator.frequency.value = 261.63;

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
var oscillators = {
    oscOne: audioContext.createOscillator(),
    oscTwo: audioContext.createOscillator(),
    oscThree: audioContext.createOscillator(),
    oscFour: audioContext.createOscillator(),
    oscFive: audioContext.createOscillator(),
    oscSix: audioContext.createOscillator(),
    oscSeven: audioContext.createOscillator(),
    oscEight: audioContext.createOscillator()
};

function playSound() {
}

function stopSound() {
    oscillator.disconnect(audioContext.destination);
}
