function play() {
    var synth = new Tone.Synth().toMaster();
    synth.triggerAttackRelease('C4', '8n');
}

function loop() {
    var synth = new Tone.Synth().toMaster();
    var loop = new Tone.Loop(function(time){
        synth.triggerAttackRelease("C4", "8n", time);
    }, "4n");

    loop.start('1m').stop('4m');
    Tone.Transport.start();
}

function stop() {
    Tone.Transport.stop();
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

function play() {
    var columns = document.querySelectorAll('.column');
    for(let column of columns) {
        var cells = Array.prototype.slice.call(column.children);
        for(let cell of cells) {
            if(cell.classList.contains('selected')) {
                
            }
        }
    }
}