/**
 * Created by Administrator on 2017/9/8.
 */
var asideJS = require("./../common/aside.js");
//�����
asideJS();
//ͷ��
var headerJS = require("./../common/header.js");
headerJS();

//��ȡ��URL����
var util = require("./../common/util.js");
var cs_id = util("cs_id");


//��ʾ�γ̻�����Ϣ
$.ajax({
   url:"/v6/course/basic",
   type:"get",
   data:"cs_id="+cs_id,
   success:function(data){

      //�Ż�������3�����ִ�������ݶ���һ���ģ�����λ�ö�����һ�����Կ��Ժϲ���ͬһ��ģ�壡���������λ�ò�����һ��Ͳ����ԡ�
      //����ժҪģ��
      $(".brief").html(template("course-brief",data.result));

      //�����ģ��,������ģ��ʱ���һ��ֵ�������ʶ�ǵڼ�ҳ��Ȼ��ģ��������ֵȥ������ʽ����
      data.result.page = 1;
      $("#course_edit_aside").html(template("course-edit-aside",data.result));


      //������Ϣģ��
      $("#tpl_2").html(template("course-set",data.result));


      //��������ģ��������Ҫ��ģ��Ƕ��ģ�壬��Ҫע��ģ�ģ�����ɵ�˳���ܵ�ת����
      $("#select_2").html(template("course-set-secend",data.result.category.childs));

      $("#select_2 option").each(function(index,value){
         //console.log(value,$(value));
         //ע��㣺JQ��each������value��һ��DOM����
         //Ҫ��ҪJQ�ķ���ֵ�Ǹ�JQ����Ҫ��ȡֵ���ñ����洢������
         //ģ��Ƕ�׿���ģ�壬��������ģ�廹û�����ɣ�Ȼ���ȡ������������
         re=$(value).val();
         if(re==data.result.cs_cg_id){
            value.selected = "selected";
         }
      });

      //���������¼�ע��
      $("#select_1").on("change",function(){
         var vs = $("#select_1 option:selected").val();
         $.ajax({
            url:"/v6/category/child",
            type:"get",
            data:"cg_id="+vs,
            success:function(data){
               $("#select_2").html(template("course-set-secend",data.result));
            }
         });
      });


      //ʵ�ֿ����ύ���ݸ��¿γ̻�����Ϣ
      $("#send").on("click",function(){

         var formdata = $("#courseMessage").serialize();

         $.ajax({
            url:"/v6/course/update/basic",
            type:"post",
            data:formdata,
            success:function(data){
               location.href = "/dist/html/course/course_edit_step2.html?cs_id="+cs_id;
            }
         })

      });
   }
});





