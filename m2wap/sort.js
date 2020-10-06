var firstcharpetId ="";
var firstComicId ="";
var firstCharpetName = "" ;
var jsonData = '';
var sort = {
    //是否已经展开
    expanded:[],

    currSortType:'',
    needReverse:false,

    desc:function(json) {
        var def_chap = json.lastObject()['data'].lastObject().id;
        var def_comicId = json.lastObject()['data'].lastObject().comic_id;
        var def_charpetName = json.lastObject()['data'].lastObject().chapter_name;
        var comicId =json[0]['data'][0].comic_id;
        firstcharpetId = def_chap;
        firstComicId = def_comicId;
        firstCharpetName = def_charpetName;
        m_global.comicId = comicId;
        $(".asc").removeClass("cur");
        $(".desc").addClass("cur");

        var htmlStr = getRowDivHtmlStr(json, 'desc');
        if(htmlStr) {
            $("#list").html(htmlStr);
        }
        //m_global.character("Drama li span",5);
    },

    asc:function(json){

        $(".asc").addClass("cur");
        $(".desc").removeClass("cur");

        var htmlStr = getRowDivHtmlStr(json, 'asc');
        if(htmlStr) {
            $("#list").html(htmlStr);
        }
        //m_global.character("Drama li span",5);
    },

    expand:function(obj, index){
        sort.expanded[index] = 1;

        var tmpBool = sort.needReverse;
        sort.needReverse = false;

        var htmlStr = '';
        for (var i = 0; i < jsonData.length; i++) {
            var itemData = jsonData[i];
            htmlStr += getChaptersHtmlStr(itemData, i);
        }
        if(htmlStr) {
            $("#list").html(htmlStr);
        }
        //m_global.character("Drama li span",5);
        sort.needReverse = tmpBool;
    }
};

/**
 * 获取一类章节的div容器html字符串
 * @param jsonStr
 * @param sortType
 * @returns {*}
 */
function getRowDivHtmlStr(jsonStr, sortType) {
    if(sort.currSortType == sortType) {
        return false;
    }

    var htmlStr = '';
	
    for (var i = 0; i < jsonStr.length; i++) {
        var itemData = jsonStr[i];
        htmlStr += getChaptersHtmlStr(itemData, i);
    }

    sort.currSortType = sortType;
    sort.needReverse = true;

    return htmlStr;
}

/**
 * 获取分类下所有章节的html字符串
 * @param itemObj
 * @param rowIndex
 * @returns {string}
 */
function getChaptersHtmlStr(itemObj, rowIndex) {

    var htmlStr = '<div class="qjBar">';

    htmlStr += itemObj.title;
    htmlStr += '<span>' + itemObj.data.length + '个章节</span>';
    htmlStr += '</div>';

    htmlStr += '<ul class="Drama autoHeight">';
    var itemArr = itemObj.data;
    if(sort.needReverse){
        itemArr.reverse();
    }
    var maybeShowAddButton = itemArr.length > 11;

    //还未展开
    var isExpanded = sort.expanded[rowIndex];
    if(!isExpanded) {
        itemArr = itemArr.slice(0, 11);
    }
    for (var i = 0; i < itemArr.length; i++) {
        htmlStr += getChapterHtmlStr(itemArr[i]);
    }

    if(!isExpanded && maybeShowAddButton) {
        htmlStr += '<li class="add" onclick="sort.expand($(this),' + rowIndex + ')">...</li>';
    }
    htmlStr += '</ul></div>';

    return htmlStr;
}

//记录kookie
function chapterCookie(comicId,chapterId,kookiepage,charpetName,cover,title){
    var cookieData = new Date();
    var imgSrc;
    if($("#Cover").length>0){
        imgSrc = $("#Cover img").attr("src");
    }else{
        imgSrc = cover
    }
    var comicName;
    if($("#comicName").length>0){
        comicName = $("#comicName").text();
    }else{
        comicName = title;
    }

    if(localStorage.readHistory==undefined){
        var item_obj = {};
        item_obj[comicId] = chapterId;
        item_obj["comicId"] = comicId;//漫画id
        item_obj["chapterId"] = chapterId;//话id
        item_obj["comicName"] = comicName;//漫画名字
        item_obj["charpetName"] = charpetName;//话名字
        item_obj["cover"] = imgSrc;//漫画封面
        item_obj["page"] = kookiepage;//第几页
        item_obj["time"] =cookieData.Format('yyyy-MM-dd');//观看时间
        //$.cookie("read-history", JSON.stringify([item_obj]),{path:"/",expires: 99999});
        localStorage.readHistory = JSON.stringify([item_obj]);
    }else{
        var cookie_obj = $.parseJSON(localStorage.readHistory);
        var exist = false;
        for(var i=0;i<cookie_obj.length;i++) {
            var obj = cookie_obj[i];
            if(obj[comicId]) {
                obj[comicId] = chapterId;//漫画id
                obj["comicId"] = comicId;//漫画id
                obj["chapterId"] = chapterId;//漫画id
                obj["page"] = kookiepage;//漫画页数
                obj["charpetName"] = charpetName;//漫画标题
                obj["time"] = cookieData.Format('yyyy-MM-dd');//观看时间
                exist = true;
                break;
            }
        }
        if(!exist) {
            var item_obj = {};
            item_obj[comicId] = chapterId;
            item_obj["comicId"] = comicId;//漫画id
            item_obj["chapterId"] = chapterId;//漫画id
            item_obj["cover"] = imgSrc;//漫画封面
            item_obj["comicName"] = comicName;//漫画标题
            item_obj["charpetName"] = charpetName;
            item_obj["page"] = kookiepage;
            item_obj["time"] =cookieData.Format('yyyy-MM-dd');
            cookie_obj.push(item_obj);
        }
        //$.cookie("read-history", JSON.stringify(cookie_obj),{path:"/",expires: 99999});
        localStorage.readHistory = JSON.stringify(cookie_obj);
    }
}


