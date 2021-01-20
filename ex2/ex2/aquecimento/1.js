var json = require('./lvl3.json')
var i = 0;
json.forEach(j =>{
    if(j.codigo.match(/^750/)){
        i++;
    }
})
console.log(i)