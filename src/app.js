const playVideo = require('./playVideo');
const Peer = require('simple-peer');
const openStream = require('./openStream');
const $ = require('jquery');

openStream(function(stream){
    
    const p = new Peer({ initiator: location.hash === '#1', trickle: false, stream });

    var tracks = stream.getTracks();
    stream.removeTrack(tracks[0]);     
    playVideo(stream, 'localStream');

    p.on('signal', token => {
        $('#txtMySignal').val(JSON.stringify(token));
    });

   
    $('#btnConnect').click(() => {
        $('#noti').replaceWith('Connecting!');
        const friendSignal = JSON.parse($('#txtFriendSignal').val());
        p.signal(friendSignal);
    });



     p.on('stream', friendStream => {
        friendStream.addTrack(tracks[0]); 
        $('#noti').replaceWith('Connected! Start streaming');
        playVideo(friendStream, 'friendStream');
    });
});
