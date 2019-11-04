var cMajor = [
    261.6,  // C
    293.7,  // D
    329.7,  // E
    349.2,  // F
    392.0,  // G
    440.0,  // A
    493.0,  // B
    523.3   // C'
];

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
var osc = audioContext.createOscillator();
osc.type = 'sine';
osc.connect(audioContext.destination);

function playSound(freq) {
    osc.frequency.value = freq;
    osc.start(0);
}
