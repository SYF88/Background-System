// 点击切换注册页面
$(".login").click(function () {
    $("#login").hide();
    $("#register").show();
})

// 点击切换登录页面
$(".register").click(function () {
    $("#login").show();
    $("#register").hide();
})


// 自定义密码校验规则
//从layUI中获取form对象
var form = layui.form;
var layer = layui.layer;

//通过form.verify()函数自定义检验规则
form.verify({

    //自定义一个pwd的校验规则
    pwd: [
        /^[\S]{6,16}$/,
        '密码必须为6到16位，且不为空'
    ],

    // 校验两次密码是否一致
    repwd:
        function (value) {
            var pwd = $("#register [name=password]").val();
            if (pwd != value) {
                return "两次输入密码不一致，请重新输入密码";
            }
        }
})



//监听注册表单的提交事件
$("#form_register").on('submit', function (e) {

    //阻止默认的提交行为
    e.preventDefault();

    //发起Ajax的POST请求
    var datas = {
        username: $("#register [name=username]").val(),
        password: $("#register [name=username]").val()
    }
    $.post('http://api-breakingnews-web.itheima.net/api/reguser',
        datas,
        function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录')

            //注册成功后自动点击切换登录按钮，跳转到登录页面
            $(".register").click();
        })
})

//监听登录表单的提交事件
$("#form_login").submit(function (e) {
    //阻止默认提交行为
    e.preventDefault();

    $.ajax({
        url: 'http://api-breakingnews-web.itheima.net/api/login',

        method: 'POST',

        //快速获取表单中的数据
        data: $(this).serialize(),

        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('登录失败')
            }
            layer.msg('登录成功')

            //跳转到后台管理页面
            location.href = '/index.html'
        }
    })
})