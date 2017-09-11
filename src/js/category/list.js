/**
 * Created by Administrator on 2017/9/8.
 */
var asideJS = require("./../common/aside.js");
//²à±ßÀ¸
asideJS();
//Í·²¿
var headerJS = require("./../common/header.js");
headerJS();


$.ajax({
    url:"/v6/category",
    type:"get",
    success:function(data){
        $(".table-bordered").append(template("category",data.result));

    }
});