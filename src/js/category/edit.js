/**
 * Created by Administrator on 2017/9/8.
 */

var asideJS = require("./../common/aside.js");
//�����
asideJS();

//ͷ��
var headerJS = require("./../common/header.js");
headerJS();

//��ȡurl�ַ�������
var util = require("./../common/util.js");
var cg_id = util("cg_id");
console.log(cg_id);
//��һ�����ݱ��б�ͨ��URL���ݹ�����cg_id��ȥ�������������������,������Ⱦ����
//�жϣ��Ƿ�1���ֿƻ�����2���ֿƣ������1������ô�Ͳ�����2���б������2���ֿƣ������ɣ���������
$.ajax({
    url:"/v6/category/edit",
    type:"get",
    //����get�������������Զ�����ƴ���ַ�����
    data:"cg_id="+cg_id,
    success:function(data){
        $("#category").html(template("category_edit",data.result));
    }
});


$("#category_modify").ajaxForm({
   delegation: true,
   success:function(data){
       location.href = "/dist/html/category/list.html";
   }
});



