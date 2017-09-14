/**
 * Created by Administrator on 2017/9/8.
 */
var asideJS = require("./../common/aside.js");
//侧边栏
asideJS();
//头部
var headerJS = require("./../common/header.js");
headerJS();

//获取课程ID
var util = require("./../common/util.js");
var cs_id = util("cs_id");



//回显信息
$.ajax({
    url:"/v6/course/picture",
    type:"get",
    data:"cs_id="+cs_id,
    success:function(data){
        //有个BUG为什么课程信息不返回图片信息（空字符串）？
        $(".preview").html(template("picture",data.result));
        //摘要模板
        $(".brief").html(template("course-brief",data.result));
        //侧边栏模板
        data.result.page = 2;
        $("#course_edit_aside").html(template("course-edit-aside",data.result));
    }
});

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

//上传图片方法
$("#sendPicture").on("change",function(){
    //获取input上传的图片信息
    var fi = this.files[0];
    //获取图片的类型和名字
    var filename = fi.name || '';
    var fileType = fi.type || '';
    //使用FileReader对象去读取文件信息，转成BASE64格式
    var read = new FileReader();
    read.readAsDataURL(fi);
    //读取完成
    read.onload = function(e){
        //获取图片数据
        var base64 = e.target.result || this.result;
        //生成FormData对象，添加数据生成formdata格式，预备上传数据库
        var formData = new FormData();
        //调用转码方法，把BASE64转成BLOD格式
        formData.append("cs_cover_original", convertBase64UrlToBlob(base64, fileType), filename);
        //不允许一边上传formdata一边发字符串格式，所以要使用append添加
        formData.append("cs_id",cs_id);
        $.ajax({
            url:"/v6/uploader/cover",
            type:"post",
            data:formData,
            success:function(data){
                //数据当场回显
                $(".preview img").attr("src",data.result.path);

            },
            processData: false,  // 不处理数据
            contentType: false   // 不设置Content-Type内容类型
        });
    }
});
//点击保存跳转到Edit_3页面
$("#save").on("click",function(){
    location.href = "/dist/html/course/course_edit_step3.html?cs_id="+cs_id;
});
