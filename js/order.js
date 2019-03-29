var xm = new Vue({
    el: "#app",
    data: {
        isstar: true,
        list: [],
        msg: '',
        show: true,
    },
    methods: {
        onli() {
            this.isstar = !this.isstar
            this.show = !this.show
                $.ajax({
                    type: "post",
                    url: `${api}/index/api/repairLists`,
                    async: true,
                    data: {},
                    dataType: 'json',
                    success: (res) => {
                        console.log(res)
                        this.list = res.data
                    }
                })
        },
        on() {
            this.isstar = !this.isstar
            this.show = !this.show
            $.ajax({
                type: "post",
                url: `${api}/index/api/myRepairs`,
                async: true,
                data: {},
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.list = res.data
                }
            })
        },
        Repair(index) {
            var num = this.list
            var id = num[index].id
            $.ajax({
                type: "post",
                url: `${api}/index/api/receiveRepair`,
                async: true,
                data: {
                    repair_id: id
                },
                dataType: 'json',
                success: (res) => {
                    $.ajax({
                        type: "post",
                        url: `${api}/index/api/repairLists`,
                        async: true,
                        data: {},
                        dataType: 'json',
                        success: (res) => {
                            console.log(res)
                            this.list = res.data
                        }
                    })
                }
            })
        }
    },
    created() {
        this.msg = "接单"
        $.ajax({
            type: "post",
            url: `${api}/index/api/repairLists`,
            async: true,
            data: {},
            dataType: 'json',
            success: (res) => {
                console.log(res)
                this.list = res.data
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
    },
})