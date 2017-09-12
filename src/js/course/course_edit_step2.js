/**
 * Created by Administrator on 2017/9/8.
 */
var asideJS = require("./../common/aside.js");
//�����
asideJS();
//ͷ��
var headerJS = require("./../common/header.js");
headerJS();

var util = require("./../common/util.js");
var cs_id = util("cs_id");


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






//��ʾ�γ̻�����Ϣ
$.ajax({
    url:"/v6/course/basic",
    type:"get",
    data:"cs_id="+cs_id,
    success:function(data){
        //����ժҪģ��
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
            processData: false,  // ����������
            contentType: false   // ������Content-Type��������
        });
    }
});
$("#save").on("click",function(){
    location.href = "/dist/html/course/course_edit_step3.html?cs_id="+cs_id;
});
