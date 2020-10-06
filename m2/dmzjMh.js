/*ԭվ��ҳJS*/
/*ͷͼ�л�*/
$.slideChartRight( {
    page : 1,
    i : 1,
    clickRId :$(".bann_right") ,
    clickLId :$(".bann_left"),
    step :0,
    time:500,
    move_time:4000,
    container:$("#outer"),//���ID
    holder:$("#inner")//������id
});
$("#outer").hover(function(){
    $(this).children(".bann_left").show();
    $(this).children(".bann_right").show();
},function(){
    $(this).children(".bann_left").hide();
    $(this).children(".bann_right").hide();
});
/*����Ԥ���л�*/
$(function(){
    var i=0;//��ʼ��¼�û���꾭���ǵڼ���li
    var canmove=true;
    $('.update_ann_tabs li a').mouseenter(function(){
        canmove=false;
        clearInterval(li_timer);
        i=$(this).parent().index();
        $(this).addClass('tab-option-slid-selected').parent().siblings('li').find("a").removeClass(' tab-option-slid-selected');
        $('.tab-con-slid').hide();
        $('.tab-con-slid').eq(i).show();
    });

    $("#updateTabs").mouseenter(function(){//ֻҪ�û���������tab1�����ڣ��Ͳ��Զ���ת
        canmove=false;
    }).mouseleave(function(){
        clearInterval(li_timer);
        setTimeout(function(){canmove=true;},10000);//������Զ��л�
    });
    function li_timer(){
        if(canmove){
            i++;
            if(i==$('.update_ann_tabs li').length){
                i=0;
            }
            $('.update_ann_tabs li').eq(i).find(".tab-option-slid").addClass('tab-option-slid-selected').parent().siblings('li').find("a").removeClass('tab-option-slid-selected');
            $('.tab-con-slid').hide();
            $('.tab-con-slid').eq(i).show();
        }

    }
    setInterval(li_timer,10000);//ÿ�����л�
});

$(".bann_left").hover(function(){
    $(this).css("background","url(/skin/m2/images/mh_main/banner_leftarrow.png) no-repeat");
},function(){
    $(this).css("background","url(/skin/m2/images/mh_main/banner_unleftarrow.png) no-repeat");
});
$(".bann_right").hover(function(){
    $(this).css("background","url(/skin/m2/images/mh_main/banner_rightarrow.png) no-repeat");
},function(){
    $(this).css("background","url(/skin/m2/images/mh_main/banner_unrightarrow.png) no-repeat");
});


