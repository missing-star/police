//首页banner
const indexBanner = {
    name: 'cp-banner',
    prop:['userName'],
    template: `
    <div class="index_header">
        <div class="index_content container">
            <a href="index.html">
                <img src="img/首页logo.png" alt="">
            </a>
            <div class="index_right">
                <div class="header_img" @click="goAnswer">
                    <img src="img/信息.png" alt="">
                </div>
                <div class="header_name">
                    <span><img src="" alt=""></span>
                    <span @click="goname">{{userName}}</span>
                </div>
            </div>
        </div>
    </div>
    `,

    methods: {
        data() {
           userName:''
        },
        goAnswer() {
            this.$emit("go-answer")
        },
        goname() {
            this.$emit("go-name")
        }
    },
    created(){
        this.userName = sessionStorage.getItem("username")
    }
};



//分页
const indexPage = {
    name: 'cp-page',
    template: `
    <nav>
    <ul class="pagination">
      <li class="one" :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(current - 1)">上一页</a></li>
      <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(1)"> 首页 </a></li>
      <li v-for="p in grouplist" :class="{'active': current == p.val}"><a href="javascript:;"
        @click="setCurrent(p.val)"> {{ p.text }} </a>
      </li>
      <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(page)"> 尾页 </a></li>
      <li class="one" :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(current + 1)">下一页</a></li>
    </ul>
  </nav>
    `,
    data() {
        return {
            current: this.currentPage
        }
    },
    props: {
        total: { // 数据总条数
            type: Number,
            default: 0
        },
        display: { // 每页显示条数
            type: Number,
            default: 8
        },
        currentPage: { // 当前页码
            type: Number,
            default: 1
        },
        pagegroup: { // 分页条数
            type: Number,
            default: 5,
            coerce: function (v) {
                v = v > 0 ? v : 5;
                return v % 2 === 1 ? v : v + 1;
            }
        }
    },
    computed: {
        page: function () { // 总页数
            return Math.ceil(this.total / this.display);
        },
        grouplist: function () { // 获取分页页码
            var len = this.page,
                temp = [],
                list = [],
                count = Math.floor(this.pagegroup / 2),
                center = this.current;
            if (len <= this.pagegroup) {
                while (len--) {
                    temp.push({
                        text: this.page - len,
                        val: this.page - len
                    });
                };
                return temp;
            }
            while (len--) {
                temp.push(this.page - len);
            };
            var idx = temp.indexOf(center);
            (idx < count) && (center = center + count - idx);
            (this.current > this.page - count) && (center = this.page - count);
            temp = temp.splice(center - count - 1, this.pagegroup);
            do {
                var t = temp.shift();
                list.push({
                    text: t,
                    val: t
                });
            } while (temp.length);
            if (this.page > this.pagegroup) {
                (this.current > count + 1) && list.unshift({
                    text: '...',
                    val: list[0].val - 1
                });
                (this.current < this.page - count) && list.push({
                    text: '...',
                    val: list[list.length - 1].val + 1
                });
            }
            return list;
        }
    },
    methods: {
        setCurrent: function (idx) {
            if (this.current != idx && idx > 0 && idx < this.page + 1) {
                this.current = idx;
                this.$emit('pagechange', this.current);
            }
        }
    }
};