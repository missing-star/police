var xm = new Vue({
    el: "#app",
    data: {
        isrole: false, //选择登录角色
        ispolice: true, //警员登录
        ismatron: false, //管理登录
        isorder: false, //接单员登录
        Oname: '',
        Opsw: '',
        ip: '',
        Pname: '',
        Ppsw: '',
    },
    methods: {
        goBack: function () {
            this.ispolice = false
            this.ismatron = false
            this.isorder = false
            this.isrole = true
        },
        goOrder: function () {
            this.isrole = false
            this.isorder = true
        },
        goPolice: function () {
            this.isrole = false
            this.ispolice = true
            var ip = returnCitySN["cip"]
            this.ip = '127.0.0.1';
        },
        goMatron: function () {
            this.isrole = false
            this.ismatron = true
        },
        orderEnter: function () { //接单员登录
            $.ajax({
                type: "post",
                url: `${api}/index/api/receiverLogin`,
                async: true,
                data: {
                    name: this.Oname,
                    password: this.Opsw
                },
                dataType: 'json',
                success: function (res) {
                    if(res.code == 1) {
                        window.location.href = 'order.html';
                    }
                    else {
                        alert(res.msg);
                    }
                }
            })
        },
        policeEnter: function () { //警员登录
            $.ajax({
                type: "post",
                url: `${api}/index/api/policeLogin`,
                async: true,
                data: {
                    ip: this.ip,
                    name: this.Pname,
                    password: this.Ppsw
                },
                dataType: 'json',
                success: function (res) {
                    if(res.code == 1) {
                        window.location.href = 'index.html';
                    }
                    else {
                        alert(res.msg);
                    }
                }
            })
        }
    },
    created() {

    }
})