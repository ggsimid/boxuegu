/**
 * Created by Administrator on 2017/9/8.
 */
var asideJS = require("../common/aside.js");
var header = require("../common/header.js");
//�����
asideJS();
//ͷ��
var headerJS = require("../common/header.js");
headerJS();


//����תͼƬ��ʽ����
function convertBase64UrlToBlob(urlData, filetype){
    //ȥ��url��ͷ����ת��Ϊbyte
    var bytes = window.atob(urlData.split(',')[1]);

    //�����쳣,��ascii��С��0��ת��Ϊ����0
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

            //���ͼƬ��Ϣ
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
                      processData: false,  // ����������
                      contentType: false   // ������Content-Type��������
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



