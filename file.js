//importing files
const fs =require('fs');
fs.readFile('./docs/blog1.txt',(err,data) =>{
    if(err){
        console.log(err);
    }
    console.log('file was read');
    console.log(data.toString());
});
//writing files

fs.writeFile('./docs/blog2.txt','hello, techies',() =>{
    console.log('file was written');
});
//creating a folder if not exists else remove it
if(!fs.existsSync('./assets')){
    fs.mkdir('./assets', (err) => {
        if(err){
            console.log(err);
        }
        console.log('folder created');
    })
}
else{
    fs.rmdir('./assets' , (err) => {
        if(err){
            console.log(err);
        }
        console.log('folder deleted');
    });
}
//deleting a folder if exists
if(fs.existsSync('./docs/deleteme.txt')){
    fs.unlink('./docs/deleteme.txt', (err) =>{
        if(err){
            console.log(err);
        }
        console.log('file deleted');
    })
}
else{
    console.log('file not exists');
}
