import Mock from 'mockjs';
import fs from 'fs';


function createCName(num,str=''){
    const Random = Mock.Random
    let i=0;
    const names=[];
    while(i<num){
        names.push(Random.cname()+str);
        i++
    }
    return names
}
const num=200;
const realNames=createCName(num);
console.log(realNames.length)
const realNamesJson=JSON.stringify(realNames)

let a=fs.promises.writeFile("../names.txt",realNamesJson,{flag:"a"});
a.then(()=>{
    console.log('保存完毕');
})

