$(function () {
    // 导航选中活动状态
    $(".nav-link").click(function () {
        $(".nav-link").removeClass("link-active")
        $(this).addClass("link-active")
        $(".fa").removeClass("fa-active")
        $(this).find(".fa").addClass("fa-active")
    })

    $("#dropMenu>.nav-link").click(function () {
        $(".nav-link").removeClass("link-after")
        $(this).addClass("link-after")
    })

    $(".nav-item>.nav-link:not(#subLink)").click(function () {
        $(".collapse").removeClass("show")
        $(".nav-link").removeClass("link-after")
        $(this).addClass("link-after")
    })

    // 二级导航
    $("#navbarContent #subLink").click(function () {
        if ($(".nav-link").hasClass("link-after")) {
            $(".nav-link").removeClass("link-after")
        }
        $(".fa-angle-left").toggleClass("arrow-toggle")
    })

    let open = $(".fa-align-justify").attr("open")
    $(".fa-align-justify").click(function () {
        open = !open
        if (open) {
            $(".nav-item .nav-link>span").show()
            $(".fa-angle-left").show()
            $(".now-date").show()
            $(".frame-part").addClass("col-lg-11").css({
                "width": "auto"
            })
            startTimer()
        } else {
            $(".nav-item .nav-link>span").hide()
            $(".fa-angle-left").hide()
            $(".now-date").hide()
            $(".frame-part").removeClass("col-lg-11").css({
                "width": "97.5%"
            })
            clearInterval(timer)
        }

        $(".nav-part").toggleClass("nav-hide")
        $(this).toggleClass("toggler-hide")
    })

    // 时间控件
    setTimeout(() => {
        let now = new Date()
        let y = now.getFullYear()
        let m = full(now.getMonth())
        let d = full(now.getDate())
        let h = full(now.getHours())
        let mini = full(now.getMinutes())
        let s = full(now.getSeconds())
        let time = y + '-' + m + '-' + d + '<br>' + h + ': ' + mini + ': ' + s

        $(".now-date").html(time)
    }, 0);

    var timer
    startTimer()

    function startTimer() {
        timer = setInterval(() => {
            let now = new Date()
            let y = now.getFullYear()
            let m = full(now.getMonth())
            let d = full(now.getDate())
            let h = full(now.getHours())
            let mini = full(now.getMinutes())
            let s = full(now.getSeconds())
            let time = y + '-' + m + '-' + d + '<br>' + h + ': ' + mini + ': ' + s

            $(".now-date").html(time)
        }, 1000)
    }

    function full(str) {
        if (str < 10) {
            return '0' + str
        } else {
            return str
        }
    }
})
/* $(function () {
            // 日期倒计时控件
            setTimeout(() => {
                let now = new Date()

                const leftTime = new Date($('p').attr('data-time').replace(/\-/g, '/')) - now;
                if (leftTime >= 0) {
                    const d = full(Math.floor(leftTime / 1000 / 60 / 60 / 24));
                    const h = full(Math.floor(leftTime / 1000 / 60 / 60 % 24));
                    const m = full(Math.floor(leftTime / 1000 / 60 % 60));
                    const s = full(Math.floor(leftTime / 1000 % 60));

                    $(".left-time").html(`剩余${d > 0 ? d + '天' : '' + ' '} ${h + '时' + ' '} ${m + '分' + ' '} ${s + '秒'}`)
                }

            }, 0);

            var timer
            startTimer()

            function startTimer() {
                timer = setInterval(() => {
                    let now = new Date()

                    const leftTime = new Date($('p').attr('data-time').replace(/\-/g, '/')) - now;
                    if (leftTime >= 0) {
                        const d = full(Math.floor(leftTime / 1000 / 60 / 60 / 24));
                        const h = full(Math.floor(leftTime / 1000 / 60 / 60 % 24));
                        const m = full(Math.floor(leftTime / 1000 / 60 % 60));
                        const s = full(Math.floor(leftTime / 1000 % 60));

                        $(".left-time").html(`剩余${d > 0 ? d + '天' : '' + ' '} ${h + '时' + ' '} ${m + '分' + ' '} ${s + '秒'}`)
                    }
                }, 1000)
            }

            function full(str) {
                if (str < 10) {
                    return '0' + str
                } else {
                    return str
                }
            }
        }) */
