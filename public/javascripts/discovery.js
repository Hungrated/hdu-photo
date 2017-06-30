var Discovery = function (dataType) {
	this.layout = null;
    //this.spinner = ;//document.querySelector('.spinner');
    this.isLoaded = true;
    this.dataType = dataType || 0;
    this.page = 1;
    this.init();
    this.load();
	window.addEventListener('scroll', this.scroll.bind(this));
	//document.addEventListener('click', this.click.bind(this));
}

Discovery.prototype.init = function () {
    if(this.dataType == 0) {
        this.layout = new Barrel();
        this.photoboxFade = new Fade('photobox', 100);
        this.shadowFade = new Fade('shadow', 70);
    }
    else if(this.dataType == 1) {
        this.layout = new Grid();
    }
}

// Discovery.prototype.click = function (event) {
// 	var $target = event.target;
// 	var photobox = document.getElementById("photobox");
// 	var html="";
// 	alert($target.dataset.large);
// 	html += "<img src='" + $target.dataset.large + "' style='" + "height:" + photobox.style.height + ";'>";
// 	photobox.innerHTML = html;
// 	if($target.className === 'photo loaded') {
// 		this.photoboxFade.fade(true, 500);
// 		//, $target.clientWidth, $target.clientHeight
// 		this.shadowFade.fade(true, 500);
// 	}
// }

Discovery.prototype.scroll = function () {
	var scrollTop = document.body.scrollTop;
	if(scrollTop + innerHeight >= document.body.scrollHeight && this.isLoaded) {
		console.log("" + scrollTop + " " + innerHeight + " " + document.body.scrollHeight);
		this.load();
	}
    if(scrollTop >= 50) {
        var nav = document.querySelector(".fix_width_on_modal");
        nav.style.position = "fixed";
        nav.style.top = 0;
    }
    else {
        var nav = document.querySelector(".fix_width_on_modal");
        nav.style.position = "relative";
    }
    if(scrollTop > innerHeight) {
        var scrollToTopButton = document.querySelector(".scroll_to_top__button");
        scrollToTopButton.className = "scroll_to_top__button scroll_to_top--is-visible";
    }
    else {
        var scrollToTopButton = document.querySelector(".scroll_to_top__button");
        scrollToTopButton.className = "scroll_to_top__button";
    }
}

Discovery.prototype.loaded = function (data) {
	//this.spinner.style.display = 'none';
	this.isLoaded = true;
	this.layout.append(data);
}

Discovery.prototype.load = function () {
	//this.spinner.style.display = 'block';
	this.isLoaded = false;
	getData(this.dataType, this.page++).then(this.loaded.bind(this));
}

function request(url) {
    return new Promise(function (resolve) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.addEventListener('load', function () {
            resolve(JSON.parse(this.response));
        });
    })
}

function getData(dataType, page) {
    page = page || 1;
    if(dataType == 0) {
        return request("http://127.0.0.1:3000/portfolio/get_photos?page=" + page);
    }
    else if(dataType == 1) {
        return request("http://127.0.0.1:3000/portfolio/get_photos?page=" + page);
        // return request("http://127.0.0.1:3000/portfolio/get_photographers_info?page=" + page);
    }
    else { // err
        // handle err
    }
}
