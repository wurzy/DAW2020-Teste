var Batismo = require('../models/batismo.js')

// Returns Casamento list
module.exports.list = () => {
    return Batismo
        .find()
        .sort({_id:1})
        .select({"_id": 1, "date": 1, "title": 1, "ref": 1})
        .exec()
}

module.exports.listAll = ()=>{
    return Batismo
        .find()
        .sort({_id:1})
        .exec()
}

module.exports.listFields = () => {
    return Batismo
        .find()
        .sort({_id:1})
        .select({"_id": 1, "pai": 1, "mae": 1})
        .exec()
}

module.exports.lookUp = id => {
    return Batismo
        .findOne({_id: id})
        .exec()
}

module.exports.lookUpAggregate = () =>{
    return Batismo
    .aggregate(
        [
            {
                $group: {
                    _id: '$date',
                    total: { "$sum": 1 }
                }
            },
            { 
                $project: {  
                    _id: 0,
                    date: "$_id",
                    total: 1
                }
          }
        ]
    )
    .exec()
}

module.exports.lookUpYear = year => {
    return Batismo
        .find({date: {$regex: year}})
        .exec()
}

module.exports.insert = cas => {
    var newBatismo = new Casamento(cas)
    return newBatismo.save()
}

module.exports.delete = id => {
    return Batismo
        .deleteOne({_id: id})
        .exec()
}

module.exports.update = cas => {
    _id = cas["_id"]
    delete cas["_id"]
    return Batismo
        .replaceOne({_id: id}, cas)
        .exec()
}