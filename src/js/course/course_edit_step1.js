/**
 * Created by Administrator on 2017/9/8.
 */
var asideJS = require("./../common/aside.js");
//�����
asideJS();
//ͷ��
var headerJS = require("./../common/header.js");
headerJS();

//��ȡ��URL����
var util = require("./../common/util.js");
var cs_id = util("cs_id");

//��ʾ�γ̻�����Ϣ
$.ajax({
   url:"/v6/course/basic",
   type:"get",
   data:"cs_id="+cs_id,
   success:function(data){
      //����ժҪģ��
      $(".brief").html(template("course-brief",data.result));
      //���������Ϣģ��
      $("#tpl_2").html(template("course-set",data.result));
      //���Ŷ���������



      //ʵ�ֿ����ύ���ݸ��¿γ̻�����Ϣ
      $("#send").on("click",function(){
         console.log(123);
         var formdata = $("#courseMessage").serialize();

         $.ajax({
            url:"/v6/course/update/basic",
            type:"post",
            data:formdata,
            success:function(data){
               location.href = "/dist/html/course/course_edit_step2.html?cs_id="+cs_id;
            }
         })
      });
   }
});





