const axios = require('axios');

var getRepo = (req,res,searchQuery)=>{
    axios.get(`https://api.github.com/search/repositories?q=${searchQuery}&per_page=10&
    client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`).then((result)=>{
        //console.log(result.data.items);
        //return data;
        var main = [];
        //console.log(result.data.items);
        result.data.items.forEach(function(repo){
            var obj = {};
            obj.title = repo.name,
            obj.description = repo.description,
            obj.ownerName = repo.owner.login,
            obj.repoURL = repo.html_url
            main.push(obj);
        });
        return res.render('search',{repos: main});
    }).catch((e)=>{
        console.log(`Error in fetching the data from the github: ${e}`);
        return e;
    });
}

module.exports = {
    getRepo
};

