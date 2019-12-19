/*                                                                   */
/* TODO: Need to create and initialise function to make code cleaner */
/*                                                                   */
let majorScales = {
  aMajor: ["A4", "B4", "C#4", "D4", "E4", "F#4", "G#4", "A5"],
  bMajor: ["B4", "C#4", "D#4", "E4", "F#4", "G#4", "A#4", "B5"],
  cMajor: ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"],
  dMajor: ["D4", "E4", "F#4", "G4", "A5", "B5", "C#5", "D5"],
  eMajor: ["E4", "F#4", "G#4", "A4", "B4", "C#4", "D#4", "E5"]
};

let minorScales = {
  aMinor: ["A4", "B4", "C4", "D4", "E4", "G4", "A5"],
  bMinor: ["B4", "C#4", "D4", "E4", "F#4", "G4", "A4", "B5"],
  cMinor: ["C4", "D4", "Eb4", "F4", "G4", "Ab4", "Bb4", "C5"],
  dMinor: ["D4", "E4", "F4", "G4", "A4", "Bb4", "C4", "D5"],
  eMinor: ["E4", "F#4", "G4", "A4", "B4", "C4", "D4", "E5"]
};

var samplesDirectories = [
  './static/Samples/909 Drum Machine/909YCLAP/Clap',
  './static/Samples/909 Drum Machine/909YCRASHS/Crash',
  './static/Samples/909 Drum Machine/909YHHTS/Hi-Hat',
  './static/Samples/909 Drum Machine/909YKICK/Kick',
  './static/Samples/909 Drum Machine/909YRIDE/Ride',
  './static/Samples/909 Drum Machine/909YRIM/Rim',
  './static/Samples/909 Drum Machine/909YSNARES/Snare',
  './static/Samples/909 Drum Machine/909YTOMS/Tom'
];
var scale = majorScales.aMajor;
displayNotes(scale);
//hardcoded for now
Tone.Transport.bpm.value = 60;

function toggleSound() {
  var toggleBtn = document.getElementById("toggle-sound-btn");
  if (Tone.Transport.state == "stopped") {
    oscillatorSequence.start();
    sampleSequence.start();
    Tone.Transport.start();
    toggleBtn.innerHTML = '<i style="font-size:24px" class="fa">&#xf04d;</i>';
  } else {
    Tone.Transport.stop();
    toggleBtn.innerHTML = '<i style="font-size:24px" class="fa">&#xf04b;</i>';
  }
}

function updateBpm(bpmSlider) {
  Tone.Transport.bpm.value = bpmSlider.value;
}

function setScale() {
  var selectedScale = document.getElementById("selectedScale");
  if (selectedScale.value.includes("Major")) {
    scale = majorScales[selectedScale.value];
  } else {
    scale = minorScales[selectedScale.value];
  }
  displayNotes(scale);
}

function displayNotes(scale) {
  var notes = document.getElementById("oscillator-notes").children;
  notes = Array.from(notes);
  for (note of notes) {
    note.innerHTML = scale[notes.indexOf(note)].slice(0, -1);
  }
}

function stopSound() {
  var toggleBtn = document.getElementById("toggle-sound-btn");
  Tone.Transport.stop();
  toggleBtn.innerHTML = '<i style="font-size:24px" class="fa">&#xf04b;</i>';
}

///filter for oscillator
function selectedWave() {
  var waveType = document.getElementById("selectedVal").value; //selected value of wave type
  synth.oscillator.type = waveType;
}

