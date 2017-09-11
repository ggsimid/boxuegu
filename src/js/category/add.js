/**
 * Created by Administrator on 2017/9/8.
 */
var asideJS = require("./../common/aside.js");
//侧边栏
asideJS();
//头部
var headerJS = require("./../common/header.js");
headerJS();

$.ajax({
   url:"/v6/category/top",
    type:"get",
    success:function(data){

        $("#select").html(template("option",data.result))
                .on("change",function(){
                var vs = $("#select option:selected").val();
                //联动:使用onchange事件,然后去找对应的option的value值
                $.ajax({
                    url:"/v6/category/child",
                    type:"get",
                    data:"cg_id="+vs,
                    success:function(data){
                        $("#secendSelect").html(template("secendOption",data.result));
                    }
                });
        })

    }
});


$("#course_category_form").ajaxForm({
   success:function(){
       location.href = "/dist/html/category/list.html";
   }
});