const sanitize = require('sanitize-html');
const github = require('../services/github').getRepo;

exports.search = (req,res) => {
    //const searchQuery = req.body.userQuery;
    const searchQuery = sanitize(req.query.userQuery,{allowedAttributes: {}, allowedTags: []});
    //const page = req.params.page || 1;
    //const perPage = 10;

    console.log(searchQuery);

    if(!searchQuery){
        return res.json({code: 0,message: `Please enter a valid Project Name`});
    }else{
        github(req,res,searchQuery);
    }
}

