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
  var waveType = document.getElementById("selectedVal").value; //selected value of wave type
  synth.oscillator.type = waveType;
}

function updateDistortion(distortionSlider) {
  var distortionValue = distortionSlider.value/10;
  if(distortionSlider.id == 'synth-distortion') {
    synthDistortion.distortion = distortionValue;
  } else {
    samplerDistortion.distortion = distortionValue;
  }
}

function updatedWet(wetSlider) {
  var wetValue = wetSlider.value/10;
  if(wetSlider.id == 'synth-wet') {
    synthDistortion.wet.value = wetValue;
  } else {
    samplerDistortion.wet = wetValue;
  }
}

function updateVolume(volumeSlider) {
  var volumeValue = volumeSlider.value;
  if(volumeSlider.id == 'synth-volume') {
    synthVolume.volume.value = volumeValue;
  } else {
    samplerVolume.volume.value = volumeValue;
  }
}

function updateReverb(reverbSlider) {
  var reverbValue = reverbSlider.value;
  if(reverbSlider.id == 'synth-reverb') {
    synthReverb.dampening.value = reverbValue;
  } else {
    samplerReverb.dampening.value = reverbValue;
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
  let cMajor = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
  let columns = document.getElementById("oscillator-sequencer").children;

  var oscillatorSequence = new Tone.Sequence(
    function(time, columnIndex) {
      // Get the current column
      var column = columns[columnIndex];
      // Get cells from the currently looped column and convert the htmlcollection to an array so we have access to the index values
      var cells = Array.from(column.children);

      for (let cell of cells) {
        if (cell.classList.contains("selected")) {
          synth.triggerAttackRelease(cMajor[cells.indexOf(cell)], "32n");
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

  var samplerReverb = new Tone.Freeverb(reverbSliderSampler).toMaster();
  players.connect(samplerReverb);

  var samplerVolume = new Tone.Volume({
    volume: volumeSliderSampler,
    mute: false
  }).toMaster();
  players.connect(samplerVolume);

  var distSampler = new Tone.Distortion({
    distortion: distortionSliderSampler,
    wet: wetSliderSampler
  }).toMaster();
  synth.connect(distSampler);

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
