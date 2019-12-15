function play() {
  oscillatorSequence.start();
  sampleSequence.start();
  Tone.Transport.start();
}

function stop() {
  Tone.Transport.stop();
}

function updateBpm(bpmSlider) {
  Tone.Transport.bpm.value = bpmSlider.value;
}
///filter for oscillator
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

function volumeGain(value) {
  var vol = (document.getElementById("volume").innerHTML = value);
  // Tone.Transport.volume.value = vol.value;
  return vol;
}

function Reverb(value) {
  document.getElementById("reverb").innerHTML = value;
}

//filters for Sampler
function selectedWaveSampler() {
  var val = document.getElementById("selectedValSampler").value; //selected value of wave type
  console.log(val);
  return val;
}
/*
function selectedFreqSampler() {
  var frequency = document.getElementById("freqSampler").value; //selected value of frequency
  console.log(frequency);
  return frequency;
}
*/
function volumeGainSampler(value) {
  var vol = (document.getElementById("volumeSampler").innerHTML = value);
  // Tone.Transport.volume.value = vol.value;
  return vol;
}

function ReverbSampler(value) {
  document.getElementById("reverbSampler").innerHTML = value;
}

var sequencers = document.querySelectorAll(".sequencer");
for (sequencer of sequencers) {
  sequencer.addEventListener("click", function(event) {
    eventTarget = event.target;
    if (eventTarget.className.includes("cell")) {
      classlist = eventTarget.classList;
      if (!classlist.contains("selected")) {
        classlist.add("selected");
      } else {
        classlist.remove("selected");
      }
    }
  });
}

// Oscillator Sequencer
{
  var cMajor = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
  // Loop through the sequencer and play any sounds that were selected to play
  let columns = document.getElementById("oscillator-sequencer").children;
  var oscillatorSequence = new Tone.Sequence(
    function(time, columnIndex) {
      // Get the current column
      var column = columns[columnIndex];
      // Get cells from the currently looped column and convert the htmlcollection to an array so we have access to the index values
      var cells = Array.from(column.children);

      var volumeSlider = document.getElementById("volumeValue").value;
      var reverbSlider = document.getElementById("reverbValue").value;

      var waveType = selectedWave();
      var freq = selectedFreq();
      console.log(volumeSlider);
      console.log(reverbSlider);
      var synth = new Tone.Synth({
        frequency: freq,

        detune: 0,
        oscillator: {
          type: waveType
        }
      }).toMaster();

      var synth2 = new Tone.Reverb({
        decay: reverbSlider,
        preDelay: 0.01
      }).toMaster();
      synth.connect(synth2).toMaster();

      var synth3 = new Tone.Volume({ volume: volumeSlider }).toMaster();
      synth.connect(synth3).toMaster();

      var synth4 = new Tone.Frequency(freq);
      synth.connect(synth4).toMaster();

      for (let cell of cells) {
        if (cell.classList.contains("selected")) {
          // Use the cell index to get the correct sound for that cell
          sampleSound = players._players[cells.indexOf(cell)];
          sampleSound.start(time, 0, "32n", 0.5);
          synth.triggerAttackRelease(cMajor[columnIndex], "32n");
          //  synth.triggerAttackRelease(freq, "32n");
        }
      }
    },
    [0, 1, 2, 3, 4, 5, 6, 7],
    "16n"
  );
}

// Sample Sequencer
{
  // Store the .wav files in a Tone player to be used in the Sequence
  var players = new Tone.Players(
    [
      "./static/Samples/909 Drum Machine/909YCLAP/909Y38SN11.wav",
      "./static/Samples/909 Drum Machine/909YCRASHS/909Y49CS11.wav",
      "./static/Samples/909 Drum Machine/909YHHTS/909Y42CHH1.wav",
      "./static/Samples/909 Drum Machine/909YKICK/909Y33BD31.wav",
      "./static/Samples/909 Drum Machine/909YRIDE/909Y51RD11.wav",
      "./static/Samples/909 Drum Machine/909YRIM/909Y37RIM1.wav",
      "./static/Samples/909 Drum Machine/909YSNARES/909Y38SN11.wav",
      "./static/Samples/909 Drum Machine/909YTOMS/909Y41FTL1.wav"
    ],
    {
      volume: volumeSliderSampler,
      fadeOut: "64n"
    }
  ).toMaster();
  var volumeSliderSampler = document.getElementById("volumeValueSampler").value;

  // Loop through the sequencer and play any sounds that were selected to play
  let columns = document.getElementById("sample-sequencer").children;
  var sampleSequence = new Tone.Sequence(
    function(time, columnIndex) {
      // Get the current column
      var column = columns[columnIndex];
      // Get cells from the currently looped column and convert the htmlcollection to an array so we have access to the index values
      var cells = Array.from(column.children);

      var volumeSliderSampler = document.getElementById("volumeValueSampler")
        .value;
      var reverbSliderSampler = document.getElementById("reverbValueSampler")
        .value;
      console.log("sampler volume " + volumeSliderSampler);
      console.log("reverb sampler value " + reverbSliderSampler);
      var waveTypeSampler = selectedWave();
      var freqSampler = selectedFreq();
      var synthSampler = new Tone.Synth({
        frequency: freqSampler,
        detune: 0,
        oscillator: {
          type: waveTypeSampler
        }
      });

      var synthReverb = new Tone.Reverb({
        decay: reverbSliderSampler,
        preDelay: 0.01
      }).toMaster();
      synthSampler.connect(synthReverb).toMaster();

      var synthVolume = new Tone.Volume({
        volume: volumeSliderSampler
      }).toMaster();
      synthSampler.connect(synthVolume).toMaster();

      var synthFrequency = new Tone.Frequency(freq);
      synthSampler.connect(synthFrequency).toMaster();

      for (let cell of cells) {
        if (cell.classList.contains("selected")) {
          // Use the cell index to get the correct sound for that cell
          sampleSound = players._players[cells.indexOf(cell)];
          sampleSound.start(time, 0, "32n", 0.5);
          //  synth.triggerAttackRelease(players[columnIndex], "32n");
          // synthSampler.triggerAttackRelease(freq, "32");
        }
      }
    },
    [0, 1, 2, 3, 4, 5, 6, 7],
    "16n"
  );
}
