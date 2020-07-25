$.ajaxPrefilter(function (options) {
    if (options.url.startsWith('/my/')) {
        options.headers = {
            Authorization: localStorage.getItem("token")||""
        }
        options.complete= function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                // 清空本地存储
                localStorage.removeItem('token');
                //跳转到登录界面
                location.href = 'login.html';
            }
        }
    } 
    options.url = 'http://ajax.frontend.itheima.net' + options.url; 
})