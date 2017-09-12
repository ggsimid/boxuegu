/**
 * Created by Administrator on 2017/9/8.
 */
var asideJS = require("./../common/aside.js");
//侧边栏
asideJS();
//头部
var headerJS = require("./../common/header.js");
headerJS();


$(".teacher-add form").on("submit",function(){

    var key = $('form').serialize();
    $.ajax({
        //   v6/teacher/add  || /v6/teacher/add  是2个不同的东西。
        url:"/v6/teacher/add",
        type:"post",
        data:key,
        success:function(data){
            if(data.code==200){
                location.href = "/dist/html/teacher/list.html";
            }
        }
    });
    return false;
});

//添加之后应该跳转到teacherlist页面