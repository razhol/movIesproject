let axios = require('axios');

exports.getAllmovies = function(){
    return axios.get("https://api.tvmaze.com/shows");
}
