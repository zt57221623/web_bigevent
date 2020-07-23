$(function(){
    //点击 去注册账号 的链接
    $('#link_login').on('click',function(){
        $('.reg-box').show();
        $('.login-box').hide();
    })
    //点击 去登录的 链接
    $('#link_reg').on('click',function(){
        $('.reg-box').hide();
        $('.login-box').show();
    })
    // 从 layui 中获取 from 对象
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        // 自定义了一个叫做pwd效验规则
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
         repwd : function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd != value) {
                return '俩次密码输入不一致';
            }

         }
    })
    // 监听表单注册事件
    $('#from_reg').on('submit',function(e){
        //阻止默认跳转行为
        e.preventDefault();
        //发起post请求
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: {
                username : $('.reg-box [name="username"]').val(),
                password : $('.reg-box [name="password"]').val()
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,大王请登录');
                //模拟用户点击行为
                $('#link_reg').click();
            }
        });
    })
    $('#form_login').submit(function(e){
        //阻止默认跳转行为
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/login",
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !=0) {
                    return layer.msg(res.message);
                }
                localStorage.setItem('token',res.token);
                layer.msg('登录成功啦,2秒后跳转到首页!');
                setTimeout(function(){
                    location.href= 'index.html';
                },2000);
            }
        });
    })
})