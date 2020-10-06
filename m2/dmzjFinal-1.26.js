pages = pages.replace(/::::::/g,"|");
var info = eval("(" + pages + ")");
var picArry = info['page_url'].split("|");
var pic_total = info['sum_pages'];

var next_charper = $(".next a").attr("href");
var img_prefix = '';


var prevChapter = $(".pre a").size()>0?'<a class="btm_chapter_btn fl" href="'+$(".pre a").attr("href")+'">上一章节</a>':'';
var nextChapter = $(".next a").size()>0?'<a class="btm_chapter_btn fr" href="'+$(".next a").attr("href")+'">下一章节</a>':'';
var app_html = '<div id="app_manhua" style="width:800px; height:10px; padding:20px; background:#fff; display:block;  margin:20px auto"></div>';

$(".comic_wraCon").after(app_html);

/*
if($.cookie('my')!=null){
    var userId = $.cookie('my').split("|")[0]
}
*/


//竖屏显示图片
function getImg(data){
    for(var i=0; i<data.length; i++){
        $(".comic_wraCon").append($('<a name="page='+(i+1)+'" id="page'+(i+1)+'" onclick="next_pic('+(i+1)+')"></a>')
                          .append($('<img data-original="'+data[i]+'"  onerror="this.src=\'/skin/m2/images/err.png\'">').lazyload({
                            placeholder : "/skin/m2/images/mh-last/lazyload.gif",
                            effect: "fadeIn",
                            threshold:2000
        })).append('<p class="mh_curr_page">'+parseInt(i+1)+'/'+pic_total+'</p>'));
    }
    $("#app_manhua").after('<div class="btmBtnBox">'+prevChapter+nextChapter+'</div>');
    historyCookie(comic_id,sns_sys_id.split("_")[1],1);
}

//getImg(picArry);

function next_pic(index){
    if(index<pic_total){
        location.href = '#page='+(parseInt(index)+1);
    }else{
        if($(".next a").size()>0){
            $(".show").show();
            $(".red_box").show();
        }else{
            openBoxOne();
        }
    }
}

function closeBoxTwo(){
    $(".show").hide();
    $(".red_box").hide();
}
$(".manag>a").click(function(){
    closeBoxTwo();
});

$(".lz_btn").click(function(){
    closeBoxTwo();
});

$(".next_btn").click(function(){
    closeBoxTwo();
    location=next_charper;
});


var img1=new Image();
var img2=new Image();

//横向显示图片
function getImg_land(data){
    if(document.location.hash==false){
        document.location.hash = '@page=1';
        var his_img = 1;
    }else{
        var his_img = document.location.hash.split("=")[1];
    }
    var img_src = img_prefix + data[his_img-1];
    var img = '<img name="page_1" src="'+img_src+'" onerror="this.src=\'/skin/m2/images/err.png\'" />';
    var select_option ='';
    for(var i=0; i<data.length; i++){
        select_option+='<option value="'+img_prefix+data[i]+'">第'+(i+1)+'页</option>';
    }
    var select_h = '<select name="select" id="page_select" onchange="select_page()">'+select_option+'</select>';
    $(".comic_wraCon").append(img);
    $(".comic_wraCon").append('<a class="img_land_prev" onclick="prev_img()"></a><a class="img_land_next" onclick="next_img()"></a>');
    $("#app_manhua").after('<div class="btmBtnBox">'+prevChapter+select_h+nextChapter+'</div>');
    $("#page_select option").eq(his_img-1).attr("selected","selected");
    if(picArry.length > 1) {
        img2.src = img_prefix + picArry[1];
    }
    historyCookie(comic_id,sns_sys_id.split("_")[1],his_img);
}


//getImg_land(picArry);


