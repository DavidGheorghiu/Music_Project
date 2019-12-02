function play() {
  var value = this.value;
  var waveType = selectedWave();
  var freq = selectedFreq();
  var Volume = volumeGain(value);

  console.log(waveType);
  console.log(freq);
  console.log(Volume);
  var synth = new Tone.Synth({
    frequency: freq,
    detune: 0,
    //  decay: 0,
    // preDelay: 0.01,
    oscillator: {
      type: waveType
    }
  }).toMaster();

  synth.triggerAttackRelease(freq, "8n");
  var synth = new Tone.Reverb({
    decay: 9.5,
    preDelay: 0.1
  }).toMaster();
  // volume: Volume,
  //mute: false
  //}).toMaster();
  //synth.triggerAttackRelease(freq, "8n");
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
/*
var slider = document.getElementById("intialValue");
var output = document.getElementById("volume");
output.innerHTML = slider.value;
slider.onInput = function() {
  output.innerHTML = this.value;
};
*/
function volumeGain(value) {
  var vol = (document.getElementById("volume").innerHTML = value);
  // console.log(vol);
  return vol;
}

function Reverb(value) {
  document.getElementById("reverb").innerHTML = value;
}