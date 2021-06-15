let Jsonusers = require('../Dell/JsonUsers')


exports.numberTransactions = async function (obj) {

    let data = await Jsonusers.getAllUsers();

    let arr = data.users.find(x => obj.username == x.username && obj.pwd == x.password)

    return arr.numTransactions;
}

exports.updateoradd = async function (obj) {
    let data = await Jsonusers.getAllUsers();
    let find = data.users.findIndex(x => x.username == obj.username)
    if (find == -1) {
        data.users.push(obj);
        let result = await Jsonusers.InsertUser(data);
        return result
    }
    else {
        data.users[find] = obj;
        let result = await Jsonusers.InsertUser(data);
        return result
    }

}

exports.findbyname = async function (obj) {

    let data = await Jsonusers.getAllUsers();

    let arr = data.users.find(x => x.username == obj)

    return arr;
}

exports.findByNameAndDelete = async function (name) {
    let data = await Jsonusers.getAllUsers();
    let Users = data.users.filter(x => name != x.username);
    let obj = { users: Users };
    let result = await Jsonusers.InsertUser(obj);
    return result

}

exports.getAllNamesUsers = async function () {

    let data = await Jsonusers.getAllUsers();

    let arr = data.users.map(x => x.username)

    return arr;
}


exports.HaveTransactions = async function (obj) {

    let data = await Jsonusers.getAllUsers();

    let arr = data.users.find(x => obj.username == x.username && obj.pwd == x.password)

    if (arr.numTransactions > 0) {
        return true
    }
    else {
        return false
    }
}


exports.checkUserExist = async function (obj) {

    let data = await Jsonusers.getAllUsers();

    let arr = data.users.find(x => obj.username == x.username && obj.pwd == x.password)


    if (arr) {
        return true
    }
    else {
        return false
    }

}

exports.IsAdmin = async function (obj) {

    let data = await Jsonusers.getAllUsers();

    let arr = data.users.find(x => obj.username == x.username && obj.pwd == x.password)
    if (arr.position == "admin") {
        return true
    }
    else {
        return false
    }

}