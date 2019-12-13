function play() {
  oscillatorSequence.start();
  //sampleSequence.start();
  Tone.Transport.start();
}

function stop() {
  Tone.Transport.stop();
}

function updateBpm(bpmSlider) {
  Tone.Transport.bpm.value = bpmSlider.value;
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
function volumeGain(value) {
  var vol = (document.getElementById("volume").innerHTML = value);
  // Tone.Transport.volume.value = vol.value;
  return vol;
}

function Reverb(value) {
  document.getElementById("reverb").innerHTML = value;
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
  var volumeSlider = document.getElementById("volumeValue").value;
  // Tone.Transport.volume.value = volumeSlider.value;
  var waveType = selectedWave();
  var freq = selectedFreq();
  var synth = new Tone.Synth({
    frequency: freq,
    detune: 0,
    // volume: volumeSlider,
    envelop: {
      decay: 0,
      preDelay: 0.01,
      sustain: 0.3,
      release: 1
    },

    oscillator: {
      type: waveType
    }
  }).toMaster();
  //  synth.triggerAttackRelease(freq, "32n");
  // Loop through the sequencer and play any sounds that were selected to play
  let columns = document.getElementById("oscillator-sequencer").children;
  var oscillatorSequence = new Tone.Sequence(
    function(time, columnIndex) {
      // Get the current column
      var column = columns[columnIndex];
      // Get cells from the currently looped column and convert the htmlcollection to an array so we have access to the index values
      var cells = Array.from(column.children);
      for (let cell of cells) {
        if (cell.classList.contains("selected")) {
          // Use the cell index to get the correct sound for that cell
          sampleSound = players._players[cells.indexOf(cell)];
          sampleSound.start(time, 0, "32n", 0.5);
          //  synth.triggerAttackRelease(cMajor[columnIndex], "32n");
          synth.triggerAttackRelease(freq, "32n");
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
      volume: -10,
      fadeOut: "64n"
    }
  ).toMaster();

  // Loop through the sequencer and play any sounds that were selected to play
  let columns = document.getElementById("sample-sequencer").children;
  var sampleSequence = new Tone.Sequence(
    function(time, columnIndex) {
      // Get the current column
      var column = columns[columnIndex];
      // Get cells from the currently looped column and convert the htmlcollection to an array so we have access to the index values
      var cells = Array.from(column.children);
      for (let cell of cells) {
        if (cell.classList.contains("selected")) {
          // Use the cell index to get the correct sound for that cell
          sampleSound = players._players[cells.indexOf(cell)];
          sampleSound.start(time, 0, "32n", 0.5);
        }
      }
    },
    [0, 1, 2, 3, 4, 5, 6, 7],
    "16n"
  );
}
