$(function(){
$(".close_code").click(function(){
    $(this).parent().hide();
    $.cookie("code_show",0,{path:'/', expires: 0.45 });
});

if($.cookie("code_show")==null){
    $("#floatCode").show();
}else{
    $("#floatCode").hide();
}

$(".ad_code_close").click(function(){
        $(".ad_bottom_code").hide();
})

})
