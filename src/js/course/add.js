/**
 * Created by Administrator on 2017/9/8.
 */
var asideJS = require("./../common/aside.js");
//�����
asideJS();
//ͷ��
var headerJS = require("./../common/header.js");
headerJS();


$("#send").on("click",function(){
   var courseName = $("#courseName").val();
   if(courseName!=""){
      $.ajax({
         url:"/v6/course/create",
         type:"post",
         //������post����get����data�ﴫ��ĸ�ʽ����&name=value
         data:"cs_name="+courseName,
         success:function(data){
            location.href = "/dist/html/course/course_edit_step1.html?cs_id="+data.result.cs_id;
         }
      })
   }
});

