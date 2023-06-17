const sites = [
	'https://maven.bzgzs.cn',
	'https://b.maven.bzgzs.cn'
];

const names = [
	'主站点 | Main',
	'备用站点 | Backup'
];

const connectivity = [
	false,
	false
];

function start($, url) {
	testSites($, url);
	let future = new Date(new Date().getTime() + 5000);
	let interval = setInterval(function () {
		const time = $('.time');
		const downloadLink = $('.download-link');
		if (future.getSeconds() - new Date().getSeconds() <= 0) {
			time.text(0);
			clearInterval(interval);
			appendSite($, url);
			$(downloadLink).toggleClass("done");
			return;
		}
		time.text(future.getSeconds() - new Date().getSeconds())
	}, 1000);
}

function testSites($, url) {
	sites.forEach((value, index) => {
		$.ajax({
			url: value + url + ".md5",
			type: "GET",
			async: true,
			success: function () {
				connectivity[index] = true;
			}
		})
	})
}

function appendSite($, url) {
	let hasSelected = false; // 是否已选择站点
	const selected = document.getElementById("selected");
	const optional = document.getElementById("optional")
	sites.forEach((value, index) => {
		// 创建链接
		const link = document.createElement('a');
		link.target = '_self';
		link.href = sites[index] + url;
		link.innerText = names[index];
		if (connectivity[index] && !hasSelected) {
			const site = document.createElement('li'); // 创建元素
			site.appendChild(link); // 添加链接到元素
			site.classList.add("ok"); // 添加类
			selected.appendChild(site); // 添加元素到列表
			hasSelected = true;
			$(link)[0].click();
		} else {
			const option = document.createElement('li');
			option.appendChild(link);
			if (connectivity[index]) option.classList.add("ok");
			optional.appendChild(option);
		}
	})
	if (!hasSelected) $(document.getElementById("failed")).fadeIn(); // 若没有站点选中，则显示告示
	$(document.getElementById("sites")).fadeIn();
}