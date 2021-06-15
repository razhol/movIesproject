let jsonfile = require('jsonfile');

exports.getAllUsers = function()
{
    return new Promise((resolve,reject) =>
    {
        jsonfile.readFile(__dirname + "/Users.json",function(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data);
            }
        })
    })
    
}

exports.InsertUser = function(obj)
{
    return new Promise((resolve,reject) =>
    {
        jsonfile.writeFile(__dirname + "/Users.json",obj,function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve("Created");
            }
        })
    })
    
}