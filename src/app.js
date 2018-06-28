const playVideo = require('./playVideo');
const Peer = require('simple-peer');
const openStream = require('./openStream');
const $ = require('jquery');

openStream(function(stream){
    playVideo(stream, 'localStream')
    const p = new Peer({ initiator: location.hash === '#1', trickle: false, stream });

    p.on('signal', token => {
        $('#txtMySignal').val(JSON.stringify(token))
    });

   const friendSignal;
    $('#btnConnect').click(() => {
        console.log('Connecting!');
        friendSignal = JSON.parse($('#txtFriendSignal').val());
        p.signal(friendSignal);
    });

    p.oniceconnectionstatechange = function(event) {
        if (pc.iceConnectionState === "failed" ) {
            console.log('Connect fail, reconnect!!');
            friendSignal = JSON.parse($('#txtFriendSignal').val());
            p.signal(friendSignal);
        }
          // Handle the failure
      };

     p.on('stream', friendStream => {
        playVideo(friendStream, 'friendStream');
        const audio = document.getElementById('audio');
        audio.srcObject = stream;
    });
});
