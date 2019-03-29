//首页banner
const indexBanner = {
    name: 'cp-banner',
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
                    <span @click="goname">张三</span>
                </div>
            </div>
        </div>
    </div>
    `,

    methods: {
        goAnswer() {
            this.$emit("go-answer")
        },
        goname() {
            this.$emit("go-name")
        }
    }
};