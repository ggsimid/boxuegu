/**
 * Created by Administrator on 2017/9/8.
 */

var asideJS = require("./../common/aside.js");
//侧边栏
asideJS();
//头部
var headerJS = require("./../common/header.js");
headerJS();


$("#editTeacher").on("click",function(){

    var t =  $(this).parent().parent().children()[0].innerHTML;
    $.ajax({
        url:"/v6/teacher/edit?",
        type:"get",
        data:"tc_id="+t,
        success:function(data){
            if(data.code==200){

                var result = data.result;
                localStorage.setItem('teacher',JSON.stringify(result));
                location.href="/dist/html/teacher/edit.html";
            }
        },
        error:function(){
            console.log("erwerfwer");
            alert(12312);
        }
    });


});

