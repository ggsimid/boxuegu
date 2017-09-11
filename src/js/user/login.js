/**
 * Created by Administrator on 2017/9/8.
 */
$('#login-form').ajaxForm({

    success: function(data) {
        console.log(123);
        if (data.code == 200) {
            alert('登录成功,笑嘻嘻');
            console.log(JSON.stringify(data));
            localStorage.setItem("key",JSON.stringify(data));
            location.href = '/dist'
        } else {
            alert('登录失败,妈卖批')
        }
    }

});