const github = require('../services/github').getRepo;

exports.search = (req,res) => {
    const searchQuery = req.body.userQuery;
    console.log(searchQuery);
    if(!searchQuery){
        return res.json({code: 0,message: `Please enter a valid Project Name`});
    }else{
        github(req,res,searchQuery);
    }
}

