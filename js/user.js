var xm = new Vue({
    el: "#app",
    data: {
        isshade: false,
        ispass: false,
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
        titleList: [],
        list: [{}],
        comlist: [{}],
        userlist: [],
        seelist: [], //查看回复
        replayList: [], //回复
        commentList: [], //回复
        msg: "阅读全文",
        num: "123",
        currentActive: -1,
        intergral: '', //总积分
        Pcomment: '', //评论内容
        postIndex: -1,
        commentActive: -1,
        currentIndex: 0,
        currentPostId: '',
        currentCommentId: '',
        oneIndex: -1,
        replyComment: '', //回复评论的内容,

        currentComment: {}, //当前查看的评论,
    },
    methods: {
        goClose() { //关闭遮罩
            this.isshade = false
            this.ispass = false
            this.isspeak = false
            $("body").removeClass("bod")
        },
        readChange(item, index, e) { //产看文章
            if (this.postIndex != index) {
                this.postIndex = index;
            } else {
                this.postIndex = -1;
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
        comChange(index) { //查看评论
            this.commentActive = this.commentActive == index ? -1 : index
        },
        gospeak(index) { //回复
            this.currentActive = this.currentActive == index ? -1 : index;
        },
        gospeak1(index) { //查看回复  回复
            this.oneIndex = this.oneIndex == index ? -1 : index
        },
        lookchange(post_id, comment_id) { //查看回复
            this.currentPostId = post_id;
            this.currentCommentId = comment_id;
            this.currentComment = this.titleList.filter((posts) => {
                return posts.id == post_id
            })[0].comment_list.filter((comments) => {
                return comments.id == comment_id;
            })[0];
            this.isshade = true
            this.isspeak = true
            $.ajax({
                type: "post",
                url: `${api}/index/api/comments`,
                async: true,
                data: {
                    post_id: post_id,
                    comment_id: comment_id,
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res);
                    this.seelist = res.data;
                }
            })
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
        },



        commentChange(post_id, comment_id, uid, type) { //发布评论
            if (comment_id) {
                if (this.replyComment.trim() == '') {
                    alert('请输入回复内容');
                    return false;
                }
                $.ajax({
                    url: `${api}/index/api/replayComment`,
                    type: 'post',
                    dataType: 'json',
                    data: {
                        post_id: post_id,
                        comment_id: comment_id,
                        comment_uid: uid,
                        content: this.replyComment
                    },
                    success: (res) => {
                        this.replyComment = '';
                        if (type == 1) {
                            this.oneIndex = -1;
                            this.lookchange(this.currentPostId, this.currentCommentId);
                        } else {
                            this.currentActive = -1;
                        }
                    },
                    error: (err) => {

                    }
                })
            } else {
                if (this.Pcomment !== "") {
                    $.ajax({
                        type: "post",
                        url: `${api}/index/api/publishComment`,
                        data: {
                            post_id: post_id,
                            content: this.Pcomment
                        },
                        dataType: 'json',
                        success: (res) => {
                            this.Pcomment = ""
                            this.bannerChange(this.currentIndex);
                        }
                    })
                } else {
                    alert("请填写内容")
                }
            }

        },
        //文章点赞
        likePostOrComment(post_id, comment_id, type) {
            console.log(post_id)
            console.log(comment_id)
            console.log(type)
            var data = {};
            $.ajax({
                url: `${api}/index/api/phraisePost`,
                type: 'post',
                dataType: 'json',
                data: {
                    post_id: post_id,
                    comment_id: comment_id
                },
                success: (res) => {
                    console.log(res)
                    console.log(post_id)
                    console.log(comment_id)
                    console.log(type)
                    if (type == 1) {
                        //弹窗评论点赞
                        this.lookchange(this.currentPostId, this.currentCommentId);
                    } else {
                        this.bannerChange(this.currentIndex);
                    }
                },
                error: (err) => {

                }
            });
        },
        getCharaLength(str) {
            return str.replace(/[\u0391-\uFFE5]/g, "aa").length > 239;
        },
        filterImg(content) {
            return content.replace('作者', '啊啊啊啊===作者');
        },
        bannerChange(){

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
                this.titleList = res.data.post
                this.intergral = res.data.intergral
                this.userlist = res.data.intergrals
                this.commentList = res.data.comments.comment
                this.replayList = res.data.comments.replay
                this.bannerChange(0);
            }
        })
    },
    filters: {
        filterTime(time) {
            var date = new Date(time * 1000);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        }
    }

})



$(".read").click(function () {
    $(".content_text").toggleClass("entable");
})