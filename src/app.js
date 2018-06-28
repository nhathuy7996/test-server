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

    $('#btnConnect').click(() => {
        const friendSignal = JSON.parse($('#txtFriendSignal').val());
        p.signal(friendSignal);
        console.log('connecting');
    });

    p.on('stream', friendStream => playVideo(friendStream, 'friendStream'));
});
