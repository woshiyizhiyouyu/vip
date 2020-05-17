// 轮播
let banner = (function () {
    let banner_show = document.querySelector('.banner_show');
    let banner_line = document.querySelector('.banner_line');
    let banner_prev = document.querySelector('.banner_prev');
    let banner_next = document.querySelector('.banner_next');
    let ulLis = document.querySelectorAll('.banner_show ul li');
    let olLis = document.querySelectorAll('.banner_show ol li');
    let now = 0;
    let timer;
    banner_line.style.left = olLis[0].offsetLeft + 'px';
    for (let i = 0; i < olLis.length; i++) {
        olLis[i].index = i;
        olLis[i].onmouseover = function () {
            change(this.index);
            now = this.index;
        }
    }
    banner_prev.onclick = function () {
        if (now == 0) {
            now = ulLis.length - 1;
        } else {
            now--;
        }
        change(now);
    }
    banner_next.onclick = function () {
        if (now == ulLis.length - 1) {
            now = 0
        } else {
            now++;
        }
        change(now);
    }

    banner_show.onmouseover = function () {
        clearInterval(timer);
    }
    banner_show.onmouseout = function () {
        timer = setInterval(run, 3000);
    }
    timer = setInterval(run, 3000);
    function run() {
        if (now == ulLis.length - 1) {
            now = 0
        } else {
            now++;
        }
        change(now);
    }

    function change(now) {
        for (let i = 0; i < ulLis.length; i++) {
            ulLis[i].className = '';
        }
        ulLis[now].className = 'show';
        banner_line.style.left = olLis[now].offsetLeft + 'px';
    }
})();

// 倒计时
let countDown = (function () {
    let time = document.getElementsByClassName('time')[0];
    let countDownItems = time.getElementsByTagName('span');
    return function (time) {
        let timer = setInterval(run, 1000);
        run();
        function run() {
            let date = new Date();
            let nextDate = new Date(Date.parse(time));
            let nowTime = date.getTime();
            let nextTime = nextDate.getTime();
            let changeTime = nextTime - nowTime;
            if (changeTime <= 0) {
                clearInterval(timer);
                countDownItems[0].innerHTML = '00';
                countDownItems[1].innerHTML = '00';
                countDownItems[2].innerHTML = '00';
                return;
            }
            let hours = Math.floor(changeTime / (1000 * 60 * 60));
            let minutes = Math.floor(changeTime / (1000 * 60) % 60);
            let seconds = Math.round(changeTime / 1000 % 60);

            countDownItems[0].innerHTML = toZero(hours);
            countDownItems[1].innerHTML = toZero(minutes);
            countDownItems[2].innerHTML = toZero(seconds);
        }
        //不足两位补0
        function toZero(n) {
            if (n < 10) {
                return '0' + n;
            } else {
                return n;
            }
        }
    };
})();
countDown("2020/5/17");

