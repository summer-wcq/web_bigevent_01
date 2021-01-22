$(function() {
    var layer = layui.layer
        // 调用getUserInfo()获取用户基本信息
    getUserInfo()

})

//1. 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // Header请求头配置对象
        header: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            // 调用renderAvatar渲染用户的头像
            renderAvatar(res.data)
        }
    });
}

// 封装函数
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username;
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}