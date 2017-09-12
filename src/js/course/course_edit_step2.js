/**
 * Created by Administrator on 2017/9/8.
 */
var asideJS = require("./../common/aside.js");
//侧边栏
asideJS();
//头部
var headerJS = require("./../common/header.js");
headerJS();

var util = require("./../common/util.js");
var cs_id = util("cs_id");


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






//显示课程基本信息
$.ajax({
    url:"/v6/course/basic",
    type:"get",
    data:"cs_id="+cs_id,
    success:function(data){
        //上面摘要模板
        $(".brief").html(template("course-brief",data.result));
    }
});

$.ajax({
    url:"/v6/course/picture",
    type:"get",
    data:"cs_id="+cs_id,
    success:function(data){
        $(".preview").html(template("picture",data.result))
    }
});


$("#sendPicture").on("change",function(){
    var fi = this.files[0];

    var filename = fi.name || '';
    var fileType = fi.type || '';

    var read = new FileReader();
    read.readAsDataURL(fi);

    read.onload = function(e){
        var base64 = e.target.result || this.result;
        var formData = new FormData();

        formData.append("cs_cover_original", convertBase64UrlToBlob(base64, fileType), filename);
        formData.append("cs_id",cs_id);
        $.ajax({
            url:"/v6/uploader/cover",
            type:"post",
            data:formData,
            success:function(data){
                $(".preview img").attr("src",data.result.path);
            },
            processData: false,  // 不处理数据
            contentType: false   // 不设置Content-Type内容类型
        });
    }
});
$("#save").on("click",function(){
    location.href = "/dist/html/course/course_edit_step3.html?cs_id="+cs_id;
});
