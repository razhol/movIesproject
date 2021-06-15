
let jsonfile = require('jsonfile');

exports.savemovie = function(obj)
{
    return new Promise((resolve,reject) =>
    {
        jsonfile.writeFile(__dirname + "/NewMovies.json",obj,function(err)
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

exports.getMovies = function()
{
    return new Promise((resolve,reject) =>
    {
        jsonfile.readFile(__dirname + "/NewMovies.json",function(err,data)
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