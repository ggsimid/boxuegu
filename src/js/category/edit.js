/**
 * Created by Administrator on 2017/9/8.
 */

var asideJS = require("./../common/aside.js");
//侧边栏
asideJS();

//头部
var headerJS = require("./../common/header.js");
headerJS();

//获取url字符串方法
var util = require("./../common/util.js");
var cg_id = util("cg_id");
console.log(cg_id);
//第一步根据表单列表通过URL传递过来的cg_id，去请求回来整个表单的数据,并且渲染出来
//判断：是否1级分科或者是2级分科，如果是1级，那么就不生成2级列表。如果是2级分科，就生成，并且请求。
$.ajax({
    url:"/v6/category/edit",
    type:"get",
    //关于get方法，并不会自动帮你拼接字符串。
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



