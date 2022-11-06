window.onload = function () {
    let future = new Date(new Date().getTime() + 5000)
    let interval = setInterval(function () {
        const second = $('.second');
        const download_link = $('.download-link');
        const link = $('.download-link a')[0];
        if (future.getSeconds() - new Date().getSeconds() <= 0) {
            second.text(0);
            clearInterval(interval);
            link.click();
            $(download_link).toggleClass("countdown-done");
            return;
        }
        second.text(future.getSeconds() - new Date().getSeconds())
    }, 1000)
}
