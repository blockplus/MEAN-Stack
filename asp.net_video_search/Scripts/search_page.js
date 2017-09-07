$(window).load(function () {
    
    function addToList() {
        var listVideos = null;
        var app = localStorage.onlineSearchVideos;
        var similarVideos = null;

        if (!app) {
            listVideos = []
        }
        else {
            listVideos = JSON.parse(app).videos;
            similarVideos = JSON.parse(app).similarVideos;
        }


        var video = $(this).parents('.thumbnail')[0];
        var c = $(video).find('.thumb-link')[0];
        var id = $(c).attr('data-id');

        for (var i = 0; i < listVideos.length; i++) {
            if (listVideos[i].id == id) {
                //it alreday exists
                console.log('video already exists in the list');
                return;
            }
        }

        var video_url = "http://www.youtube.com/watch?v=" + id;
        var channel_title = $(c).attr('data-channel-title');
        var list_title = $(c).attr('data-list-title');
        var watch_count = $(c).attr('data-watch-count');
        var title = $($(c).find('img')[0]).attr('title');
        var img_url = $($(c).find('img')[0]).attr('src');


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

        localStorage.setItem("onlineSearchVideos", JSON.stringify({ videos: listVideos, similarVideos: similarVideos }));
        appendVideoToList(video_obj);
        // append in the playlist
    }

    function addToListFromMoreVideos() {
        var listVideos = null;
        var app = localStorage.onlineSearchVideos;
        var similarVideos = null;

        if (!app) {
            listVideos = []
        }
        else {
            listVideos = JSON.parse(app).videos;
            similarVideos = JSON.parse(app).similarVideos;
        }


        var video = $(this).parents('.list-item')[0];
        var c = $(video).find('.play-button')[0];
        var id = $(c).attr('data-id');

        for (var i = 0; i < listVideos.length; i++) {
            if (listVideos[i].id == id) {
                //it alreday exists
                console.log('video already exists in the list');
                return;
            }
        }

        var video_url = "http://www.youtube.com/watch?v=" + id;
        var channel_title = $(c).attr('data-channel-title');
        var list_title = $(c).attr('data-list-title');
        var watch_count = $(c).attr('data-watch-count');
        var title = $($(c).find('img')[0]).attr('title');
        var img_url = $($(c).find('img')[0]).attr('src');


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

        localStorage.setItem("onlineSearchVideos", JSON.stringify({ videos: listVideos, similarVideos: similarVideos }));
        appendVideoToList(video_obj);
        // append in the playlist
    }

    $(".thumbnail .add-to-list img").on("click", addToList);
    $(".list-item .more-video-add-to-list img").on("click", addToListFromMoreVideos);

});