/*搜索下拉框弹出*/

/*导航条加样式*/
function addNav(menu){
    if(menu!=null){
        $(".nav-"+menu).addClass("cur");
    }
}
function setCookie(val){
    if($.cookie("history")==null){
        $.cookie("history");
        $.cookie("history",val,{path:'/'});
    }else{
        var histy_cookie = $.cookie("history");
        var hisinfo = histy_cookie.split("|");
        if(hisinfo.length==12){
            var verifyHistory = $.inArray(val, hisinfo);
            if(verifyHistory =="-1"){
                hisinfo.splice(0,1);
                hisinfo.push(val);
            }
            var strhis = hisinfo.join("|");
            $.cookie("history",strhis,{path:'/'});
        }else{
            var verifyHistory = $.inArray(val, hisinfo);
            if(verifyHistory =="-1"){
                hisinfo.push(val);
            }
            var strhis = hisinfo.join("|");
            $.cookie("history",strhis,{path:'/'});
        }
    }
}
function getHistory(url){
    if($.cookie("history")!=null){
        var histy_cookie = $.cookie("history");
        var hisinfo = histy_cookie.split("|");
        for(var i=0;i<hisinfo.length;i++){
            var his = hisinfo[i];
            var newhistory =his.replace("/","|");
            $(".srear_r_histo_con").append('<li><span class="tip"></span><a title="'+hisinfo[i]+'" href="'+url+'/'+newhistory+'/1">'+hisinfo[i]+'</a></li>')
        }
    }
}

//$("#searBtn").click(function(){
//    var keyword = $("#searInput").val();
//    setCookie(keyword);
//});

$(function(){
/*setInterval()*/
        $(".tab-option").tabChange();//tab切换


    /*侧边栏回到顶部*/
    $(window).scroll(function(){
        var scrollH = $(document).scrollTop();
        var sidePublic=$("#sidePublic");

        if(scrollH>100){
            sidePublic.fadeIn(1500);
        }else{
            sidePublic.fadeOut(1500);
        }
    });

    $("#returnTop").click(function(){
        $('body,html').animate({scrollTop:0},500);
        return false;
    });

    //点击清空输入框
    $("#searInput").focus(function(){
        if($(this).val()=="请输入关键字"){
            $(this).val("");
        }
    });
    $("#searInput").blur(function(){
        if($(this).val()==""){
            $(this).val("请输入关键字");
            $(this).css("color","#999");
        }
    });

   $("#account").focus(function(){
        if($(this).val()=="昵称/电子邮箱"){
            $(this).val("");
        }
    });
    $("#account").blur(function(){
        if($(this).val()==""){
            $(this).val("昵称/电子邮箱");
        }
    });

    $("#password").focus(function(){
        if($(this).val()=="密码"){
            $(this).val("");
        }
    });

    $("#password").blur(function(){
        if($(this).val()==""){
            $(this).val("密码");
        }
    });

    $("#vcode").focus(function(){
        if($(this).val()=="验证码"){
            $(this).val("");
        }
    });

    $("#vcode").blur(function(){
        if($(this).val()==""){
            $(this).val("验证码");
        }
    });

    $("form").submit(function(e){
        if($("#searInput").val()==''||$("#searInput").val()=="请输入关键字"){
            e.preventDefault();
        }
    });


});

/*插件*/
(function($){//tab切换插件
    var defaults = {
        tabOptioned : "tab-option-selected",//tab-li-a切换class
        tabContent : "div.tab-content",    //tab内容class
        tabContented : "tab-content-selected", //tab内容被选class
        cont : "搜索"
    };
    $.fn.tabChange = function(options){
        var options = $.extend(defaults, options); //各种属性、参数
        return  $(this).each(function(){
//插件实现代码
            $(this).mousemove(function(e){
                e.preventDefault();
                $(this).addClass(options.tabOptioned).parent().siblings('li').find("a").removeClass(options.tabOptioned);
                var aHref = $(this).attr("href");
                $(this).parent().siblings("a.more").attr("href",aHref);
                var nIndex=$(this).parent().index();
                $(this).parent().parent().siblings(options.tabContent).removeClass(options.tabContented).eq(nIndex).addClass(options.tabContented);
            });
            $(this).click(function(e){
                e.preventDefault();
            })
        });
    };
})(jQuery);


