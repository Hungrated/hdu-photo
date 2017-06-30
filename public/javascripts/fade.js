var Fade = function (id, maxOpacity) {
	this.tarId = id;
	this.isFaded = true;
	this.fading = false;
	this.maxOpacity = maxOpacity;
}
Fade.prototype.fade = function (flag, time) 
{
	if( (this.isFaded && !flag) || (!this.isFaded && flag) )return ;
	if(this.fading) return ;
	var tar = document.getElementById(this.tarId);
	var value = flag ? 0 : this.maxOpacity;
	var interval = parseInt(time / this.maxOpacity);
	if(flag) tar.style.display = "block";
	(function () {
		this.fading = true;
		tar.style.opacity = value / 100;
		if (flag) {
			value++;
			if (value <= this.maxOpacity) {
				setTimeout(arguments.callee.bind(this), interval);
			}
			else {
				this.isFaded = false;
				this.fading = false;
			}
		} 
		else {
			value--;
			if (value >= 0) {
				setTimeout(arguments.callee.bind(this), interval);
			}
			else {
				this.isFaded = true;
				this.fading = false;
				tar.style.display="none";
			}
		}
	}).bind(this)();
}