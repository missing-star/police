var xm = new Vue({
    el: "#app",
    data: {
        show: false,
        isshade: false,
        isent: -1, //查看文章
        isnum: false, //通知显示数字
        ismore: false, //更多
        isforum: false, //论坛
        isCase: false, //报备
        isauditing: false, //审核中
        isall: false, //全部报备
        iscomment: false, //评论
        isreply: false, //回复
        isspeak: false, //查看回复
        ispass: false, //修改密码
        isshow: false, //报备TAG
        isNone: false, //未搜索到
        isstar: false, //所有报备
        ForumCate: [], //论坛分类
        titleList: [], //论坛列表
        allList: [], //报备列表
        list: [], //报备列表
        seelist: [], //查看回复
        repairSorts: [], //保修类型
        repairList: [], //所有报备
        current: 0,
        changeRed: -1,
        currentActive: -1,
        oneIndex: -1,
        twoIndex: -1,
        currentIndex: 0,
        numIndex: -1,
        commentActive: -1,
        Ptitle: '', //论坛标题
        Pcontent: '', //论坛内容
        Pcomment: '', //评论内容
        keyWords: '', //搜索关键词
        replyComment: '', //回复评论的内容,
        currentComment: {}, //当前查看的评论,
        currentPostId: '',
        currentCommentId: '',
        selectedCatId: '',
        postIndex: -1,
        isCreated: false, //是否创建了富文本
        KindEditor: '',
    },
    methods: {
        writeReply() { //写论坛
            this.isshade = true
            this.isforum = true
            if (this.isCreated) {
                return false;
            }
            this.isCreated = true;
            window.editor = this.KindEditor.create('#Ftext', {
                allowImageRemote: false,
                resizeType: 0,
                uploadJson: './kindeditor/php/upload_json.php',
                fileManagerJson: './kindeditor/php/file_manager_json.php',
                allowFileManager: true,
                items: ['bold', 'italic', 'underline', 'fontsize', 'image']
            });
        },
        btnChange(selectedCatId, index) { //写论坛 点击添加颜色
            this.changeRed = index;
            this.selectedCatId = selectedCatId;
        },
        pulishChange() { //发布论坛
            if (this.Ptitle.trim() == '') {
                alert('请输入标题!');
                return false;
            } else if (editor.html().trim() == '') {
                alert('请输入内容!');
                return false;
            } else if (this.selectedCatId == '') {
                alert('请选择分类标签');
                return false;
            }
            $.ajax({
                type: "post",
                url: `${api}/index/api/publishPost`,
                data: {
                    info_id: this.selectedCatId,
                    title: this.Ptitle,
                    content: editor.html()
                },
                dataType: 'json',
                success: (res) => {
                    this.allList = res.data;
                    this.bannerChange(this.currentIndex);
                    this.selectedCatId = '';
                    this.Ptitle = '';
                    this.Pcontent = '';
                    this.goClose();
                }
            })
        },



        getCharaLength(str) {
            return str.replace(/[\u0391-\uFFE5]/g, "aa").length > 239;
        },
        filterImg(content) {
            return content.replace('作者', '啊啊啊啊===作者');
        },

    },
    created() {
        KindEditor.ready((K) => {
            this.KindEditor = K;
        });

        // if (this.isCreated) {
        //     return false;
        // }
        // this.isCreated = true;
        // window.editor = this.KindEditor.create('#Ftext', {
        //     allowImageRemote: false,
        //     resizeType: 0,
        //     uploadJson: './kindeditor/php/upload_json.php',
        //     fileManagerJson: './kindeditor/php/file_manager_json.php',
        //     allowFileManager: true,
        //     items: ['bold', 'italic', 'underline', 'fontsize', 'image']
        // });
    },

})