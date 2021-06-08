var playBtn = document.getElementById('play-btn');
var pauseBtn = document.getElementById('pause-btn');
var muteBtn = document.getElementById('mute-btn');
var unmuteBtn = document.getElementById('unmute-btn');
var stopBtn = document.getElementById('stop-btn');
var replayBtn = document.getElementById('replay-btn');
var audioobject = document.getElementsByTagName("video")[0];
var vol = document.getElementById("vol");
var speedobject = document.getElementsByTagName("video")[0];
var beginBtn = document.getElementById("begin");
var backwardBtn = document.getElementById("backward");
var forwardBtn = document.getElementById("forward");
var finishBtn = document.getElementById("finish");
var scrollBar = document.getElementById("scrollbar");
var video1 = document.getElementById("video1");
var timeSpan = document.querySelector('#countdown span');

var stateCheck = setInterval(() => {
    if (document.readyState === 'complete') {
        timeSpan.innerText = (format(video1.currentTime) + "/" + format(video1.duration));
        clearInterval(stateCheck);
      // document ready // event video.load
    }
}, 100);

// window.onload = function(){}

playBtn.addEventListener('click', pausePlayHandler, false);
pauseBtn.addEventListener('click', pausePlayHandler, false);
muteBtn.addEventListener('click', muteUnmuteHandler, false);
unmuteBtn.addEventListener('click', muteUnmuteHandler, false);
stopBtn.addEventListener('click', stopHandler, false);
replayBtn.addEventListener('click', replayHandler, false);
beginBtn.addEventListener('click', begin, false);
backwardBtn.addEventListener('click', backward, false);
forwardBtn.addEventListener('click', forward, false);
finishBtn.addEventListener('click', finish, false);
video1.addEventListener('timeupdate', updateCountdown);
// scrollBar.addEventListener('change', changeduration);

function pausePlayHandler(e) {
   if (video1.paused) {
       // If paused, then play
       video1.play();
        // Show pause button and hide play button
       pauseBtn.style.visibility = 'visible';
       playBtn.style.visibility = 'hidden';
   } else {
       // If playing, then pause
       video1.pause();
       // Show play button and hide pause button
       pauseBtn.style.visibility = 'hidden';
       playBtn.style.visibility = 'visible';
   }
}

function muteUnmuteHandler(e) {
   if (video1.volume == 0.0) {
       // If muted, then turn it on
       video1.volume = 0.5;
       // Show mute button and hide unmute button
       muteBtn.style.visibility = 'visible';
       unmuteBtn.style.visibility = 'hidden';
       vol.value = 0.5;
       
   } else {
       // If unmuted, then turn it off
       video1.volume = 0;
       // Show unmute button and hide mute button
       muteBtn.style.visibility = 'hidden';
       unmuteBtn.style.visibility = 'visible';
       vol.value = 0;
   }
}

function stopHandler(e) {
   // There is no stop method for HTML5 video
   // As a workaround, pause the video
   // and set currentTime to 0
   video1.currentTime = 0;
   video1.pause();
   // Show or hide other video buttons accordingly
   pauseBtn.style.visibility = 'hidden';
   playBtn.style.visibility = 'visible';
}

function replayHandler(e) {
   // There is no replay method for HTML5 video
   // As a workaround, set currentTime to 0
   // and play the video
   video1.currentTime = 0;
   video1.play();
   // Show or hide other video buttons accordingly
}

function changevolume(amount) {
    audioobject.volume = amount;
}

function changespeed(amount) {
    speedobject.playbackRate = amount;
}

function begin(e){
    beginBtn.onclick = function(){
        video1.currentTime = 0;
    }
}

function backward(e){
    backwardBtn.onclick = function(){
        vid_currentTime = video1.currentTime;
        video1.currentTime = vid_currentTime - 5;
    }
}

function forward(e){
    forwardBtn.onclick = function(){
        vid_currentTime = video1.currentTime;
        video1.currentTime = vid_currentTime + 5;
    }
}

function finish(e){
    finishBtn.onclick = function(){
        // There is no stop method for HTML5 video
        // As a workaround, pause the video
        // and set currentTime to 0
        video1.currentTime = video1.duration;
        video1.pause();
        // Show or hide other video buttons accordingly
        pauseBtn.style.visibility = 'hidden';
        playBtn.style.visibility = 'visible';
        scrollBar.max = video1.duration;
    }
}

function updateCountdown() {
    scrollBar.value = video1.currentTime;
    scrollBar.max = video1.duration;
    timeSpan.innerText = format(video1.currentTime) + "/" + format(video1.duration);
    if(video1.currentTime == video1.duration)
    {
        pauseBtn.style.visibility = 'hidden';
        playBtn.style.visibility = 'visible';
    }
}

function format(time) {   
    // Hours, minutes and seconds
    var hrs = Math.floor(time / 3600);
    var mins = Math.floor((time % 3600) / 60);
    var secs = Math.floor(time % 60);

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

function calcSliderPos(e) {
    return (e.offsetX / e.target.clientWidth) * parseInt(e.target.getAttribute('max'),10);
}

scrollBar.oninput = function changeduration() {
    video1.currentTime = scrollBar.value;
}

scrollBar.onmousemove = function (e) {
    var popup = document.getElementById("myPopup");
    popup.style.visibility = "visible";
    popup.currentTime = calcSliderPos(e).toFixed(2);
    var left = e.pageX - $(this).offset().left - 80;
    var top = e.pageY - $(this).offset().top + 270;
    $('#myPopup').css({top: top,left: left}).show();
}

document.addEventListener('mouseout', function () {
    var popup = document.getElementById("myPopup");
    popup.style.display = "none";
});