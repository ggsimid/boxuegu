/**
 * Created by Administrator on 2017/9/10.
 */
//var b = 0;
//module.exports=function(){
//    console.log(b);
//};通过方法可以调用。


//因为这属于分离出公共模块的对应的JS代码。
module.exports=function(){
    //设置头部
    var result = localStorage.getItem("key");
    result = JSON.parse(result);
    $(".aside  .profile  img").attr("src",result.result.tc_avatar);
    $(".aside .profile p").html(result.result.tc_name);
    //设置下拉事件
    $(".drowT").on("click",function(){
        $(this).next().slideToggle("slow");
    })
    //焦点事件
    var path = location.pathname;
    console.log(path);
    $(".navs a").removeClass("active");
    $('.navs a[href="'+path+'"]').addClass("active").parents('ul').show()
};

