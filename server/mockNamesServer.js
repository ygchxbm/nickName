import express from 'express';
import Mock from 'mockjs';
const app=new express();
app.use(express.urlencoded());

app.get('/test',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send('123')
})

app.post('/getNames',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const language=req.body["language"];
    const nameStyle=req.body["nameStyle"];
    const namesNumber=req.body["namesNumber"];
    let referenceNames=[];
    if(req.body["referenceNames"].length>0){
        referenceNames=req.body["referenceNames"].split(',');
    }
    console.log(referenceNames,language,nameStyle,namesNumber)
    const names=createNames(referenceNames,language,nameStyle,namesNumber);
    res.send(JSON.stringify(names))

})

function createNames(referenceNames,language,nameStyle,num){
    const realNames=[];
    const aiNames=[];
    let i=0;
    if(referenceNames.length===0){
        const Random = Mock.Random;
        if(language==='中文'){
            while(i<num){
                const name=Random.cname()
                aiNames.push(name+nameStyle);
                realNames.push(name)
                i++
            }
        }
    }else {
        const length=referenceNames.length;
        while(i<length){
            const name=referenceNames[i]
            aiNames.push(name+nameStyle);
            realNames.push(name)
            i++
        }
    }
    return {
        realNames,
        aiNames
    }

}

app.listen(3000,()=>{
    console.log('localhost:3000')
})



