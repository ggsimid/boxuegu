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


//定义转图片格式方法
function convertBase64UrlToBlob(urlData, filetype){
    //去掉url的头，并转换为byte
    var bytes = window.atob(urlData.split(',')[1]);

    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    var i;
    for (i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], {type : filetype});
}



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

              var filename = fi.name || '';
              var fileType = fi.type || '';
              console.log(filename,fileType);

              var read = new FileReader();
              read.readAsDataURL(fi);
              read.onload = function(e){
                  var base64 = e.target.result || this.result;
                  var formData = new FormData();

                  formData.append("tc_avatar", convertBase64UrlToBlob(base64, fileType), filename);

                  $.ajax({
                      url:"/v6/uploader/avatar",
                      type:"post",
                      data:formData,
                      success:function(data){
                          $("#head").attr("src",data.result.path);
                      },
                      processData: false,  // 不处理数据
                      contentType: false   // 不设置Content-Type内容类型
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



