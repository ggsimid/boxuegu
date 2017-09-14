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

      //优化：下面3个部分传输的数据都是一样的，并且位置都连着一起，所以可以合并成同一个模板！！但是如果位置不是连一起就不可以。
      //上面摘要模板
      $(".brief").html(template("course-brief",data.result));

      //侧边栏模板,在生成模板时添加一个值，给予标识是第几页，然后模板根据这个值去设置样式！！
      data.result.page = 1;
      $("#course_edit_aside").html(template("course-edit-aside",data.result));


      //基本信息模板
      $("#tpl_2").html(template("course-set",data.result));


      //二级联动模板设置需要（模板嵌套模板，需要注意的：模板生成的顺序不能调转。）
      $("#select_2").html(template("course-set-secend",data.result.category.childs));

      $("#select_2 option").each(function(index,value){
         //console.log(value,$(value));
         //注意点：JQ的each方法的value是一个DOM对象
         //要主要JQ的返回值是个JQ对象，要获取值就用变量存储起来。
         //模板嵌套可以模板，不存在于模板还没有生成，然后获取对象引发错误
         re=$(value).val();
         if(re==data.result.cs_cg_id){
            value.selected = "selected";
         }
      });

      //二级联动事件注册
      $("#select_1").on("change",function(){
         var vs = $("#select_1 option:selected").val();
         $.ajax({
            url:"/v6/category/child",
            type:"get",
            data:"cg_id="+vs,
            success:function(data){
               $("#select_2").html(template("course-set-secend",data.result));
            }
         });
      });


      //实现可以提交数据更新课程基本信息
      $("#send").on("click",function(){

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





