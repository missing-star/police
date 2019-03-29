var xm = new Vue({
    el: "#app",
    data: {
        isbook: false,
        isplug: false,
        isshade: false,
        isanswer: false,
        isUser: false,
        isPage: true,
        istotur: false,
        plugList: [],
        bookList: [],
        tutorialList: [],
        musicList: [],
        list: [],
        musicSort: [], //音乐分类
        bookSort: [], //书籍分类
        tutorialSort: [], //教程分类
        current: 0,
        description: '',
        create_at: '',
        name: '',
        data_url: '',
        picture: '',
        download_status: '',
        Tdescription: '',
        Tname: '',
        Tpicture: '',
        Tdata_url: '',
    },
    methods: {
        gouser() { //跳转我的主页
            window.location.href = "user.html"
        },
        goname() { //个人信息
            this.isUser = !this.isUser
        },
        goAnswer() { //通知
            this.isanswer = !this.isanswer
        },
        bookChange(index) { //书籍分类
            this.current = index
            var list = this.bookSort
            var book_id = list[index].id
            $.ajax({
                type: "post",
                url: `${api}/index/api/bookList`,
                async: true,
                data: {
                    page: 1,
                    book_id: book_id
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.bookList = res.data
                }
            })
        },
        turtorChange(index) { //教程分类
            $(".book_left_uu .Pne").removeClass("white")
            this.current = index
            var list = this.tutorialSort
            var tutorial_id = list[index].id
            $.ajax({
                type: "post",
                url: `${api}/index/api/tutorialList`,
                async: true,
                data: {
                    page: 1,
                    tutorial_id: tutorial_id
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.tutorialList = res.data
                }
            })
        },
        Ychange() { //研判工具
            $.ajax({
                type: "post",
                url: `${api}/index/api/pluginList`,
                async: true,
                data: {
                    page: 1,
                    tool_id: 4
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.tutorialList = res.data
                }
            })
        },
        Jchange() { //技战法
            $.ajax({
                type: "post",
                url: `${api}/index/api/pluginList`,
                async: true,
                data: {
                    page: 1,
                    tool_id: 5
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.tutorialList = res.data
                }
            })
        },
        openChange(index) { //详情页
            var list = this.plugList
            var tool_id = list[index].id
            $.ajax({
                type: "post",
                url: `${api}/index/api/toolDetail`,
                async: true,
                data: {
                    tool_id: tool_id
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.isshade = true
                    this.isplug = true
                    this.create_at = res.data.create_at
                    this.description = res.data.description
                    this.name = res.data.name
                    this.picture = res.data.picture
                    this.data_url = res.data.data_url
                    this.download_status = res.data.download_status
                    sessionStorage.setItem('url', JSON.stringify(res.data.data_url))
                    // console.log(res.data.data_url)
                }
            })
        },
        bookDown(index) { //书记闲情
            var list = this.bookList
            var tool_id = list[index].id
            console.log(tool_id)
            $.ajax({
                type: "post",
                url: `${api}/index/api/toolDetail`,
                async: true,
                data: {
                    tool_id: tool_id
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.isshade = true
                    this.isbook = true
                    this.create_at = res.data.create_at
                    this.description = res.data.description
                    this.name = res.data.name
                    this.picture = res.data.picture
                    this.data_url = res.data.data_url
                    this.download_status = res.data.download_status
                    sessionStorage.setItem('url', JSON.stringify(res.data.data_url))
                }
            })
        },
        Tdown(index) { //教程详情页 
            var list = this.tutorialList
            var tutorial_id = list[index].id
            $.ajax({
                type: "post",
                url: `${api}/index/api/tutorialDetail`,
                async: true,
                data: {
                    tutorial_id: tutorial_id
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.isshade = true
                    this.istotur = true
                    this.Tdescription = res.data.description
                    this.Tname = res.data.tutorial_name
                    this.Tpicture = res.data.picture
                    this.Tdata_url = res.data.tutorial_url
                    this.Tdownload_status = res.data.download_status
                    sessionStorage.setItem('url', JSON.stringify(res.data.data_url))
                }
            })
        },
        upDown() {
            var url = sessionStorage.getItem('url')
            url = url.replace("\"", "").replace("\"", "");;
            console.log(url)
            var down = api + "/" + url
            window.open(down)
        }
    },
    components: {
        "cp-banner": indexBanner,
    },
    created() {
        $.ajax({
            type: "post",
            url: `${api}/index/api/toolCenter`,
            async: true,
            data: {},
            dataType: 'json',
            success: (res) => {
                console.log(res)
                this.plugList = res.data.plugin
                this.musicList = res.data.music.list
                this.musicSort = res.data.music.sort
                this.bookList = res.data.book.list
                // console.log(this.bookList.length)
                this.bookSort = res.data.book.sort
                this.tutorialList = res.data.tutorial.list
                this.tutorialSort = res.data.tutorial.sort
            }
        })
    },
    filters: {
        filterTime(time) {
            var date = new Date(time * 1000);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
    },

})



$(function () {
    $(".nav_uu li").each(function (index) {
        $(this).click(function () {
            $("li.blue").removeClass("blue");
            $(this).addClass("blue");
        });
    })
});


$(".book_left_uu li").each(function (index) {
    $(this).click(function () {
        $("li.white").removeClass("white");
        $(this).addClass("white");
    });
})



$('.nav_uu').on('click', 'li', function (e) {
    var target = e.target;
    var id = $(target).data("to");
    $('html,body').animate({
        scrollTop: $('#' + id).offset().top
    }, 800);
});