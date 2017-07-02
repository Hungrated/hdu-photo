var Grid = function () {
    this.element = document.querySelector(".photographers_grid_region");
    this.count = 0;
    this.page = 1;
    this.countPerPage = 10;
}

Grid.prototype.append = function (photographersInfo) {
    // var photographersInfo = [
    //     {
    //         "cover_url": "https://drscdn.500px.org/photo/172564343/m%3D900/f77e8cc3606579105d0e895c14195c90",
    //         "follows": 1000,
    //         "photographer_page" : "http://",
    //         "Name": "Георгий  Чернядьев (Georgy Chernyadyev)",
    //         "Head": "https://pacdn.500px.org/141796/c841f9972923eb5e65a1f9a238f7c6f695cabfa8/2.jpg?2"
    //     },
    //     {
    //         "cover_url": "https://drscdn.500px.org/photo/152505339/m%3D900/54500f40642ecce3a8a555d1ea48309d",
    //         "follows": 1000,
    //         "photographer_page" : "http://",
    //         "Name": "Joachim Bergauer",
    //         "Head": "https://pacdn.500px.org/9604807/15efda3ecbc6c70e7a80d36cda96a8da5956e9aa/2.jpg?17"
    //     },
    //     {
    //         "cover_url": "https://drscdn.500px.org/photo/206655741/m%3D900/043b44b1335d5a17243b7b86f9f6d14d",
    //         "follows": 1000,
    //         "photographer_page" : "http://",
    //         "Name": "Remo Scarfò",
    //         "Head": "https://pacdn.500px.org/4646600/48cf4201d74d67108a39323caba0750fb4bc2e65/2.jpg?73"
    //     },
    //     {
    //         "cover_url": "https://drscdn.500px.org/photo/125643885/m%3D900/8dc95caf53ae980c461108bf65431c00",
    //         "follows": 1000,
    //         "photographer_page" : "http://",
    //         "Name": "Daniel Herr",
    //         "Head": "https://pacdn.500px.org/3602520/2d549e145fbb283ac2898b887670b06faee28b4c/2.jpg?22"
    //     },
    //     {
    //         "cover_url": "https://drscdn.500px.org/photo/165617037/m%3D900/2bf6fac6717afe6d23ffa67379c3919f",
    //         "follows": 1000,
    //         "photographer_page" : "http://",
    //         "Name": "Martin Niederberger",
    //         "Head": "https://pacdn.500px.org/4025526/adc16997cb0d93d8897fca9d2047dacace5e4f1e/2.jpg?1"
    //     },
    //     {
    //         "cover_url": "https://drscdn.500px.org/photo/186021041/m%3D900/0aeaffdada644b22e7dec27a9ff76bdd",
    //         "follows": 1000,
    //         "photographer_page" : "http://",
    //         "Name": "Mevludin Sejmenovic",
    //         "Head": "https://pacdn.500px.org/2786141/8550bd397c3696cbc9da16aa332894d9296ecca7/2.jpg?5"
    //     },
    //     {
    //         "cover_url": "https://drscdn.500px.org/photo/80626185/h%3D450/d8e50e96f1331f0e346db2c367e7c1f4",
    //         "follows": 1000,
    //         "photographer_page" : "http://",
    //         "Name": "摄影师",
    //         "Head": "http://"
    //     },
    //     {
    //         "cover_url": "https://drscdn.500px.org/photo/80626185/h%3D450/d8e50e96f1331f0e346db2c367e7c1f4",
    //         "follows": 1000,
    //         "photographer_page" : "http://",
    //         "Name": "摄影师",
    //         "Head": "http://"
    //     },
    //     {
    //         "cover_url": "https://drscdn.500px.org/photo/80626185/h%3D450/d8e50e96f1331f0e346db2c367e7c1f4",
    //         "follows": 1000,
    //         "photographer_page" : "http://",
    //         "Name": "摄影师",
    //         "Head": "http://"
    //     },
    //     {
    //         "cover_url": "https://drscdn.500px.org/photo/80626185/h%3D450/d8e50e96f1331f0e346db2c367e7c1f4",
    //         "follows": 1000,
    //         "photographer_page" : "http://",
    //         "Name": "摄影师",
    //         "Head": "http://"
    //     }
    // ]
    photographersInfo.forEach((function (info) {
        var photographerCard = document.createElement('div');
        photographerCard.className = "photographer_card";
        photographerCard.innerHTML =
        "<a class='link_wrap' href=" + info.index + "></a>" +
        "<div class='top' style='background-image: url(" + ((typeof (info.Portfolios[0])=="undefined") ? "#" : info.Portfolios[0].cover_url) + ")'>" +
            "<div class='avatar_background'></div>" +
            "<a class='avatar' href=" + info.index + " style='background-image: url(" + info.Head + ")'></a>" +
        "</div>" +
        "<div class='bottom'>" +
        "<a class='name' href=" + info.index + ">" + info.Name + "</a>" +
        "<span class='followers'>" + info.follows + "关注</span>" +
        "<div class='message-button'>私信</div>" +
        "<div class='follow-button'>" +
            "<a class='button follow'>关注</a>" +
            "<!--<a class='button unfollow'>取消关注</a>-->" +
            "<!--<a class='self'>我</a>-->" +
            "</div>" +
        "</div>";
        this.element.appendChild(photographerCard);
    }).bind(this));

    this.count += this.countPerPage;
}
