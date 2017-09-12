/**
 * Created by Administrator on 2017/9/8.
 */
var asideJS = require("./../common/aside.js");
//侧边栏
asideJS();
//头部
var headerJS = require("./../common/header.js");
headerJS();

//获取到URL参数
var util = require("./../common/util.js");
var cs_id = util("cs_id");

//显示课程基本信息
$.ajax({
   url:"/v6/course/basic",
   type:"get",
   data:"cs_id="+cs_id,
   success:function(data){
      //上面摘要模板
      $(".brief").html(template("course-brief",data.result));
      //下面基本信息模板
      $("#tpl_2").html(template("course-set",data.result));
      //留着二级联动坑



      //实现可以提交数据更新课程基本信息
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





