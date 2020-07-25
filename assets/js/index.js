$(function () {
    //调用用户基本信息函数
    getUserInfo();
})
//获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // headers 就是请求头字段
        // headers: {
        //     Authorization: localStorage.getItem("token")||""
        // },
        success: function (res) {
            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         // 清空本地存储
        //         localStorage.removeItem('token');
        //         //跳转到登录界面
        //         location.href = 'login.html';
        //     }
        // }
    });
}
//渲染用户头像
function renderAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username
    //设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //渲染用户头像
    if (user.user_pic != null) {
        $('.layui-nav-img').prop('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //渲染文字头像
        $('.layui-nav-img').hide();
        let first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}
$('#btnLogout').on('click', function () {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
        // 清空本地存储
        localStorage.removeItem('token');
        //跳转到登录界面
        location.href = 'login.html';
        layer.close(index);
    });
})