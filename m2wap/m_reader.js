//===========头部热门搜索标签
function hotTag(){
    var url = '/e/extend/search_top/index.php';
    T.restGet(url, {}, function(data){
        var html="";
        var bgcolor=["42b5ff","0096ff","2775f7","0096ff","0096ff","42b5ff"];
        for(i=0;i<data.length;i++){
            html+='<li><a href="'+ data[i].url+'"';
            html+='style="background: #'+bgcolor[i]+'" href="searchResult.html">'+data[i].name+'</a></li>';
        }
        $("#HotTag").html(html);
    })

}

//返回上一页方法
function goBack(){
    if(document.referrer ==''|| document.referrer.indexOf(window.location.host) == -1){
        window.location = '/'
    }else{
        window.history.go(-1);
    }
}



//点击漫画详情页广告
function playAd(ad_url, posid, adid){

}



//点击漫画详情页广告
function playAdNoGo(posid, adid){
}


//当前漫画是否订阅
function isSubscribe(sub_id){
}
//alert(localStorage.readHistory)
//console.log(localStorage.readHistory);



/**
 * 取消订阅
 * @param subId  漫画id
 * @param subType 漫画类型 mh=0  dh=1 xs=2
 */
function unSubscribe(subId){
}
function subscribeRmove(subId){
}
function subscribeDel(subId){
}
//=====================取消订阅  end  ===========================//

//订阅已读
var update_read_status = function(subid){
};

/**
 * 推荐 换一批
 * @param obj
 * @param type_id
 */
function updateRecommends(type_id) {
    var url_suffix = '/e/extend/batch/index.php?typeid='+type_id;
    T.restGet(url_suffix, {}, function(data){
        var html = '';
        for (var i = 0; i < data.length; i++) {
            var comic = data[i];
            html += '<li><a class="ImgA autoHeight" href="' + comic['comic_url'] + '"><img src="' + comic['cover_pic'] + '" width="100%"/></a>' +
            '<a class="txtA">'+ comic['title'] +'</a>';

            if(comic['comic_author']) {
                html += '<span class="info">作者:' + comic['comic_author'] + '</span>'
            }
            if(comic['status'] == 1) {
                html += '<span class="wan"></span>';
            }

            html += '</li>';
        }

        $("#"+type_id).html(html);
    });
}

//==============================头部搜索 star====================//
function headSerch(obj){
    //屏蔽掉多次搜索

}
function success(data){}
function serchAction(){
    var keyword = $("#searInput").val();
    if(keyword!=""){
        location.href='/e/search/?searchget=1&show=title,writer&keyboard=' + keyword;
    }else{
        alert("请输入关键词");
    }
}

//==============================头部搜索 end====================//


//禁止uc浏览器左右滑屏
/*(function uctocu(){
    var control = navigator.control || {};
    if (control.gesture) {
        control.gesture(false);
    }
})();*/

