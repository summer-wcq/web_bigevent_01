$(function() {
    // 调用getUserInfo()获取用户基本信息
    getUserInfo()

})

//1. 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        Header: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {

        }
    });
}