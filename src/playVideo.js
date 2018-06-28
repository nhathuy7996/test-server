function playVideo(stream, idVideo) {
    const video = document.getElementById(idVideo);
    video.srcObject = stream;
    video.onloadedmetadata = function () {
        video.play();
    };
    if(idVideo==='localStream'){
        stream.removeTrack(stream.getAudioTracks()[0]); 
    }
}

module.exports = playVideo;
