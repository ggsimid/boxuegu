/**
 * Created by Administrator on 2017/9/8.
 */

var img = localStorage.getItem("key").tc_avatar?localStorage.getItem("key").tc_avatar:"/../public/img/default.png";

$(".avatar img").attr("src",img);


$('#login-form').ajaxForm({

    success: function(data) {
        console.log(123);
        if (data.code == 200) {
            alert('登录成功,good good da');
            console.log(JSON.stringify(data));
            localStorage.setItem("key",JSON.stringify(data));
            location.href = '/dist';
        } else {
            alert('lost');
        }
    }

});