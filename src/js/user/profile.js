/**
 * Created by Administrator on 2017/9/8.
 */
var asideJS = require("../common/aside.js");
var header = require("../common/header.js");
//²à±ßÀ¸
asideJS();
//Í·²¿
var headerJS = require("../common/header.js");
headerJS();

$.ajax({
   url:'/v6/teacher/profile',
   type:'get',
   success:function(data){
      if(data.code==200){
         var html = template("teacher-profile",data.result);
         $(".teacher-profile").html(html);
      }

   }
});




$("#profile").ajaxForm({
    delegation: true,
    success:function(data){
    }
});




