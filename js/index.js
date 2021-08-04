banner('slide-banner-box');
banner('live-banner-box');
banner('trend-banner-box');
banner('national-banner-box');

function banner(bannerBox) {
    var bannerBox = document.getElementById(bannerBox);
    var bannerList = bannerBox.querySelector('ul');
    var lis = bannerList.getElementsByTagName('li');
    var copyLi = lis[0].cloneNode(true);
    bannerList.appendChild(copyLi);
    var triggers = bannerBox.querySelectorAll('.trigger span')
    var curindex = 0;
    for (let i = 0; i < lis.length; i++) {
        lis[i].index = i;
    }
    var timer = setInterval(change, 2000);
    var movetimer = null;
    bannerBox.addEventListener('mouseover', function () {
        clearInterval(timer);
    });
    bannerBox.addEventListener('mouseout', function () {
        timer = setInterval(change, 2000);
    });

    for (let i = 0; i < triggers.length; i++) {
        triggers[i].index = i;
        triggers[i].addEventListener('click', function () {
            curindex = this.index - 1;
            change();
        });
    }

    function change() {
        curindex++;
        if (curindex == lis.length) {
            bannerList.style.marginLeft = 0;
            curindex = 1;
        }
        for (var i = 0; i < triggers.length; i++) {
            triggers[i].classList.remove('on')
        }
        //bannerList.style.marginLeft = -curindex * 550 + 'px';
        movetimer = setInterval(animation, 30);
        if (curindex == triggers.length) {
            triggers[0].classList.add('on');
            return;
        }
        triggers[curindex].classList.add('on');
    }
    function animation() {
        var stap = -(-curindex * lis[0].offsetWidth - bannerList.offsetLeft) / 10;
        stap = stap > 0 ? Math.ceil(stap) : -(Math.ceil(-stap));
        bannerList.style.marginLeft = bannerList.offsetLeft - stap + 'px';
        if (bannerList.offsetLeft <= -curindex * 550) {
            clearInterval(movetimer);
        }
    }
}