function setSliderValue(slider) {
  var newValue = slider.value;
  // Update synth values
  if (slider.id.includes("synth")) {
    switch (slider.id) {
      case "synth-reverb":
        synthReverb.dampening.value = newValue;
        break;
      case "synth-volume":
        synthVolume.volume.value = newValue;
        break;
      case "synth-distortion":
        synthDistortion.distortion = newValue / 10;
        break;
      case "synth-wet":
        synthDistortion.wet.value = newValue / 10;
        break;
      case "default":
        break; // Do nothing if we don't have the slider
    }
    // Update sampler values
  } else if (slider.id.includes("sampler")) {
    switch (slider.id) {
      case "sampler-reverb":
        samplerReverb.dampening.value = newValue;
        break;
      case "sampler-volume":
        samplerVolume.volume.value = newValue;
        break;
      case "sampler-distortion":
        samplerDistortion.distortion = newValue / 10;
        break;
      case "sampler-wet":
        samplerDistortion.wet.value = newValue / 10;
        break;
      case "default":
        break; // Do nothing if we don't have the slider
    }
  } else {
    // Update BPM
    Tone.Transport.bpm.value = newValue;
  }
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
  var synth = new Tone.Synth({
    detune: 0,
    oscillator: {
      type: document.getElementById("selectedVal").value
    }
  });

  // Effects
  var volumeSlider = document.getElementById("synth-volume").value;
  var reverbSlider = document.getElementById("synth-reverb").value;
  var distortionSlider = document.getElementById("synth-distortion").value;
  var wetSlider = document.getElementById("synth-wet").value;

  var synthReverb = new Tone.Freeverb({
    dampening: reverbSlider,
    roomSize: 0.7
  }).toMaster();

  var synthVolume = new Tone.Volume({
    volume: volumeSlider,
    mute: false
  }).toMaster();

  var synthDistortion = new Tone.Distortion({
    distortion: distortionSlider,
    wet: wetSlider
  }).toMaster();

  synth.fan(synthReverb, synthVolume, synthDistortion);

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
          synth.triggerAttackRelease(scale[cells.indexOf(cell)], "32n");
        }
      }
    },
    [0, 1, 2, 3, 4, 5, 6, 7],
    "16n"
  );
}

var playerIndices = {
    clap: '1', crash: '1', hihat: '1', kick: '1',
    ride: '1', rim: '1', snare: '1', tom: '1'
};
var sampleNames = [
  'clap', 'crash', 'hihat', 'kick',
  'ride', 'rim', 'snare', 'tom'
]
function setSample(selectedSample) {
  var newPlayers = [];
  playerIndices[selectedSample.id] = selectedSample.value;

  players.dispose();

  for(var i = 0; i < 8; i++) {
    newPlayers[i] = samplesDirectories[i] + playerIndices[sampleNames[i]] + '.wav';
    players = createPlayer(newPlayers);
  }
  stopSound();
}

function createPlayer(newPlayers) {
  player = new Tone.Players(
    [
      newPlayers[0], newPlayers[1], newPlayers[2], newPlayers[3],
      newPlayers[4], newPlayers[5], newPlayers[6], newPlayers[7]
    ],
    {
      // volume: volumeSliderSampler,
      mute: false,
      fadeOut: "64n"
    }
  ).toMaster();

  return player;
}

// Sample Sequencer
{
   // Store the .wav files in a Tone player to be used in the Sequence
   var players = new Tone.Players(
    [
      "./static/Samples/909 Drum Machine/909YCLAP/Clap1.wav",
      "./static/Samples/909 Drum Machine/909YCRASHS/Crash1.wav",
      "./static/Samples/909 Drum Machine/909YHHTS/Hi-Hat1.wav",
      "./static/Samples/909 Drum Machine/909YKICK/Kick1.wav",
      "./static/Samples/909 Drum Machine/909YRIDE/Ride1.wav",
      "./static/Samples/909 Drum Machine/909YRIM/Rim1.wav",
      "./static/Samples/909 Drum Machine/909YSNARES/Snare1.wav",
      "./static/Samples/909 Drum Machine/909YTOMS/Tom1.wav"
    ],
    {
      // volume: volumeSliderSampler,
      mute: false,
      fadeOut: "64n"
    }
  ).toMaster();

  // Effects
  var volumeSliderSampler = document.getElementById("sampler-volume").value;
  var reverbSliderSampler = document.getElementById("sampler-reverb").value;
  var distortionSliderSampler = document.getElementById("sampler-distortion")
    .value;
  var wetSliderSampler = document.getElementById("sampler-wet").value;
  var wetSlider = document.getElementById("sampler-wet").value;

  var samplerReverb = new Tone.Freeverb({
    dampening: reverbSliderSampler,
    roomSize: 0.7
  }).toMaster();

  var samplerVolume = new Tone.Volume({
    volume: volumeSliderSampler,
    mute: false
  }).toMaster();

  var samplerDistortion = new Tone.Distortion({
    distortion: distortionSliderSampler,
    wet: wetSliderSampler
  }).toMaster();

  players.fan(samplerReverb, samplerVolume, samplerDistortion);

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