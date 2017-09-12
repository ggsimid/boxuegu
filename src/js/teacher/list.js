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
    url:"/v6/teacher",
    type:"get",
    success:function(data){
        $("#teacher-tbody").append(template("teacher-list",data.result));
    }
});

//点击时候去获取数据，然后用模板生成模态框(注意点：因为这个是动态生成的，所以要委托)
$("#teacher-tbody").on("click","#teacher-modal",function(){
    var tc_id = $(this).attr("data-tc-id");
    $.ajax({
       url:"/v6/teacher/view",
        type:"get",
        data:"tc_id="+tc_id,
        success:function(data){
            if(data.code==200){
                //给模板传进去的东西，可以直接使用其属性.
                //对使用了 bootstrap模板，最好自己起一个id或者class。
                $("#teacher-body").html(template("tmodal",data.result));
            }
        }
    });
}).on("click","#teacher-handle",function(){
    var data_tc_id = $(this).attr("data-tc-id");
    var data_tc_status = $(this).attr("data-tc-status");
    //委托里的this指向触发元素，可以通过这种方式先获取与目标元素给AJAX使用。
    var _this = $(this);
    $.ajax({
       url:"/v6/teacher/handle",
        type:"post",
        data:"tc_id="+data_tc_id+"&tc_status="+data_tc_status,
        success:function(data){
            //状态设置要在2个地方，1.在页面刷新的时候，获取状态数据，渲染出来。
            // 2.要同步设置data_tc_status和文本内容
            var text = data.result.tc_status==1?"开启":"注销";
            //这里卡住的原因是，ajax的this不是目标元素喔
            _this.attr("data-tc-status",data.result.tc_status).html(text);
        }
    });
});