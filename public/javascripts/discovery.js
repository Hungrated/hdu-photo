var Discovery = function (func) {
	this.layout = null;
    //this.spinner = ;//document.querySelector('.spinner');
    this.isLoaded = true;
    this.func = func || 0;
    /*
    func
    0: popular
    1: photographers
    2: rank
    3: recent
     */
    this.page = 1;
    this.init();
    this.load();
	window.addEventListener('scroll', this.scroll.bind(this));
	//document.addEventListener('click', this.click.bind(this));
}

Discovery.prototype.init = function () {
    if(this.func == 0 || this.func == 2 || this.func == 3) {
        this.layout = new Barrel();
        this.photoboxFade = new Fade('photobox', 100);
        this.shadowFade = new Fade('shadow', 70);
    }
    else if(this.func == 1) {
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
	getData(this.func, this.page++).then(this.loaded.bind(this));
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

function getData(func, page) {
    page = page || 1;
    if(func == 0) {
        return request("http://localhost:3000/portfolio/get_recentRank?page=" + page);
    }
    else if(func == 1) {
        return request("http://localhost:3000/users/get_Name?page=" + page);
    }
    else if(func == 2) {
        return request("http://localhost:3000/portfolio/get_rank?page=" + page);
    }
    else if(func == 3) {
        return request("http://localhost:3000/portfolio/get_recent?page=" + page);
    }
    else { // err
        // handle err
        console.log("unexpect request");
    }
}
