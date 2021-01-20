var Batismo = require('../models/batismo.js')

// Returns Casamento list
module.exports.list = () => {
    return Batismo
        .find()
        .sort({_id:1})
        .select({"_id": 1, "date": 1, "title": 1, "ref": 1})
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

module.exports.lookUpName = name => {
    return Batismo
        .find({title: {$regex: name}})
        .exec()
}

module.exports.lookUpYear = year => {
    return Batismo
        .find({date: {$regex: year}})
        .exec()
}

module.exports.lookUpAggregate = () => {
    return Batismo
        .aggregate(
            [
                {
                    $group: {
                        _id: '$date',
                        casamentos: {
                            $push: {ref: "$ref", title: "$title"}
                        } 
                    }
                },
                { 
                    $project: {  
                        _id: 0,
                        date: "$_id",
                        casamentos: 1
                    }
              }
            ]
        )
        .exec()
}

module.exports.lookUpEngaged = year => {
    return Batismo
        .find()
        .select({"title": 1})
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