/**
 * Created by Administrator on 2017/9/8.
 */




$('#login-form').ajaxForm({
    delegation: true,
    success: function(data) {
        console.log(123);
        if (data.code == 200) {
            localStorage.setItem("key",JSON.stringify(data));
            console.log()
            location.href = '/dist';
        } else {
            alert('lost');
        }
    }

});

var img = localStorage.getItem("key")["tc_avatar"]?localStorage.getItem("key").tc_avatar:"/../public/img/default.png";
$(".avatar img").attr("src",img);