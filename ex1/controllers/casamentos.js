var Casamento = require('../models/casamentos.js')

// Returns Casamento list
module.exports.list = () => {
    return Casamento
        .find()
        .sort({_id:1})
        .exec()
}

module.exports.listFields = () => {
    return Casamento
        .find()
        .select({"date": 1, "title": 1, "ref": 1, "_id": 0})
        .sort({_id:1})
        .exec()
}

module.exports.lookUp = id => {
    return Casamento
        .findOne({_id: id})
        .exec()
}

module.exports.lookUpName = name => {
    return Casamento
        .find({title: {$regex: name}})
        .exec()
}

module.exports.lookUpYear = year => {
    return Casamento
        .find({date: {$regex: year}})
        .exec()
}

module.exports.lookUpAggregate = () => {
    return Casamento
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
    return Casamento
        .find()
        .select({"title": 1})
        .exec()
}

module.exports.insert = cas => {
    var newCasamento = new Casamento(cas)
    return newCasamento.save()
}

module.exports.delete = id => {
    return Casamento
        .deleteOne({_id: id})
        .exec()
}

module.exports.update = cas => {
    _id = cas["_id"]
    delete cas["_id"]
    return Casamento
        .replaceOne({_id: id}, cas)
        .exec()
}