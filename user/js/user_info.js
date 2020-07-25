
$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    //初始化用户基本信息
    initUserInFo();
    function initUserInFo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                form.val('formUserInFo', res.data);
            }
        });
    }
    //重置表单的数据
    $('#btnReset').on('click',function(e){
        e.preventDefault();
        initUserInFo();
    })
    //监听表单的默认行为
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if(res.status != 0){
                    return layer.msg('修改用户信息失败！')
                }
                layer.msg('修改用户信息成功！')
                window.parent.getUserInfo();
            }
        });
    })
})
