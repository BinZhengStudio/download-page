window.onload = function () {
    $('.downloadUrl').hide()
    let future = new Date(new Date().getTime() + 5000)
    let interval = setInterval(function () {
        const second = $('.second');
        if (future.getSeconds() - new Date().getSeconds() <= 0) {
            second.text(0)
            clearInterval(interval)
            $('.card a')[0].click()
            return;
        }
        second.text(future.getSeconds() - new Date().getSeconds())
    }, 1000)
}