//定位menubar
let menubar = (function () {
    let menubar = document.getElementById('menubar');
    let jingxuan = document.getElementById('jingxuan');
    let menubarItems = menubar.getElementsByTagName('li');
    let menuCons = document.getElementsByClassName('menuCon');

    menubar.style.top = jingxuan.offsetTop + 'px';
    menubarTop = menubar.offsetTop;
    let number = 90;
    window.addEventListener('scroll', function () {
        let scrollY = document.documentElement.scrollTop;
        if (menubarTop - scrollY < number) {
            menubar.style.position = 'fixed';
            menubar.style.top = number + 'px';
        } else {
            menubar.style.position = 'absolute';
            menubar.style.top = menubarTop + 'px';
        }
        //滚轮定位
        for (let i = 0; i < menuCons.length; i++) {
            if (menuCons[i].offsetTop - scrollY > 0 && menuCons[i].offsetTop - scrollY < number || menuCons[i].offsetTop - scrollY + menuCons[i].offsetHeight > 0 && menuCons[i].offsetTop - scrollY + menuCons[i].offsetHeight < number) {
                for (let j = 0; j < menubarItems.length; j++) {
                    menubarItems[j].className = '';
                }
                menubarItems[i + 1].className = 'active';
            }

        };
        for (let i = 0; i < menubarItems.length; i++) {
            menubarItems[i].index = i;
            menubarItems[i].onclick = function () {
                for (let i = 0; i < menubarItems.length; i++) {
                    menubarItems[i].className = '';
                }
                this.className = 'active';
                document.documentElement.scrollTop = menuCons[this.index].offsetTop - 90;
            }
        }
    });

    //dom0事件绑定会影响懒加载中的window.onScrool
    // window.onscroll = function () {
    //     let scrollY = document.documentElement.scrollTop;
    //     if (menubarTop - scrollY < number) {
    //         menubar.style.position = 'fixed';
    //         menubar.style.top = number + 'px';
    //     } else {
    //         menubar.style.position = 'absolute';
    //         menubar.style.top = menubarTop + 'px';
    //     }
    //     //滚轮定位
    //     for (let i = 0; i < menuCons.length; i++) {
    //         if (menuCons[i].offsetTop - scrollY > 0 && menuCons[i].offsetTop - scrollY < number || menuCons[i].offsetTop - scrollY + menuCons[i].offsetHeight > 0 && menuCons[i].offsetTop - scrollY + menuCons[i].offsetHeight < number) {
    //             for (let j = 0; j < menubarItems.length; j++) {
    //                 menubarItems[j].className = '';
    //             }
    //             menubarItems[i + 1].className = 'active';
    //         }

    //     };
    //     for (let i = 0; i < menubarItems.length; i++) {
    //         menubarItems[i].index = i;
    //         menubarItems[i].onclick = function () {
    //             for (let i = 0; i < menubarItems.length; i++) {
    //                 menubarItems[i].className = '';
    //             }
    //             this.className = 'active';
    //             document.documentElement.scrollTop = menuCons[this.index].offsetTop - 90;
    //         }
    //     }
    // }
})();

// 返回顶部
let returnBack = (function () {
    let btn = document.getElementsByClassName('returnBack')[0];
    // console.log(btn);

    btn.onclick = function () {
        document.documentElement.scrollTop = 0;
    }
})();

// 懒加载
let lazyLoading = (function () {
    let lazyImgs = document.querySelectorAll('[data-self-src]');
    // console.log(lazyImgs);

    function offsetY(ele) {
        let result = 0;
        while (ele) {
            result += ele.offsetTop;
            ele = ele.offsetParent;
        }
        return result;
    }
    window.addEventListener('scroll', function () {
        let scrollTop = document.documentElement.scrollTop;
        let viewH = window.innerHeight;
        for (let h = 0; h < lazyImgs.length; h++) {
            lazyImgs[h].flag = true;
            if (offsetY(lazyImgs[h]) < scrollTop + viewH - 200 && lazyImgs[h].flag) {
                //data-*(现在经常使用的获取自定义属性的方法)
                // console.log(elem.dataset.user);
                // 重点： *号的名字若果有下划线，就转成小驼峰。
                // console.log( elem.dataset.userName)
                let nowSrc = lazyImgs[h].dataset.selfSrc;
                // console.log(nowSrc);
                lazyImgs[h].src = nowSrc;
                lazyImgs[h].parentNode.parentNode.style.opacity = 1;
                lazyImgs[h].flag = false;
            }
        }
    });
    // window.onscroll = function () {
    //     let scrollTop = document.documentElement.scrollTop;
    //     let viewH = window.innerHeight;
    //     for (let h = 0; h < lazyImgs.length; h++) {
    //         lazyImgs[h].flag = true;
    //         if (offsetY(lazyImgs[h]) < scrollTop + viewH-200 && lazyImgs[h].flag) {
    //             //data-*(现在经常使用的获取自定义属性的方法)
    //             // console.log(elem.dataset.user);
    //             // 重点： *号的名字若果有下划线，就转成小驼峰。
    //             // console.log( elem.dataset.userName)
    //             let nowSrc = lazyImgs[h].dataset.selfSrc;
    //             // console.log(nowSrc);
    //             lazyImgs[h].src = nowSrc;
    //             lazyImgs[h].parentNode.parentNode.style.opacity = 1;
    //             lazyImgs[h].flag = false;
    //         }
    //     }
    // }

})();