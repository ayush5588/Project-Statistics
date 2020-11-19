const axios = require('axios');

var getRepo = (req,res,searchQuery)=>{
    axios
      .get(
        `https://api.github.com/search/repositories?q=${searchQuery}+in:name,description&per_page=15&sort=stars&order=desc&
    client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`
      )
      .then((result) => {
        const count = result.data.total_count;
        if(count == 0){
            return res.render("results", {message: `No repository found related to search query...`,repos: []});
        }
        var main = [];
        result.data.items.forEach(function(repo) {
            var obj = {};
            obj.title = repo.name;
            obj.description = repo.description;
            obj.ownerName = repo.owner.login;
            obj.stars = repo.stargazers_count;
            obj.repoURL = repo.html_url;
            main.push(obj);
        });
        return res.render("results", {
          repos: main , 
          message: '',
          title: searchQuery});
      })
      .catch((e) => {
        console.log(`Error in fetching the data from the github: ${e}`);
        return e;
      });
}

module.exports = {
    getRepo
};

