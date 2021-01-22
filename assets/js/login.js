$(function() {
    // 点击去注册账号的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()

    })
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 2.自定义校验
    var form = layui.form;
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val().trim()
            if (value !== pwd) {
                return '两次密码不一样'
            }
        }
    })

    // 3.注册
    $('#form-reg').on('submit', function(e) {
        e.preventDefault();
        // 提出请求
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 提交成功后
                layer.msg('注册成功，请前往登录')
                    // 跳转
                $('#link_login').click();
                // 清空
                $('#form-reg')[0].reset()
            }
        });
    })

    // 4.登录功能
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 成功
                // 跳转
                layer.msg('登录成功！')
                location.href = '/index.html'
                    // 存储
                localStorage.getItem('token', res.token)
            }
        });
    })
})