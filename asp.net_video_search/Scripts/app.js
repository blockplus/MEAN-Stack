//remove the current list-item and also video with id from local storage
function removeVideo(id) {
    var playlist_area = $("#playlist");

    var video = $(playlist_area).find('#' + id + '.list-item')[0];

    if (video) {
        $(video).remove(); //remove the element;
    }

    // udpate localstorage

    var app = localStorage.onlineSearchVideos;
    var listVideos = JSON.parse(app).videos;
    
    var _index = null;
    for (var i = 0; i < listVideos.length; i++) {
        if (listVideos[i].id == id) {
            _index = i;
            break;
        }
    }

    if (_index > -1) {
        listVideos.splice(_index, 1);
        localStorage.setItem("onlineSearchVideos", JSON.stringify({ videos: listVideos}));
    }

    if (listVideos.length == 0) {
        $("#playlist .empty-message").show(100);
    }


};

function appendVideoToList(video) {
    var playlist_area = $("#playlist");
    var watchCountStr = video.watch_count;

    if (!watchCountStr) {
        watchCountStr = '';
    }

    //if (watchCountStr.length > 4) {
    //    watchCountStr = "100K+";
    //}
    //watchCountStr = Array(12 - watchCountStr.length).join("&nbsp;&nbsp;") + watchCountStr;

    var video_div = [
        "<div class='list-item' id='" + video.id + "'>",
            "<div class='text-center'>",
                '<a><img class="close" src="images/close.png" onclick="removeVideo(' + "'" + video.id + "'" + ')" /></a> ',
            "</div>",
            "<span class='first-card-sec'>",
                "<div class='embed-responsive embed-responsive-16by9 thumb-div'>",
                    "<a class='play-button' href='/video?id=" + video.id + "'>",
                        "<image class='thumb' src='" + video.img_url + "' title='" + video.title + "'/>",
                    "</a>",
                "</div>",
            "</span>",
            "<span>",
                "<h2>" + video.list_title + "</h2>",
                "<i>" + video.channel_title + "</i>",
            "</span>",
            "<div class='first-video-sec2'>",
                "<span class='labl2 pull-left'>" + watchCountStr + "</span>",
                "<a class='play-button pull-right' href='/video?id=" + video.id +"'>",
                    "<label class='labl11'>",
                        "<span class='glyphicon glyphicon-play' aria-hidden='true'></span>",
                    "</label>",
                "</a>",
            "</div>",            
            "<div class='position-panel'>",
                "<a onclick='movePlaylistItem(\"" + video.id + "\", \"up\")' class='up'>",
                    "<i class='glyphicon glyphicon-arrow-up' aria-hidden='true'></i>",
                "</a>",
                "<a onclick='movePlaylistItem(\"" + video.id + "\", \"down\")' class='down'>",
                    "<i class='glyphicon glyphicon-arrow-down' aria-hidden='true'></i>",
                "</a>",
            "</div>",
            
        "</div>"
    ];
    $(playlist).append(video_div.join(""));
    $("#playlist .empty-message").hide(100);
}

function togglePlayMode() {
    var playMode = $("#repeat-mode").attr("data-mode");
    if (playMode == "shuffle") {
        $("#repeat-mode").attr("data-mode", "repeat");
        $("#repeat-mode").attr("src", "/Images/repeat.png");
    }
    else {
        $("#repeat-mode").attr("data-mode", "shuffle");
        $("#repeat-mode").attr("src", "/Images/shuffle.png");
    }
}


// show videos in playlist section from localstorage
function showPlaylistVideos() {
    var listVideos = null;
    var app = localStorage.onlineSearchVideos;
    var playlist_area = $("#playlist");

    if (!app) {
        listVideos = []
    }
    else {
        listVideos = JSON.parse(app).videos;
    }

    if (!listVideos || listVideos.length == 0) {
        return;
    }

    //listVideos are cached on thebrowser
    for (i = 0; i < listVideos.length; i++) {
        var video = listVideos[i];
        appendVideoToList(video);
    }

    //hide empty-message dialogbox
    $("#playlist .empty-message").hide(100);
}


// move the item up/down in playlist
function movePlaylistItem(id, dir) {
    
    var app = localStorage.onlineSearchVideos;

    if (!app) {
        return;
    }

    var listVideos = JSON.parse(app).videos;
    var _index = null;

    for (var i = 0; i < listVideos.length; i++) {
        if (listVideos[i].id == id) {
            _index = i;
            break;
        }
    }

    if (_index == null) {
        return;
    }

    if (dir == 'up' && _index == 0) {
        return;
    }
    else if (dir == 'down' && _index == listVideos.length -1 ) {
        return;
    }
    
    var playlist_area = $("#playlist");
    var items = $('#playlist .list-item');

    // swap elements
    var _cur = listVideos[_index];    
    var _curItem = items[_index];
    var _other = null;

    if (dir == 'up') {
        listVideos[_index] = listVideos[_index - 1];
        listVideos[_index - 1] = _cur;
        //swap item
        $(items[_index]).remove();
        $(items[_index-1]).before(_curItem);
    }
    else {
        listVideos[_index] = listVideos[_index + 1];
        listVideos[_index + 1] = _cur;

        // swap item
        $(items[_index]).remove();
        $(items[_index + 1]).after(_curItem);
    }

    localStorage.setItem("onlineSearchVideos", JSON.stringify({ videos: listVideos }));

}

jQuery(document).ready(function () {
    jQuery('.slide-1').bxSlider({
        slideWidth: 293,
        minSlides: 1,
        maxSlides: 4,
        moveSlides: 1,
        slideMargin: 0,
        pager: false
    });

    jQuery('.slide-2').bxSlider({
        slideWidth: 293,
        minSlides: 1,
        maxSlides: 4,
        moveSlides: 1,
        slideMargin: 0,
        pager: false
    });

    jQuery('.slide-3').bxSlider({
        slideWidth: 293,
        minSlides: 1,
        maxSlides: 4,
        moveSlides: 1,
        slideMargin: 0,
        pager: false
    });

    jQuery('.slide-4').bxSlider({
        slideWidth: 293,
        minSlides: 1,
        maxSlides: 4,
        moveSlides: 1,
        slideMargin: 0,
        pager: false
    });

});

