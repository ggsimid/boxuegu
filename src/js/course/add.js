/**
 * Created by Administrator on 2017/9/8.
 */
var asideJS = require("./../common/aside.js");
//侧边栏
asideJS();
//头部
var headerJS = require("./../common/header.js");
headerJS();


$("#send").on("click",function(){
   var courseName = $("#courseName").val();
   if(courseName!=""){
      $.ajax({
         url:"/v6/course/create",
         type:"post",
         //不管是post还是get，在data里传输的格式都是&name=value
         data:"cs_name="+courseName,
         success:function(data){
            location.href = "/dist/html/course/course_edit_step1.html?cs_id="+data.result.cs_id;
         }
      })
   }
});

