/**
 * Created by Administrator on 2017/9/8.
 */
$("#send").on("click",function(){

    var new_pass = $("#new_pass").val();
    var sure_pass = $("#sure_pass").val();
    console.log(new_pass,sure_pass);
    if(new_pass !== sure_pass){
        console.log("确认密码2次输入正确！");
        return false;
        //可以阻止默认事件和后面的代码执行。
    }

    $("#cpass").ajaxForm({
        delegation: true,
        success:function(data){
            console.log(data.msg);
        }
    });

});







