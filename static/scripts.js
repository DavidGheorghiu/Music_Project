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