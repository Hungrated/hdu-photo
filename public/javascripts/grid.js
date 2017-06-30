var Grid = function () {
    this.element = document.querySelector(".grid_container");
    this.count = 0;
    this.page = 1;
}

Grid.prototype.append = function (photographersInfo) {
    var photographersInfo = [
        {
            "id": 1,
            "user_id": 1,
            "title": "title",
            "label": "label",
            "cover_url": "https://drscdn.500px.org/photo/80626185/h%3D450/d8e50e96f1331f0e346db2c367e7c1f4",
            "photo_url": "photo_url",
            "popularity": 1,
            "createdAt": "2015-09-14T00:00:00.000Z",
            "updatedAt": "2015-09-14T00:00:00.000Z",
            "width": 675,
            "height": 450,
            "theme": "主题",
            "photographer_page" : "http://",
            "photographer": "摄影师"
        },
        {
            "id": 2,
            "user_id": 1,
            "title": "title",
            "label": "label",
            "cover_url": "https://drscdn.500px.org/photo/388736/h%3D450/73918be4abcbcf3dbf98bcba20303a65",
            "photo_url": "photo_url",
            "popularity": 1,
            "createdAt": "2015-09-14T00:00:00.000Z",
            "updatedAt": "2015-09-14T00:00:00.000Z",
            "width": 676,
            "height": 450,
            "theme": "主题",
            "photographer_page" : "http://",
            "photographer": "摄影师"
        },
        {
            "id": 3,
            "user_id": 1,
            "title": "title",
            "label": "label",
            "cover_url": "https://drscdn.500px.org/photo/3348095/h%3D450/a49d347c75bbdbec450f94085bc01ea2",
            "photo_url": "photo_url",
            "popularity": 1,
            "createdAt": "2015-09-14T00:00:00.000Z",
            "updatedAt": "2015-09-14T00:00:00.000Z",
            "width": 603,
            "height": 450,
            "theme": "主题",
            "photographer_page" : "http://",
            "photographer": "摄影师"
        },
        {
            "id": 4,
            "user_id": 1,
            "title": "title",
            "label": "label",
            "cover_url": "https://drscdn.500px.org/photo/4357365/h%3D450/ff3b85679ab6726629972e7668728ae8",
            "photo_url": "photo_url",
            "popularity": 1,
            "createdAt": "2015-09-14T00:00:00.000Z",
            "updatedAt": "2015-09-14T00:00:00.000Z",
            "width": 301,
            "height": 450,
            "theme": "主题",
            "photographer_page" : "http://",
            "photographer": "摄影师"
        },
        {
            "id": 5,
            "user_id": 1,
            "title": "title",
            "label": "label",
            "cover_url": "https://drscdn.500px.org/photo/18175153/h%3D450/1786a15760ff34ee4e48e177664c5a50",
            "photo_url": "photo_url",
            "popularity": 1,
            "createdAt": "2015-09-14T00:00:00.000Z",
            "updatedAt": "2015-09-14T00:00:00.000Z",
            "width": 676,
            "height": 450,
            "theme": "主题",
            "photographer_page" : "http://",
            "photographer": "摄影师"
        },
        {
            "id": 6,
            "user_id": 1,
            "title": "title",
            "label": "label",
            "cover_url": "https://drscdn.500px.org/photo/21086277/h%3D450/10d665f2e2330606594b235c5b50786a",
            "photo_url": "photo_url",
            "popularity": 1,
            "createdAt": "2015-09-14T00:00:00.000Z",
            "updatedAt": "2015-09-14T00:00:00.000Z",
            "width": 676,
            "height": 450,
            "theme": "主题",
            "photographer_page" : "http://",
            "photographer": "摄影师"
        },
        {
            "id": 7,
            "user_id": 1,
            "title": "title",
            "label": "label",
            "cover_url": "https://drscdn.500px.org/photo/25216251/h%3D450/11e98004e505e28024ee21938124f712",
            "photo_url": "photo_url",
            "popularity": 1,
            "createdAt": "2015-09-14T00:00:00.000Z",
            "updatedAt": "2015-09-14T00:00:00.000Z",
            "width": 680,
            "height": 450,
            "theme": "主题",
            "photographer_page" : "http://",
            "photographer": "摄影师"
        },
        {
            "id": 8,
            "user_id": 1,
            "title": "title",
            "label": "label",
            "cover_url": "https://drscdn.500px.org/photo/29180481/h%3D450/ae5918e24edbc1fa42c985f7827fb493",
            "photo_url": "photo_url",
            "popularity": 1,
            "createdAt": "2015-09-14T00:00:00.000Z",
            "updatedAt": "2015-09-14T00:00:00.000Z",
            "width": 675,
            "height": 450,
            "theme": "主题",
            "photographer_page" : "http://",
            "photographer": "摄影师"
        },
        {
            "id": 9,
            "user_id": 1,
            "title": "title",
            "label": "label",
            "cover_url": "https://drscdn.500px.org/photo/30602077/h%3D450/9a561ab8ae97b5a14c66a4e25ffbedd2",
            "photo_url": "photo_url",
            "popularity": 1,
            "createdAt": "2015-09-14T00:00:00.000Z",
            "updatedAt": "2015-09-14T00:00:00.000Z",
            "width": 300,
            "height": 450,
            "theme": "主题",
            "photographer_page" : "http://",
            "photographer": "摄影师"
        },
        {
            "id": 10,
            "user_id": 1,
            "title": "title",
            "label": "label",
            "cover_url": "https://drscdn.500px.org/photo/34778098/h%3D450/4c2040ce50b2ee561858cd30c97c73d6",
            "photo_url": "photo_url",
            "popularity": 1,
            "createdAt": "2015-09-14T00:00:00.000Z",
            "updatedAt": "2015-09-14T00:00:00.000Z",
            "width": 675,
            "height": 450,
            "theme": "主题",
            "photographer_page" : "http://",
            "photographer": "摄影师"
        }
    ]

    photographersInfo.forEach((function (info) {

    }).bind(this));
}
