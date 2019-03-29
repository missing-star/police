var xm = new Vue({
    el: "#app",
    data: {
        isname: true,
        isent: true, //查看文章
        iscomment: false, //评论
        isreply: false, //回复
        isspeak: false, //查看回复
        isanswer: false, //通知
        isUser: false, //个人中心
        isGood: false, //删除
        isone: true, //发布
        isbox: false, //回复
        isnone: false, //没有回复，发布
        titleList: [{}],
        list: [{}],
        comlist: [{}],
        userlist: [{},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
        ],
        msg: "阅读全文",
        num: "123",
        currentActive: -1,
    },
    methods: {
        readChange() { //查看文章
            this.isent = !this.isent
            if (this.msg == "阅读全文") {
                this.msg = "收起全文"
            } else {
                this.msg = "阅读全文"
            }
        },
        goname() { //个人信息
            $(".header_two").slideToggle("400");
        },
        goAnswer() { //通知
            $(".answer").slideToggle("400");
        },
        editName() {
            this.isname = !this.isname
        },
        comChange() { //查看评论
            this.iscomment = !this.iscomment
        },
        gospeak() { //回复
            this.isreply = !this.isreply
        },
        lookchange() { //查看回复
            this.isshade = true
            this.isspeak = true
        },
        deleteChange() { //删除
            this.isGood = !this.isGood
        },
        confire() { //修改昵称
            var up_text = document.getElementById("up_text");
            var editor = document.getElementById("editor");
            up_text.innerText = editor.value;
            this.isname = true;
        },
        agreeChange(index) { //回复
            if (this.currentActive == -1) {
                this.currentActive = index
            } else {
                this.currentActive = -1
            }
        },
        send() { //发送
            this.currentActive = -1
        },
        userTag() { //切换
            this.isone = !this.isone
        }
    },
    components: {
        "cp-banner": indexBanner,
    },
    created() {
        $.ajax({
            type: "post",
            url: `${api}/index/api/myPage`,
            async: true,
            data: {},
            dataType: 'json',
            success: (res) => {
                console.log(res)
            }
        })
    },

})



$(".read").click(function () {
    $(".content_text").toggleClass("entable");
})