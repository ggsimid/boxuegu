/**
 * Created by Administrator on 2017/9/8.
 */
var asideJS = require("./../common/aside.js");
//�����
asideJS();
//ͷ��
var headerJS = require("./../common/header.js");
headerJS();


$.ajax({
   url:"/v6/category",
    type:"get",
    success:function(data){
        console.log(data.result);
        $(".table-bordered").append(template("category",data.result));
    }
});