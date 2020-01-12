var db = require('../models/index');

module.exports.findAll = (req, res) => {
    db.Users.findAll().then(
           (results) => {
               res.status(200).send({
                   status: "success",
                   results: results
               });
           }
       ).catch(() => {
           res.status(500).send({
               status: "error"
           })
       })
};

module.exports.findOne = (req, res) => {
    db.Users.findById(req.params.id, {
        include: [{
          model: db.Notes
        }]
      }).then(
        (result) => {
            if(result) {
                res.status(200).send(result)
            } else {
                res.status(404).send()
            }
        }
    )
}


// // module.exports.getHomeworks=(req,res)=>{
// //     //de implementat
    
    
// }