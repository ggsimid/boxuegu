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
   url:"/v6/category/top",
    type:"get",
    success:function(data){

        $("#select").html(template("option",data.result))
                .on("change",function(){
                var vs = $("#select option:selected").val();
                //����:ʹ��onchange�¼�,Ȼ��ȥ�Ҷ�Ӧ��option��valueֵ
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