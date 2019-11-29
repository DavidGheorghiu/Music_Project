function play() {
  var waveType = selectedWave();
  var freq = selectedFreq();
  console.log(waveType);
  console.log(freq);
  var synth = new Tone.Synth({
    frequency: freq,
    detune: 0,
    oscillator: {
      type: waveType
    }
  }).toMaster();
  synth.triggerAttackRelease(freq, "8n");
}

function loop() {
  var waveType = selectedWave();
  var freq = selectedFreq();
  var synth = new Tone.Synth({
    oscillator: {
      type: waveType
    }
  }).toMaster();
  var loop = new Tone.Loop(function(time) {
    synth.triggerAttackRelease(freq, "8n", time);
  }, "1n");

  loop.start("1m").stop("4m");
  Tone.Transport.start();
}

function stop() {
  Tone.Transport.stop();
}

function selectedWave() {
  var val = document.getElementById("selectedVal").value; //selected value of wave type
  console.log(val);
  return val;
}
function selectedFreq() {
  var frequency = document.getElementById("freq").value; //selected value of frequency
  console.log(frequency);
  return frequency;
}

var slider = document.getElementById("intialValue");
var output = document.getElementById("volume");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
};
