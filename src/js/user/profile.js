/**
 * Created by Administrator on 2017/9/8.
 */
var asideJS = require("../common/aside.js");
var header = require("../common/header.js");
//侧边栏
asideJS();
//头部
var headerJS = require("../common/header.js");
headerJS();




$.ajax({
   url:'/v6/teacher/profile',
   type:'get',
   success:function(data){
      if(data.code==200){
         var html = template("teacher-profile",data.result);
         $(".teacher-profile").html(html);

            //添加图片信息
          $("#upfile").on("change",function(){
              var fi = this.files[0];
              var read = new FileReader();

              var temp = read.readAsDataURL(fi);

              read.onload = function(){
                  $.ajax({
                      url:"/v6/uploader/avatar",
                      type:"post",
                      data:this.result,
                      success:function(data){
                          $("#head").attr("src",data.result.path);
                      }
                  });
              }
          });

      }

   }
});


$("#profile").ajaxForm({
    delegation: true,
    success:function(data){
        location.href = "/dist/html/teacher/list.html";
    }
});




