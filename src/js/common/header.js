/**
 * Created by Administrator on 2017/9/10.
 */
module.exports=function(){
    //设置头部
    $("#exit").on("click",function(){
        $.ajax({
            //反向代理后，发送请求就应该，把后台的网站替换成当前服务器的网站。就是:www.phpstudy.boxuegu_11
            url:"/v6/logout",
            type:'post',
            success:function(){
                location.href = "/dist/html/user/login.html";
            }
        })
    });
};