function prev_img(){
    var cur_img = decodeURI($(".comic_wraCon").find("img").attr("src"));
    for(var i=0; i<picArry.length;i++){
        var img_src = img_prefix+picArry[i];
        if(cur_img==img_src){
            var imgStr = '<img src="'+img_prefix+picArry[i-1]+'"/>';
            if(img_prefix+picArry[i-1]!="undefined"){
                $(".comic_wraCon").find("img").remove();
                $(".comic_wraCon").append(imgStr);
                curr_page=parseInt(i);
                historyCookie(comic_id,sns_sys_id.split("_")[1],curr_page);
                $(".comic_wraCon").find("img").load(function(){
                    if($.cookie('pic_style')==1){
                        if($(this).width()>$(window).width()){
                            $(this).css("width",$(window).width()-50+"px")
                        }
                    }
                });
                document.location.hash='@page='+(i);
                $("#page_select option").eq(i-1).attr("selected","selected");
                $("html,body").animate({
                    "scrollTop": $(".comic_wraCon").offset().top
                },0)
            }else{
                if($(".pre a").size()>0){
                    if(confirm("已经是此章节第1页了，要打开上一个章节吗？")==true){
                        location.href = $(".pre a").attr("href");
                    }
                }else{
                    alert("已经是第一个章节了!")
                }
            }
            break
        }
    }
}

function next_img(){
    var obj_img_src =decodeURI($(".comic_wraCon").find("img").attr("src"));
    for(var i=0; i<picArry.length;i++){
        var img_src = img_prefix+picArry[i];
        if(obj_img_src==img_src){
            var imgStr = '<img src="'+img_prefix+picArry[i+1]+'"/>';
            if(img_prefix+picArry[i+1]!="undefined"){
                $(".comic_wraCon").find("img").remove();
                $(".comic_wraCon").append(imgStr);
                curr_page=parseInt(i)+2;
                historyCookie(comic_id,sns_sys_id.split("_")[1],curr_page);
                $(".comic_wraCon").find("img").load(function(){
                    if($.cookie('pic_style')==1){
                        if($(this).width()>$(window).width()){
                            $(this).css("width",$(window).width()-50+"px")
                        }
                    }
                });
                document.location.hash='@page='+(i+2);
                if(img_prefix+picArry[i+2]!="/undefined") {
                    img1.src = img_prefix+picArry[i+2];
                }
                $("#page_select option").eq(i+1).attr("selected","selected");
                $("html,body").animate({
                    "scrollTop": $(".comic_wraCon").offset().top
                },0)
            }else{
                if($(".next a").size()>0){
                    $(".show").show();
                    $(".red_box").show();
                }else{
                    openBoxOne();
                }
            }
            break
        }
    }

}

function select_page(){
    var options=$("#page_select option:selected").val();
    var _index = $("#page_select option:selected").index()+1;
    $(".comic_wraCon").find("img").attr("src",options);
    $(".comic_wraCon").find("img").attr("name","page_"+(_index));
    curr_page =_index;
    historyCookie(comic_id,sns_sys_id.split("_")[1],curr_page);
    document.location.hash = '@page='+_index;
	//document.location.hash = '@page=988888';
    $("html,body").animate({
        "scrollTop": $(".comic_wraCon").offset().top
    },0)
}




var chapter_id = sns_sys_id.split("_")[1];
var defaul_page = window.location.hash.split("=")[1];


function historyCookie(comic_Id,chapter_id,curr_Page){
    if($.cookie('my') == null){
        return false
    }
    var cookieData = Date.parse(new Date()).toString().substr(0,10);
    if($.cookie("history_Cookie")==undefined){
        var item_obj = {};
        item_obj[comic_Id] = chapter_id;
        item_obj["comicId"] = comic_Id;//漫画id
        item_obj["chapterId"] = chapter_id;//话id
        item_obj["page"] = curr_Page;//第几页
        item_obj["time"] =cookieData//观看时间
        $.cookie("history_Cookie", JSON.stringify([item_obj]),{path:"/",expires: 99999});
    }else{
        var cookie_obj = $.parseJSON($.cookie("history_Cookie"));
        var exist = false;
        for(var i=0;i<cookie_obj.length;i++) {
            var obj = cookie_obj[i];
            if(obj[comic_Id]) {
                obj[comic_Id] = chapter_id;//漫画id
                obj["comicId"] = comic_Id;//漫画id
                obj["chapterId"] = chapter_id;//漫画id
                obj["page"] = curr_Page;//漫画页数
                obj["time"] = cookieData; //观看时间
                exist = true;
                break;
            }
        }
        if(!exist) {
            var item_obj = {};
            item_obj[comic_Id] = chapter_id;
            item_obj["comicId"] = comic_Id;//漫画id
            item_obj["chapterId"] = chapter_id;//漫画id
            item_obj["page"] = curr_Page;
            item_obj["time"] =cookieData;
            cookie_obj.push(item_obj);
        }
        $.cookie("history_Cookie", JSON.stringify(cookie_obj),{path:"/",expires: 99999});
    }

}

