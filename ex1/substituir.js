const { json } = require('express')
var jsonFile = require('./batismos.json')
var fs = require('fs')

jsonFile.forEach(json => {
    json._id = json.ref.replace(/\//g, '_')
    var pais = json.title.split("Pai: ")[1].split("; Mãe: ")
    json.pai = pais[0]
    json.mae = pais[1]
})

// null, 2 para ele colocar line breaks entre os objetos, senao fica ilegivel

fs.writeFileSync('batismos-fixed.json',JSON.stringify(jsonFile, null, 2), err => {
    if(err) console.log("erro: " + err)
    else console.log("ok, fixed casamentos.json")
})

console.log(jsonFile)