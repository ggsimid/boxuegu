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
   url:"/v6/course",
    type:"get",
    success:function(data){
        $("#courses").html(template("course-list",data.result));

    }
});