/*
    *是否有记录
    *继续观看
*/

function isRead(){
    /*$.ajax({
        type: "get",
        url: "/introduction/watchState",
        data: "id=" + firstComicId,
        async:true,
        datatype :jsonData,
        success: function (data) {
            if(data.isVisited==0){
                $("#continusRead").html("开始观看");
                $("#continusRead").attr("href","/view/"+firstComicId+"/"+firstcharpetId+".html");
            }else{
                $("#continusRead").html("继续观看");
                $("#continusRead").attr("href","/view/"+data.current.comic_id+"/"+data.current.chapter_id+".html")
            }
        }
    });*/
    if(localStorage.readHistory) {
        var cookie_obj = $.parseJSON(localStorage.readHistory);
		var islook=false;
        for(var i=0;i<cookie_obj.length;i++){
            var key = cookie_obj[i]['comicId'];
            if(key==firstComicId){
				$("#continusRead").html("继续观看");
                $("#continusRead").attr("href","/cartoon4/"+cookie_obj[i].chapterId+"-0.html")
				 islook=true;
				 break;
            }
        }
		if(!islook)
		{
            $("#continusRead").html("开始观看");
            $("#continusRead").attr("href","/cartoon4/"+firstcharpetId+"-0.html");
			
		}
    }
	else
	{
            $("#continusRead").html("开始观看");
            $("#continusRead").attr("href","/cartoon4/"+firstcharpetId+"-0.html");
		
	}
}

/**
 * 根据chapter数据结构返回对应的html字符串
 * @param chapter
 * @returns {string}
 */
/*' + url + '*/
function getChapterHtmlStr(chapter) {
    var url = chapter.titleurl;
    var cookieId=[chapter.comic_id,chapter.id];
    var htmlStr = '<li><a href="' + url + '" onclick="chapterCookie('
                   +chapter.comic_id+','+chapter.id+',1,\''
                   +chapter.chapter_name+'\')"><span>';
    htmlStr += chapter.chapter_name;
    htmlStr += '</a></span>';

    var date1 = new Date(chapter.last_updatetime * 1000);
    var date2 = new Date();
    if (date1.Format('yyyy-MM-dd') == date2.Format('yyyy-MM-dd')) {
        htmlStr += '<p class="new">NEW</p>';
    }

    htmlStr += '</li>';

    return htmlStr;
}



//初始化
function initIntroData (json) {
    jsonData = json;
    sort.desc(json);
/*    isRead();
    UserCookie();
    if(m_global.isLogin){
        isSubscribe(firstComicId);
    }*/

}


$(function(){
    //m_global.character("Drama li span",5);
    m_global.character("introName",8);
    //m_global.character("BarTit",10);
    //显示全部
    var cur_status = "less";
    var charNumbers = $(".txtDesc").text().length; //总字数
    var limit = 50; //显示字数
    if (charNumbers > limit) {
        var orgText = $(".txtDesc").text(); //原始文本
        var orgHeight = $(".txtDesc").height(); //原始高度
        var showText = orgText.substring(0, limit)+'...'; //最终显示的文本
        $(".txtDesc").html(showText);
        var contentHeight = $(".txtDesc").height(); //截取内容后的高度
        $(".openBtn,.txtDesc").click(function() {
            if (cur_status == "less") {
                $(".txtDesc").height(contentHeight).text(orgText).animate({
                    height: orgHeight
                });
                $(".openBtn").addClass('openBtnC');
                cur_status = "more";
            } else {
                $(".txtDesc").height(orgHeight).text(showText).animate({
                    height: contentHeight
                });
                $(".openBtn").removeClass('openBtnC');
                cur_status = "less";
            }
        });
    } else {
        $(".openBtn").css("background","#fff").css("height","10px");
    }

});

