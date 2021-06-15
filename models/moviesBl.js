let newMovies = require('../Dell/NewMoviesDell')

let RestMovies = require('../Dell/RestMoviesDell')


exports.SaveMovie = async function (obj) {
   let objArr = await newMovies.getMovies();
   objArr.movies.push(obj);
   let status = await newMovies.savemovie(objArr);
   return status
}

exports.findMovieByGener = async function (obj) {
   let objArr1 = await RestMovies.getAllmovies();
   let objArr2 = await newMovies.getMovies();
   let arr = []
   obj.forEach(function (x) {
      x.genres.forEach(function (item) {
         item1 = objArr1.data.filter(y => y.id >= 1 && y.id <= 10 && x.name != y.name && y.genres.filter(z => item == z).length != 0)
      })
   })
   obj.forEach(function (x) {
      x.genres.forEach(function (item) {
         item2 = objArr2.movies.filter(y => y.id >= 1 && y.id <= 10 && x.name != y.name && y.genres.filter(z => item == z).length != 0)
      })
   })
   item1.forEach(x => arr.push(x.name))
   item2.forEach(x => arr.push(x.name))
   return arr;
}

exports.findDataByName = async function (obj) {
   let restmovieArr = await RestMovies.getAllmovies();
   let newmovieArr = await newMovies.getMovies();
   result = restmovieArr.data.find(x => obj == x.name);
   if (!result) {
      result = newmovieArr.movies.find(x => obj == x.name);
   }
   return result;
}


exports.searchmovie = async function (obj) {
   let objArr = await RestMovies.getAllmovies();
   let result = []
   if (obj.name != '' && obj.Gener != '' && obj.Language != '') {
      result = objArr.data.filter(x => x.name == obj.name && x.genres.filter(y => obj.Gener == y) && x.language == obj.Language)

   }
   else if (obj.name != '' && obj.Gener != '' && obj.Language == '') {
      result = objArr.data.filter(x => x.name == obj.name && x.genres.filter(y => obj.Gener == y))

   }
   else if (obj.name != '' && obj.Gener == '' && obj.Language != '') {
      result = objArr.data.filter(x => x.name == obj.name && x.language == obj.Language)

   }
   else if (obj.name == '' && obj.Gener != '' && obj.Language != '') {
      result = objArr.data.filter(x => x.id <= 10 && x.id >= 1 && x.genres.filter(y => obj.Gener == y) && x.language == obj.Language)

   }
   else if (obj.name != '' && obj.Gener == '' && obj.Language == '') {
      result = objArr.data.filter(x => x.name == obj.name)

   }
   else if (obj.name == '' && obj.Gener != '' && obj.Language == '') {
      result = objArr.data.filter(x => x.id <= 10 && x.id >= 1 && x.genres.filter(y => obj.Gener == y))

   }
   else if (obj.name == '' && obj.Gener == '' && obj.Language != '') {
      result = objArr.data.filter(x => x.id <= 10 && x.id >= 1 && x.language == obj.Language)

   }

   console.log(result.length)
   if (result.length == 0) {
      return "movie not found"
   }
   else {
      return result;
   }

}

exports.searchmovienew = async function (obj) {
   let objArr = await newMovies.getMovies();
   let result = []
   if (obj.name != '' && obj.Gener != '' && obj.Language != '') {
      result = objArr.movies.filter(x => x.name == obj.name && x.genres.filter(y => obj.Gener == y) && x.language == obj.Language)

   }
   else if (obj.name != '' && obj.Gener != '' && obj.Language == '') {
      result = objArr.movies.filter(x => x.name == obj.name && x.genres.filter(y => obj.Gener == y))

   }
   else if (obj.name != '' && obj.Gener == '' && obj.Language != '') {
      result = objArr.movies.filter(x => x.name == obj.name && x.language == obj.Language)

   }
   else if (obj.name == '' && obj.Gener != '' && obj.Language != '') {
      result = objArr.movies.filter(x => x.id <= 10 && x.id >= 1 && x.genres.filter(y => obj.Gener == y) && x.language == obj.Language)

   }
   else if (obj.name != '' && obj.Gener == '' && obj.Language == '') {
      result = objArr.movies.filter(x => x.name == obj.name)

   }
   else if (obj.name == '' && obj.Gener != '' && obj.Language == '') {
      result = objArr.movies.filter(x => x.id <= 10 && x.id >= 1 && x.genres.filter(y => obj.Gener == y))

   }
   else if (obj.name == '' && obj.Gener == '' && obj.Language != '') {
      result = objArr.movies.filter(x => x.id <= 10 && x.id >= 1 && x.language == obj.Language)

   }

   if (result.length == 0) {
      return "movie not found"
   }
   else {
      return result;
   }

}




exports.getAllgenters = async function () {
   let geners = [];
   let moviesRest = await RestMovies.getAllmovies();
   let arrgenters = moviesRest.data.map(x => x.genres)
   for (let i = 0; i < arrgenters.length; i++) {
      for (let j = 0; j < arrgenters[i].length; j++) {
         geners.push(arrgenters[i][j])
      }
   }
   let arr = [''];
   let unique = [...new Set(geners)];
   for (let index = 0; index < unique.length; index++) {
      arr.push(unique[index]);
   }
   return arr;
}

exports.getAllanguages = async function () {
   let languages = [];
   let languagesRest = await RestMovies.getAllmovies();
   let arrlanguages = languagesRest.data.map(x => x.language)
   for (let i = 0; i < arrlanguages.length; i++) {
      languages.push(arrlanguages[i])
   }
   let arr = [''];
   let unique = [...new Set(languages)];
   for (let index = 0; index < unique.length; index++) {
      arr.push(unique[index]);
   }
   return arr;
}



exports.checklength = async function () {

   let moviesRest = await RestMovies.getAllmovies();
   let count = 0

   moviesRest.data.forEach(x => count++);

   return count;
}

exports.checkjsonlength = async function () {
   let newmovies = await newMovies.getMovies();
   let arr = newmovies.movies;
   let length = arr.length
   return length + 1;
}


