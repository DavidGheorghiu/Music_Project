playSound1 = () => {
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

/*
function playSound(freq) {
  osc.frequency.value = freq;
  osc.start(0);
}
*/

var bufferSize = 4096;
var effect = (function() {
  var lastOut = 0.0;
  var node = audioContext.createScriptProcessor(bufferSize, 1, 1);
  node.onaudioprocess = function(e) {
    var input = e.inputBuffer.getChannelData(0);
    var output = e.outputBuffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
      output[i] = (input[i] + lastOut) / 2.0;
      lastOut = output[i];
    }
  };
  return node;
})();
// osc.start(0);

///need to make filters to manipulate sound frequencies
