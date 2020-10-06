$(function(){

    $(document).bind("contextmenu",function(){
        return false;
    });

    if($.cookie("setUp")==null){
        $.cookie("setUp");
        $.cookie("setUp",0,{path:'/'});
    }else{
        if($.cookie("setUp")==1){
            closeLight();
        }
    }
    function closeLight(){
        /*$(".last_bg").css("background","#1e1e1e");*/
        $("body").removeClass("last_bg").addClass("close_bg");
        $(".close_d").parent().hide();
        $(".open_dli").show();
        $(".comic_last").hide();
        $(".last_url").css("background","#fff");
        $(".next_url").css("background","#fff");
        $(".wrap_last_head").css("border-bottom","0 solid #d6d6d6");
        $(".comic_wraCon img").css("border","0 solid #e6e6e6");
        $(".comic_gd").css({"border":"0 solid #999","background":"#666"});
        $(".head_title").css("color","#999");
        $(".head_title h1 a").css("color","#999");
        $(".head_title h2").css("color","#999");
        $(".page_o a").css("background","#eee");
        $(".page_o span").css("color","#999");
        $(".select_jump").css("background","#eee");
        $(".head_wz").css("color","#999");
        $(".head_wz a").css("color","#999");
        $(".pre").css("color","#999");
        $(".next").css("color","#999");
        $(".pre a").css("color","#999");
        $(".next a").css("color","#999");
    }

    function openLight(){
        /*$(".last_bg").css("background","#fff");*/
        $("body").removeClass("close_bg").addClass("last_bg");
        $(".open_d").parent().hide();
        $(".close_dli").show();
        $(".comic_last").show();
        $(".comic_wraCon img").css("border","1px solid #e6e6e6");
        $(".wrap_last_head").css("border-bottom","1px solid #d6d6d6");
        $(".comic_gd").css({"border":"1px solid #e6e6e6","background":"none"});
        $(".head_title").css("color","#333");
        $(".head_title h1 a").css("color","#333");
        $(".head_title h2").css("color","#333");
        $(".page_o a").css("background","#fff");
        $(".page_o span").css("color","#fff");
        $(".numPage").css("color","#4da1e9");
        $(".select_jump").css("background","#fff");
        $(".head_wz").css("color","#333");
        $(".head_wz a").css("color","#333");
        $(".pre").css("color","#333");
        $(".next").css("color","#333");
        $(".pre a").css("color","#333");
        $(".next a").css("color","#333");
    }

    $(".close_d").click(function(e){
        e.preventDefault();
        closeLight();
        if($(".close_dli").css("display")=="none"){
            $.cookie("setUp",1,{path:'/'});
        }
    });

    $(".open_d").click(function(e){
        e.preventDefault();
        openLight();
        if($(".open_dli").css("display")=="none"){
            $.cookie("setUp",0,{path:'/'});
        }
    })
});
function openBoxOne(){
    $(".show").show();
    $(".text_box").show();
}
function openBoxTwo(){
    $(".show").show();
    $(".red_box").show();
}

$(function(){
    $("#closeBtn").live("click",function(){
        $(".show").hide();
        $(".text_box").hide();
    })
});



$("#closeRed").live("click",function(){
    $(this).parent().hide();
    $(".show").hide();

});

$(".qd_btn").live("click",function(e){
    e.preventDefault();
    $(this).parent().parent().hide();
    $(".show").hide();
});

$(".zj_reset").hover(function(){
    $(this).text("章节目录");
},function(){
    $(this).text("");
});

$(".red_reset").hover(function(){
    $(this).text("阅读设置");
},function(){
    $(this).text("");
});

$(".close_d").hover(function(){
    $(this).text("关灯阅读");
},function(){
    $(this).text("");
});

$(".open_d").hover(function(){
    $(this).text("开灯阅读");
},function(){
    $(this).text("");
});

$(".into_q").hover(function(){
    $(this).text("全屏模式");
},function(){
    $(this).text("");
});

$(".drop_q").hover(function(){
    $(this).text("退出全屏");
},function(){
    $(this).text("");
});
$(".use_re").hover(function(){
    $(this).text("使用说明");
},function(){
    $(this).text("");
});

/*设置全屏*/
var fullscreen= function () {
    if (window.fullScreenApi.supportsFullScreen) {
        fsElement = document.getElementsByTagName('html');
        window.fullScreenApi.requestFullScreen(fsElement[0]);
    } else {
        alert("该浏览器需要手动按 F11 全屏！");
    }
    return false;
};
/*退出全屏*/
var exitFullscreen=function(){
    var elem=document;
    if(elem.webkitCancelFullScreen){
        elem.webkitCancelFullScreen();
    }else if(elem.mozCancelFullScreen){
        elem.mozCancelFullScreen();
    }else if(elem.cancelFullScreen){
        elem.cancelFullScreen();
    }else if(elem.exitFullscreen){
        elem.exitFullscreen();
    }else{
        //浏览器不支持全屏API或已被禁用
    }
};


/*点击进入全屏*/

$(".into_q").click(function(e){
    e.preventDefault();
    fullscreen();
    $(this).parent().hide();
    $(".drop_qli").show();
});


/*点击退出全屏*/

$(".drop_q").click(function(e){
    e.preventDefault();
    exitFullscreen();
    $(this).parent().hide();
    $(".into_qli").show();
});

/*点击打开设置*/

$(".red_reset").click(function(e){
    e.preventDefault();
    $(".side_bar_open").toggle();
});

$(".qx").click(function(e){
    e.preventDefault();
    $(".side_bar_open").hide();
});

(function(){
    var fullScreenApi = {
            supportsFullScreen: false,
            isFullScreen: function() { return false; },
            requestFullScreen: function() {},
            cancelFullScreen: function() {},
            fullScreenEventName: '',
            prefix: ''
        },
        browserPrefixes = 'webkit moz o ms khtml'.split(' ');
    // check for native support
    if (typeof document.cancelFullScreen != 'undefined') {
        fullScreenApi.supportsFullScreen = true;
    } else {
        // check for fullscreen support by vendor prefix
        for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
            fullScreenApi.prefix = browserPrefixes[i];
            if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined' ) {
                fullScreenApi.supportsFullScreen = true;
                break;
            }
        }
    }
    // update methods to do something useful
    if (fullScreenApi.supportsFullScreen) {
        fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
        fullScreenApi.isFullScreen = function() {
            switch (this.prefix) {
                case '':
                    return document.fullScreen;
                case 'webkit':
                    return document.webkitIsFullScreen;
                default:
                    return document[this.prefix + 'FullScreen'];
            }
        }
        fullScreenApi.requestFullScreen = function(el) {
            return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
        }
        fullScreenApi.cancelFullScreen = function(el) {
            return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
        }
    }
    // jQuery plugin
    if (typeof jQuery != 'undefined') {
        jQuery.fn.requestFullScreen = function() {
            return this.each(function() {
                if (fullScreenApi.supportsFullScreen) {
                    fullScreenApi.requestFullScreen(this);
                }
            });
        };
    }
    window.fullScreenApi = fullScreenApi;
})();
