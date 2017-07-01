var sequelize = require('../libs/sequelize');
var Sequelize = require('sequelize');

var user = sequelize.define('user', {
    // auto increment, primaryKey, unique
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        // references: {
        //     model: 'comment',
        //     key: 'User_Id'
        // }
        // association: function (comment) {
        //     user.hasMany(comment.Article_Id);
        // }

    },

    // comment
    Username: {type: Sequelize.STRING},

    // allow null
    Password: {type: Sequelize.TEXT, allowNull: false},

    Name: {type: Sequelize.STRING},

    Head: {type: Sequelize.STRING},

    Sex: {type: Sequelize.TEXT},

    Description: {type: Sequelize.STRING},
});
var Portfolio = sequelize.define('Portfolio', {
    // auto increment, primaryKey, unique
    user_id: {
        type: Sequelize.INTEGER(16),
        allowNull: false,
    },
    title: {
        type: Sequelize.TEXT('long')

    },
    label: {
        type: Sequelize.TEXT('long')
    },
    cover_url: {
        type: Sequelize.STRING(256)
    },
    photo_url: {
        type: Sequelize.TEXT('long')
    },
    popularity: {
        type: Sequelize.INTEGER(64)
    },
    width: {
        type: Sequelize.FLOAT(32)
    },
    height: {
        type: Sequelize.FLOAT(32)
    },
    depic: {type: Sequelize.STRING}
});

user.hasMany(Portfolio);
Portfolio.belongsTo(user);

user.sync().then();
Portfolio.sync().then();

function save_portfolio(user_id, title, label, cover_url, photo_url, width, height, depic) {
    return Portfolio.create({
        user_id: user_id,
        title: title,
        label: label,
        cover_url: cover_url,
        photo_url: photo_url,
        width: width,
        height: height,
        depic: depic
    }, {
        fields: [
            'user_id',
            'title',
            'label',
            'cover_url',
            'photo_url',
            'width',
            'height',
            'depic'
        ]
    });
}

function save_popularity(id, popularity, callback) {
    Portfolio.update({popularity: popularity}, {fields: ['popularity'], where: ["id = ?", id]}).then(function (result) {
        callback(null, result);
    })
}

function get_portfolio(id, callback) {
    Portfolio.findAll({
        'where': {
            'user_id': id
        }
    }).then(function (result) {
        callback(null, result);
    });
}

function get_portfolio_by_id(id, callback) {
    Portfolio.findAll({
        'where': {
            'id': id
        }
    }).then(function (result) {
        callback(null, result);
    });
}

function get_photos(page, count, callback) {
    Portfolio.findAll({
        'where': {
            'id': {
                gt: (page - 1) * count
            },
            'id': {
                lte: page * count
            }
        }
    }).then(function (result) {
        callback(null, result);
    });
}

function get_rank(count, page, callback) {
    Portfolio.findAll({
        attributes: ['user.Name', 'user.Head', 'user_id', 'cover_url', 'popularity'],
        'order': [
            ['popularity', 'DESC']
        ],
        include: [{model: user, attributes: ['Name', 'Head']}],
        offset: (page - 1) * count,
        limit: count,
    }).then(function (result) {
        callback(null, result);
    });
}

function get_recent(count, page, callback) {
    Portfolio.findAll({
        attributes: ['user.Name', 'user.Head', 'user_id', 'cover_url', 'popularity'],
        'order': [
            ['createdAt', 'DESC']
        ],
        include: [{model: user, attributes: ['Name', 'Head']}],
        offset: (page - 1) * count,
        limit: count,
    }).then(function (result) {
        callback(null, result);
    });
}

function getUserCount(username, callback) {
    user.count({where: ["Username = ?", username]}).then(function (num) {
        console.log("There are " + num + " projects");
        callback(num);
    });
}

function save(username, password, callback) {
    user.create({Username: username, Password: password}, {fields: ['Username', 'Password']}).then(function (user) {
        console.log(user.Id);
        callback(null, user);
    })
}

function getUser(username, callback) {
    user.findOne({where: ["Username=?", username]}).then(function (user) {
        if (user != null) {
            console.log(user.Id);
        }
        callback(null, user);
    })

}

function saveUser_information(user_id, name, head, sex, description, callback) {
    user.update({
        Name: name,
        Head: head,
        Sex: sex,
        Description: description
    }, {fields: ['Name', 'Head', 'Sex', 'Description'], where: ["Id = ?", user_id]}).then(function (user) {
        callback(null, user);
    })
}

function getUser_information(id, callback) {
    user.findOne({where: ["Id=?", id]}).then(function (user) {
        if (user != null) {
            // console.log(user.Id);
        }
        callback(null, user);
    })

}

function get_information(id, callback) {
    user.findAll({
        'where': {
            'id': id
        }
    }).then(function (result) {
        callback(null, result);
    });
}

function get_Name(count, page, callback) {
    user.findAll({
        attributes: ['Name', 'Head', 'Description'],
        include: [{model: Portfolio, attributes: ['cover_url']}],
        offset: (page - 1) * count,
        limit: count,
    }).then(function (result) {
        callback(null, result);
    });
}

exports.getUser_information = getUser_information;
exports.saveUser_information = saveUser_information;
exports.insert = save;
exports.getUser = getUser;
exports.getUserCount = getUserCount;
exports.get_information = get_information;
exports.get_Name = get_Name;
exports.save_portfolio = save_portfolio;
exports.get_portfolio = get_portfolio;
exports.get_portfolio_by_id = get_portfolio_by_id;
exports.save_popularity = save_popularity;
exports.get_photos = get_photos;
exports.get_rank = get_rank;
exports.get_recent = get_recent;


