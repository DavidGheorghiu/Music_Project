playSound = () => {
  var cMajor = {
    c: 261.6, // C
    d: 293.7, // D
    e: 329.7, // E
    f: 349.2, // F
    g: 392.0, // G
    a: 440.0, // A
    b: 493.0, // B
    csharp: 523.3 // C'
  };

  for (i in cMajor) {
    console.log(cMajor[i]);
  }
  document.getElementById("demo").innerHTML;
};

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
var osc = audioContext.createOscillator();
osc.type = "triangle";
osc.connect(audioContext.destination);

function playSound(freq) {
  osc.frequency.value = freq;
  osc.start(0);
}
