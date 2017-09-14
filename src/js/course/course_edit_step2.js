/**
 * Created by Administrator on 2017/9/8.
 */
var asideJS = require("./../common/aside.js");
//�����
asideJS();
//ͷ��
var headerJS = require("./../common/header.js");
headerJS();

//��ȡ�γ�ID
var util = require("./../common/util.js");
var cs_id = util("cs_id");



//������Ϣ
$.ajax({
    url:"/v6/course/picture",
    type:"get",
    data:"cs_id="+cs_id,
    success:function(data){
        //�и�BUGΪʲô�γ���Ϣ������ͼƬ��Ϣ�����ַ�������
        $(".preview").html(template("picture",data.result));
        //ժҪģ��
        $(".brief").html(template("course-brief",data.result));
        //�����ģ��
        data.result.page = 2;
        $("#course_edit_aside").html(template("course-edit-aside",data.result));
    }
});

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

//�ϴ�ͼƬ����
$("#sendPicture").on("change",function(){
    //��ȡinput�ϴ���ͼƬ��Ϣ
    var fi = this.files[0];
    //��ȡͼƬ�����ͺ�����
    var filename = fi.name || '';
    var fileType = fi.type || '';
    //ʹ��FileReader����ȥ��ȡ�ļ���Ϣ��ת��BASE64��ʽ
    var read = new FileReader();
    read.readAsDataURL(fi);
    //��ȡ���
    read.onload = function(e){
        //��ȡͼƬ����
        var base64 = e.target.result || this.result;
        //����FormData���������������formdata��ʽ��Ԥ���ϴ����ݿ�
        var formData = new FormData();
        //����ת�뷽������BASE64ת��BLOD��ʽ
        formData.append("cs_cover_original", convertBase64UrlToBlob(base64, fileType), filename);
        //������һ���ϴ�formdataһ�߷��ַ�����ʽ������Ҫʹ��append���
        formData.append("cs_id",cs_id);
        $.ajax({
            url:"/v6/uploader/cover",
            type:"post",
            data:formData,
            success:function(data){
                //���ݵ�������
                $(".preview img").attr("src",data.result.path);

            },
            processData: false,  // ����������
            contentType: false   // ������Content-Type��������
        });
    }
});
//���������ת��Edit_3ҳ��
$("#save").on("click",function(){
    location.href = "/dist/html/course/course_edit_step3.html?cs_id="+cs_id;
});
