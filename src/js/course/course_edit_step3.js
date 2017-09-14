/**
 * Created by Administrator on 2017/9/8.
 */
var asideJS = require("./../common/aside.js");
//侧边栏
asideJS();
//头部
var headerJS = require("./../common/header.js");
headerJS();

var util = require("./../common/util.js");
var cs_id = util("cs_id");


//这里不能使用自调用去获取数据,自调用的函数不能被外界访问到！
function getData(){
    $.ajax({
        url:"/v6/course/lesson",
        type:"get",
        data:"cs_id="+cs_id,
        success:function(data) {
            //上面摘要模板
            $(".brief").html(template("course-brief", data.result));
            //给予模板生成的数据
            data.page = 3;
            $("#aside").html(template("course-edit-aside", data.result));
            //生成课时章节列表
            $("#le").html(template("lessons-tpl", data.result.lessons))
                .on("click", "#edit-lessons", setEvent);
        }
    });
};
getData();





//动态生成需要给父亲添加事件
function setEvent(){
    var ct_id = $(this).attr("data-lessons");

    $.ajax({
        url:"/v6/course/chapter/edit",
        type:"get",
        data:"ct_id="+ct_id,
        success:function(data){
            //给不同的点击不同的值
            data.result.action = "辑编";
            $("#chapterModal").html(template("edit-tpl",data.result));

            //编辑事件
            $("#send").on("click",function(){
                var key = $('form').serialize();

                $.ajax({
                    //  v6/teacher/add  || /v6/teacher/add  是2个不同的东西。
                    url:"/v6/course/chapter/modify",
                    type:"post",
                    data:key,
                    success:function(data){
                        if(data.code==200){

                            getData();

                        }
                    }
                });
            });


        }
    })
}

//如果一开始点击添加的话：也需要调用模板
$("#add-lessons").on("click",function(){

    $("#chapterModal").html(  template("edit-tpl",{"action":"添加","ct_cs_id":cs_id})  );

    //添加事件
    $("#send").on("click",function(){
        var key = $('form').serialize();
        $.ajax({
            //  v6/teacher/add  || /v6/teacher/add  是2个不同的东西。
            url:"/v6/course/chapter/add",
            type:"post",
            data:key,
            success:function(data){
                if(data.code==200){

                    getData();

                }
            }
        });
    });

});