function play() {
    sampleSequence.start();
    Tone.Transport.start();
}

function stop() {
    Tone.Transport.stop();
}

function updateBpm(slider) {
    // add check for oscillator bpm slider
    if(slider.id == 'sample-bpm-slider') {
        Tone.Transport.bpm.value = slider.value;
    }
}

var sequencer = document.querySelector('.sequencer');
sequencer.addEventListener('click', function(event) {
    eventTarget = event.target;
    if(eventTarget.className.includes('cell')) {
        classlist = eventTarget.classList;
        if(!classlist.contains('selected')) {
            classlist.add('selected');
        }
        else {
            classlist.remove('selected');
        }
    }
});

// Sample Sequencer
{
    var players = new Tone.Players([
        './static/Samples/909 Drum Machine/909YCLAP/909Y38SN11.wav',
        './static/Samples/909 Drum Machine/909YCRASHS/909Y49CS11.wav',
        './static/Samples/909 Drum Machine/909YHHTS/909Y42CHH1.wav',
        './static/Samples/909 Drum Machine/909YKICK/909Y33BD31.wav',
        './static/Samples/909 Drum Machine/909YRIDE/909Y51RD11.wav',
        './static/Samples/909 Drum Machine/909YRIM/909Y37RIM1.wav',
        './static/Samples/909 Drum Machine/909YSNARES/909Y38SN11.wav',
        './static/Samples/909 Drum Machine/909YTOMS/909Y41FTL1.wav'
    ], {
        'volume': -10,
        'fadeOut': '64n',
    }).toMaster();
    
    var columns = document.getElementById('sample-sequencer').children;
    var sampleSequence = new Tone.Sequence(function(time, columnIndex) {
        // Get the current column
        var column = columns[columnIndex];
        // Get cells from the currently looped column and convert the htmlcollection to an array so we have access to the index values
        var cells = Array.from(column.children);
        for(let cell of cells) {
            if(cell.classList.contains('selected')) {
                // Use the cell index to get the correct sound for that cell
                sampleSound = players._players[cells.indexOf(cell)];
                sampleSound.start(time, 0, '32n', 0.5);
            }
        }
    }, [0, 1, 2, 3, 4, 5, 6, 7], '16n');
}