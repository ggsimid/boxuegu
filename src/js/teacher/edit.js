/**
 * Created by Administrator on 2017/9/8.
 */
var asideJS = require("./../common/aside.js");
//²à±ßÀ¸
asideJS();
//Í·²¿
var headerJS = require("./../common/header.js");
headerJS();

var util = require("./../common/util.js");

var tc_id = util("tc_id");

$.ajax({
   url:"/v6/teacher/edit",
    type:"get",
    data:"tc_id="+tc_id,
    success:function(data){
        $(".teacher-add").html(template("teacht-tpl",data.result));
    }
});

$("#teacher-edit").ajaxForm({
    delegation: true,
    success:function(data){
        location.href = "/dist/html/teacher/list.html";
    }
});