setInterval(function (){
    if($.cookie("history_Cookie")!=undefined){
        historyLog($.cookie("history_Cookie"));
    }
    $.cookie("history_Cookie", null,{path:"/"});
},30000);


if($.cookie('display_mode')==null || $.cookie('display_mode')==0){
    getImg_land(picArry);
    $.cookie('display_mode',0,{expires:999999,path:'/'});
    window.onhashchange=function(){
        var his_img = document.location.hash.split("=")[1];
        $(".comic_wraCon").find("img").attr("src",img_prefix+picArry[his_img-1]);
        $("#page_select option").eq(his_img-1).attr("selected","selected");
    };
    $("body").keydown(function(event) {
        if (event.keyCode == 37) {
            prev_img()
        } else if (event.keyCode == 39) {
            next_img()
        }
    });
    $("#mode_1").attr("checked","checked")
}else{
    getImg(picArry);
    $("body").keydown(function(event) {
        if (event.keyCode == 37) {
            if($(".pre a").size()>0){
                if(confirm("要打开上一个章节吗？")==true){
                    location.href = $(".pre a").attr("href");
                }
            }else{
                alert("已经是第一个章节了！")
            }
        } else if (event.keyCode == 39) {
            if($(".next a").size()>0){
                $(".show").show();
                $(".red_box").show();
            }else{
                openBoxOne();
            }
        }
    });
    $("#mode_2").attr("checked","checked")
}

if($.cookie('pic_style')==null || $.cookie('pic_style')==0){
    $.cookie('pic_style',0,{expires:999999,path:'/'});
    $("#sizeF").attr("checked","checked")
}else{
    $("#sizeT").attr("checked","checked");
    setWidth();
}

$(".comic_wraCon").width($(window).width());

window.onresize=function(){
    $(".comic_wraCon").width($(window).width())
};

function reset(){
    var size_c = $("input[name=size]:checked").val();
    var mode_c = $("input[name=mode]:checked").val();
    $.cookie('display_mode',mode_c,{expires:999999,path:'/'});
    $.cookie('pic_style',size_c,{expires:999999,path:'/'});
    location.reload();
}

/*设置图片自适应宽度*/
function setWidth(){
    $(".comic_wraCon img").load(function() {
        var w = $(window).width();//容器宽度
        $(".comic_wraCon img").each(function(){
            var img_w = $(this).width();//图片宽度
            var img_h = $(this).height();//图片高度
            if(img_w>w){//如果图片宽度超出容器宽度--要撑破了
                var height = (w*img_h)/img_w; //高度等比缩放
                $(this).css({"width":w-50,"height":height});//设置缩放后的宽度和高度
            }
        })
    });
}


if($(".btm_chapter_btn").size()==1){
    $(".btmBtnBox").css("width","256px")
}




