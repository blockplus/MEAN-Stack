'use strict';
var similarVideos = null;

$(window).load(function () {
    
    $(".video-page .add-to-list img").on("click", function () {
        var listVideos = null;
        //var similarVideos = null;
        var app = localStorage.onlineSearchVideos;

        if (!app) {
            listVideos = []
            //similarVideos = [];
        }
        else {
            listVideos = JSON.parse(app).videos;
            //similarVideos = JSON.parse(app).similarVideos;
        }


        var video = $(this).parents('.thumbnail')[0];
        var c = $(video).find('.thumb-link')[0];
        var id = $(this).attr('data-id');

        for (var i = 0; i < listVideos.length; i++) {
            if (listVideos[i].id == id) {
                //it alreday exists
                console.log('video already exists in the list');
                return;
            }
        }

        var video_url = "http://www.youtube.com/watch?v=" + id;
        var channel_title = $(this).attr('data-channel-title');
        var list_title = $(this).attr('data-list-title');
        var watch_count = $(this).attr('data-watch-count');
        var title = $(this).attr('data-title');
        var img_url = $(this).attr('data-thumb-url');


        var video_obj = {
            id: id,
            video_url: video_url,
            title: title,
            list_title: list_title,
            watch_count: watch_count,
            channel_title: channel_title,
            img_url: img_url,
        };

        listVideos.push(video_obj);        
        localStorage.setItem("onlineSearchVideos", JSON.stringify({ videos: listVideos}));

        appendVideoToList(video_obj);
        // append in the playlist
    });
        
});

// get random video from similar videos
function getRandomVideo(id) {
        
    var _length = similarVideos.length;
    var randomIndex = Math.floor(Math.random() * _length);
    if (_length == 1) {
        return null;
    }
    while (similarVideos[randomIndex].id == id) {
        randomIndex = Math.floor(Math.random() * _length);
    }

    return similarVideos[randomIndex];
    
}

// cur video id, direction
function playVideo(id, dir) {
    //play previous video in the playlist, if not play some other video randomly similar
    var app = localStorage.onlineSearchVideos;
    var listVideos = JSON.parse(app).videos;    
    var playerInstance = jwplayer("video_player");

    if (!listVideos || listVideos.length == 0) {
        // play random video
        curVideo = getRandomVideo(id);
        if (curVideo == null) {
            return null;
        }
    }
    else {

        // get playmode of the playlist:

        //var playMode = $("#repeat-mode").attr("data-mode");
        //if (playMode == "repeat") {
        //    playerInstance.play(); //play it again
        //    return;
        //}
        var playMode = $("#repeat-mode").attr("data-mode");
        //if (playMode == "repeat") {
        //    playerInstance.play(); //play it again
        //    return;
        //}
        
        var _next = null;
        // check the index of currnet video in the list, play next, if end, play first one:        
        for (var i = 0; i < listVideos.length; i++) {
            if (listVideos[i].id == id) {
                if (dir == 'next') {
                    if (i < listVideos.length - 1) {
                        _next = listVideos[i + 1];
                    }
                    else {
                        _next = listVideos[0];
                    }
                }
                else if (dir == 'prev') {
                    if (i > 0) {
                        _next = listVideos[i - 1];
                    }
                    else {
                        _next = listVideos[listVideos.length - 1];
                    }                    
                }
                break;
            }
        }

        
        if (!_next) {
            curVideo = getRandomVideo(id);
            if (curVideo == null) {
                return null;
            }
        }
        else if (!dir || playMode == "shuffle"){
            // pick random video in the list, if completed
            
            var randomIndex = Math.floor(Math.random() * listVideos.length);

            while (listVideos[randomIndex].id == id) {
                randomIndex = Math.floor(Math.random() * listVideos.length);
            }

            curVideo = listVideos[randomIndex];
        }
        else {
            curVideo = _next;
        }
       
    }
    

    // plays next video
    playerInstance.load([{
        file: curVideo.video_url,
        image: curVideo.img_url
    }]);
    playerInstance.play();

    // reset the button status
    $("#video-play-button").attr('class', 'glyphicon glyphicon-pause');
    playerInstance.play(true);
}

function registerSimilarVideos(jsonStr) {
    var elem = document.createElement('textarea');
    elem.innerHTML = jsonStr;
    var decoded = elem.value;

    similarVideos = JSON.parse(decoded);
}

//play or pause current video
function PlayCurVideo() {
    var className = $("#video-play-button").attr('class');
    var playerInstance = jwplayer("video_player");

    if (className == "glyphicon glyphicon-pause") {
        $("#video-play-button").attr('class', 'glyphicon glyphicon-play');
        playerInstance.play(false);
    }
    else {
        $("#video-play-button").attr('class', 'glyphicon glyphicon-pause');
        playerInstance.play(true);
    }
}