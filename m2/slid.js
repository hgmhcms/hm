;(function($){
    var defaults = {
        page : 1,//初始图片个数
        i : 4,//每个容器里面图片个数
        clickRId :$(".right") ,
        clickLId :$(".left"),
        liId:$(".bcur li"),
        step :-10,
        time:500,
        move_time:4000,
        container:$("#outer"),//外框ID
        holder:$("#inner"),//内容器id
        page1 : 1,//初始图片个数
        i1 : 4,//每个容器里面图片个数
        clickRId1 :$(".right") ,
        clickLId1 :$(".left"),
        liId1:$(".bcur li"),
        step1 :-10,
        time1:500,
        move_time1:4000,
        container1:$("#outer"),//外框ID
        holder1:$("#inner")//内容器id
    };
    /*头图焦点图*/
    $.slideChartRight=function(options){
        var options = $.extend(defaults, options);//各种属性、参数
        var innerW = options.holder.width(),
            nLi = options.holder.find("li").length,
            page_count = Math.ceil(nLi / options.i),
            outerW = options.container.width()+options.step;
        options.clickRId.click(moveRight);//点击右键向右

        function moveRight(){

            if(!options.holder.is(":animated")){
                if (options.page == page_count) {
                    options.holder.animate({left: "0px"}, options. time);
                    options.page = 1;
                } else {
                    options.holder.animate({left: "-=" + outerW}, options. time);
                    options.page++;
                }
                options.liId.eq(options.page-1).addClass("cur").siblings().removeClass("cur");
            }
        }
        var timer =setInterval(moveRight,options.move_time);//自动轮播
        options.container.hover(function(){//鼠标滑过停止轮播
            clearInterval(timer);
        },function(){
            timer =setInterval(moveRight,options.move_time);//自动轮播
        });
        options.clickLId.click(moveLeft);//点击左键向左
        function moveLeft(){
            if(!options.holder.is(":animated")){
                if (options.page == 1) {
                    options.holder.animate({left: "-=" + outerW*(page_count-1)+"px"}, options. time);
                    options.page = page_count;
                } else {
                    options.holder.animate({left: "+=" + outerW}, options. time);
                    options. page--;
                }
                options.liId.eq(options.page-1).addClass("cur").siblings().removeClass("cur");
            }
        }
        options.liId.each(function(){//点击相应按钮到达相应图片位置
            $(this).click(function(){
                $(this).addClass("cur").siblings().removeClass("cur");
                var nIndex = $(this).index();
                if(!options.holder.is(":animated")) {
                    options.holder.animate({left: "-" + outerW*nIndex}, options.time);
                    options.page=nIndex+1;
                }
            })
        })

    };

    /*内容推荐图*/
    $.slideRight=function(options){
        var options = $.extend(defaults, options);//各种属性、参数
        var innerW = options.holder1.width(),
            nLi = options.holder1.find("li").length,
            page_count = Math.ceil(nLi / options.i1),
            outerW = options.container1.width()+options.step1;
        options.clickRId1.click(moveRight1);//点击右键向右
        function moveRight1(){
            if(!options.holder1.is(":animated")){
                if (options.page1 == page_count) {
                    options.holder1.animate({left: "0px"}, options. time1);
                    options.page1 = 1;
                } else {
                    options.holder1.animate({left: "-=" + outerW}, options. time1);
                    options.page1++;
                }
                options.liId1.eq(options.page1-1).addClass("cur").siblings().removeClass("cur");
            }
        }
        var timer =setInterval(moveRight1,options.move_time1);//自动轮播
        options.container1.hover(function(){//鼠标滑过停止轮播
            clearInterval(timer);
        },function(){
            timer =setInterval(moveRight1,options.move_time1);//自动轮播
        });
        options.clickLId.click(moveLeft1);//点击左键向左
        function moveLeft1(){
            if(!options.holder1.is(":animated")){
                if (options.page1 == 1) {
                    options.holder1.animate({left: "-=" + outerW*(page_count-1)+"px"}, options. time1);
                    options.page1 = page_count;
                } else {
                    options.holder1.animate({left: "+=" + outerW}, options. time1);
                    options. page1--;
                }
                options.liId1.eq(options.page1-1).addClass("cur").siblings().removeClass("cur");
            }
        }
        options.liId1.each(function(){//点击相应按钮到达相应图片位置
            $(this).click(function(){
                $(this).addClass("cur").siblings().removeClass("cur");
                var nIndex = $(this).index();
                if(!options.holder1.is(":animated")) {
                    options.holder1.animate({left: "-" + outerW*nIndex}, options.time1);
                    options.page1=nIndex+1;
                }
            })
        })

    };
//插件实现代码

})(jQuery);




