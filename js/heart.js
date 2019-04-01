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
        musicList1: [],
        musicList2: [],
        list: [],
        musicSort: [], //音乐分类
        bookSort: [], //书籍分类
        tutorialSort: [], //教程分类
        current1: 0,
        number: 0,
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

        message: 1,


        total: 1, // 记录总条数
        // display: 8, // 每页显示条数
        current: 1, // 当前的页数

        totalone: 8,
        currentone: 1,
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
        bookChange(book_id, index) { //书籍分类
            this.current1 = index
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
                    this.total = res.data.length
                    sessionStorage.setItem('book_id', book_id)
                }
            })
        },
        turtorChange(index, tutorial_id) { //教程分类
            $(".book_left_uu .Pne").removeClass("white")
            this.number = index
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
                    this.totalone = res.data.length
                    sessionStorage.setItem('tutorial_id', tutorial_id)
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
            $.ajax({
                type: "post",
                url: `${api}/index/api/toolDetail`,
                async: true,
                data: {
                    tool_id: index
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
            $.ajax({
                type: "post",
                url: `${api}/index/api/toolDetail`,
                async: true,
                data: {
                    tool_id: index
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
            $.ajax({
                type: "post",
                url: `${api}/index/api/tutorialDetail`,
                async: true,
                data: {
                    tutorial_id: index
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
        },
        pagechange: function (currentPage) { //书籍分页
            var book_id = sessionStorage.getItem('book_id')
            console.log(book_id)
            $.ajax({
                type: "post",
                url: `${api}/index/api/bookList`,
                async: true,
                data: {
                    page: currentPage,
                    book_id: book_id
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.bookList = res.data
                    this.total = res.data.length
                }
            })
        },
        pagechangeOne: function (currentPage) { //教程
            var tutorial_id = sessionStorage.getItem('tutorial_id')
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
                    this.totalone = res.data.length
                }
            })
        },
        add(id) {
            this.message++
            console.log(this.message)
            $.ajax({
                type: "post",
                url: `${api}/index/api/muisicList`,
                async: true,
                data: {
                    page: this.message,
                    music_id: id
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.musicList[id] = res.data
                }
            })
        },
        reduce(id) {
            this.message--
            if (this.message < 1) {
                this.message = 1
            }
            console.log(id)
            $.ajax({
                type: "post",
                url: `${api}/index/api/muisicList`,
                async: true,
                data: {
                    page: this.message,
                    music_id: id
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.musicList[id] = res.data
                }
            })
        }
    },
    components: {
        "cp-page": indexPage,
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
                this.bookSort = res.data.book.sort
                this.tutorialList = res.data.tutorial.list
                this.tutorialSort = res.data.tutorial.sort

                this.total = res.data.book.list.length
                this.totalone = res.data.tutorial.list.length
                sessionStorage.setItem('length', JSON.stringify(res.data.plugin.length))
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



// 插件
var length = sessionStorage.getItem("length");
$(".zxf").createPage({
    pageNum: Math.ceil(length / 8),
    current: 1,
    backfun: function (e) {
        var page = e.current
        console.log(page)
        $.ajax({
            type: "post",
            url: `${api}/index/api/pluginList`,
            async: true,
            data: {
                page: page,
                tool_id: 1
            },
            dataType: 'json',
            success: (res) => {
                xm.plugList = res.data
            }
        })
    }
});
//书籍分页
// var length = sessionStorage.getItem("book");
// $(".zxf_pagediv").createPage({
//     pageNum: Math.ceil(length / 8),
//     current: 1,
//     backfun: function (e) {
//         var page = e.current
//         $.ajax({
//             type: "post",
//             url: `${api}/index/api/bookList`,
//             async: true,
//             data: {
//                 page: page,
//                 book_id: 1
//             },
//             dataType: 'json',
//             success: (res) => {
//                 xm.bookList = res.data
//             }
//         })
//     }
// });
// 教程
var length = sessionStorage.getItem("tutorial");
$(".center").createPage({
    pageNum: Math.ceil(length / 2),
    current: 1,
    backfun: function (e) {
        var page = e.current
        $.ajax({
            type: "post",
            url: `${api}/index/api/tutorialList`,
            async: true,
            data: {
                page: page,
                tutorial_id: 1
            },
            dataType: 'json',
            success: (res) => {
                console.log(res)
                xm.tutorialList = res.data
            }
        })
    }
});