function md5(string){
    function md5_RotateLeft(lValue, iShiftBits) {
        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }
    function md5_AddUnsigned(lX,lY){
        var lX4,lY4,lX8,lY8,lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
    function md5_F(x,y,z){
        return (x & y) | ((~x) & z);
    }
    function md5_G(x,y,z){
        return (x & z) | (y & (~z));
    }
    function md5_H(x,y,z){
        return (x ^ y ^ z);
    }
    function md5_I(x,y,z){
        return (y ^ (x | (~z)));
    }
    function md5_FF(a,b,c,d,x,s,ac){
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_GG(a,b,c,d,x,s,ac){
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_HH(a,b,c,d,x,s,ac){
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_II(a,b,c,d,x,s,ac){
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1=lMessageLength + 8;
        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
        var lWordArray=Array(lNumberOfWords-1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while ( lByteCount < lMessageLength ) {
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
        return lWordArray;
    };
    function md5_WordToHex(lValue){
        var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
        for(lCount = 0;lCount<=3;lCount++){
            lByte = (lValue>>>(lCount*8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
        }
        return WordToHexValue;
    };
    function md5_Utf8Encode(string){
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;
    string = md5_Utf8Encode(string);
    x = md5_ConvertToWordArray(string);
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
    for (k=0;k<x.length;k+=16) {
        AA=a; BB=b; CC=c; DD=d;
        a=md5_FF(a,b,c,d,x[k+0], S11,0xD76AA478);
        d=md5_FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
        c=md5_FF(c,d,a,b,x[k+2], S13,0x242070DB);
        b=md5_FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
        a=md5_FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
        d=md5_FF(d,a,b,c,x[k+5], S12,0x4787C62A);
        c=md5_FF(c,d,a,b,x[k+6], S13,0xA8304613);
        b=md5_FF(b,c,d,a,x[k+7], S14,0xFD469501);
        a=md5_FF(a,b,c,d,x[k+8], S11,0x698098D8);
        d=md5_FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
        c=md5_FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
        b=md5_FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
        a=md5_FF(a,b,c,d,x[k+12],S11,0x6B901122);
        d=md5_FF(d,a,b,c,x[k+13],S12,0xFD987193);
        c=md5_FF(c,d,a,b,x[k+14],S13,0xA679438E);
        b=md5_FF(b,c,d,a,x[k+15],S14,0x49B40821);
        a=md5_GG(a,b,c,d,x[k+1], S21,0xF61E2562);
        d=md5_GG(d,a,b,c,x[k+6], S22,0xC040B340);
        c=md5_GG(c,d,a,b,x[k+11],S23,0x265E5A51);
        b=md5_GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
        a=md5_GG(a,b,c,d,x[k+5], S21,0xD62F105D);
        d=md5_GG(d,a,b,c,x[k+10],S22,0x2441453);
        c=md5_GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
        b=md5_GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
        a=md5_GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
        d=md5_GG(d,a,b,c,x[k+14],S22,0xC33707D6);
        c=md5_GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
        b=md5_GG(b,c,d,a,x[k+8], S24,0x455A14ED);
        a=md5_GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
        d=md5_GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
        c=md5_GG(c,d,a,b,x[k+7], S23,0x676F02D9);
        b=md5_GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
        a=md5_HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
        d=md5_HH(d,a,b,c,x[k+8], S32,0x8771F681);
        c=md5_HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
        b=md5_HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
        a=md5_HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
        d=md5_HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
        c=md5_HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
        b=md5_HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
        a=md5_HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
        d=md5_HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
        c=md5_HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
        b=md5_HH(b,c,d,a,x[k+6], S34,0x4881D05);
        a=md5_HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
        d=md5_HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
        c=md5_HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
        b=md5_HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
        a=md5_II(a,b,c,d,x[k+0], S41,0xF4292244);
        d=md5_II(d,a,b,c,x[k+7], S42,0x432AFF97);
        c=md5_II(c,d,a,b,x[k+14],S43,0xAB9423A7);
        b=md5_II(b,c,d,a,x[k+5], S44,0xFC93A039);
        a=md5_II(a,b,c,d,x[k+12],S41,0x655B59C3);
        d=md5_II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
        c=md5_II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
        b=md5_II(b,c,d,a,x[k+1], S44,0x85845DD1);
        a=md5_II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
        d=md5_II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
        c=md5_II(c,d,a,b,x[k+6], S43,0xA3014314);
        b=md5_II(b,c,d,a,x[k+13],S44,0x4E0811A1);
        a=md5_II(a,b,c,d,x[k+4], S41,0xF7537E82);
        d=md5_II(d,a,b,c,x[k+11],S42,0xBD3AF235);
        c=md5_II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
        b=md5_II(b,c,d,a,x[k+9], S44,0xEB86D391);
        a=md5_AddUnsigned(a,AA);
        b=md5_AddUnsigned(b,BB);
        c=md5_AddUnsigned(c,CC);
        d=md5_AddUnsigned(d,DD);
    }
    return (md5_WordToHex(a)+md5_WordToHex(b)+md5_WordToHex(c)+md5_WordToHex(d)).toLowerCase();
}
