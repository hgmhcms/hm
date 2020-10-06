//最近更新
var request_func = function(){
    var document_height = $(document).height();
    if($(window).scrollTop()+$(window).height()>=(document_height-m_global.document_hei)) {
        $("#loadding").show();
        updates_ajax();
    }
};


var updates_page = 0;

var updates_ajax=function() {
    $(window).unbind('scroll', request_func);
    updates_page++;
    var url = '/e/extend/updata/index.php?line=10&updatepage='+ updates_page;
    T.restGet(url, {}, function(data)
    {
        function getHtmlTypeString(type_str)
        {
            var html_str = '';
            var type_arr = type_str.split("/");
            for (var i = 0; i < type_arr.length; i++) {
                html_str += '<span class="pd">' + type_arr[i] + '</span>';
            }
            return html_str;
        }

        var html = '';
        for (var i = 0; i < data.length; i++)
        {
            var update_timestamp = data[i].last_updatetime;
            var update_date = new Date(update_timestamp*1000);
            var comic_cover = data[i].cover;
            var is_end = data[i].status == 1 ? true : false;

            var end_str = is_end ? '<span class="wan"></span>' : '';

            html +=
                '<div class="itemBox">' +
                '<div class="itemImg">' + '<a href="'+data[i].titleurl+'" title=""><img src="' + comic_cover + '" width="100%"></a>' + end_str + '</div>' +
                '<div class="itemTxt">' +
                '<p class="title">' + data[i].name + '</p>' +
                '<p class="txtItme">' + data[i].authors + '<span class="icon icon01"></span></p>' +
                '<p class="txtItme">' + getHtmlTypeString(data[i].types) + '<span class="icon icon02"></span></p>' +
                '<p class="txtItme"><span class="date">' + update_date.format("yyyy-MM-dd hh:mm") +'</span><span class="icon icon03"></span></p>' +
                '</div>' +
                '<a href="'+data[i].titleurl+'" class="coll">' + data[i].last_update_chapter_name + '</a>' +
                '</div>';
        }
        $(".UpdateList").append(html);

        if(data.length==0){
            $("#loadding").show().text("已经没有了");
            $(window).unbind('scroll', request_func);
            return false
        }else{
            $(window).bind('scroll', request_func);
            $("#loadding").hide()
        }

    }, function(data) {
        console.log(data.msg);
        $(window).bind('scroll', request_func);
    });
};

$(window).bind('scroll', request_func);
