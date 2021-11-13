let fs = require('fs');
let path = require('path');

function organiseFn(dirPath){
    //console.log("Organise Command for", dirPath);
    //1. input -> directory path
    let destPath;
    if (dirPath == undefined){
        destPath = process.cwd();
        return;
    }
    else{
        let doesExist =  fs.existsSync(dirPath);
        if (doesExist){
            //2. create -> organise folder
            destPath = path.join(dirPath,"organised_files");
            if (fs.existsSync(destPath)== false){
                fs.mkdirSync(destPath);
            }
        }
        else{
            console.log("Enter Correct Path");
            return;
        }
    }

    organiseHelper(dirPath, destPath)




    
    
    //4. copy/cut file to orgnise directory inside category folder
}

function organiseHelper(src, dest){

    //3. check all file -> identify extention(category) in directory path
    let childName = fs.readdirSync(src)
    //console.log(childName);
    for (let i=0; i<childName.length;i++){
        let childAddress = path.join(src, childName[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile){
            let category = getCategory(childName[i]);
            //console.log(childName[i], "belongs to", category);
            sendFiles(childAddress,dest,category);
        }
    }

}

function getCategory(name){
    let ext = path.extname(name).slice(1);
    for (let type in types){
        let cTypeArray = types[type];
        for (let i=0; i<cTypeArray.length;i++){
           if (ext == cTypeArray[i]){
               return type;
           } 
        }
    }
    return "others";
}

function sendFiles(srcFilePath, dest , category){
    let categoryPath = path.join(dest, category);
    if(fs.existsSync(categoryPath) == false){
        fs.mkdirSync(categoryPath);
    }
    let filename = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, filename);
    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);
}

module.exports ={
    organiseKey : organiseFn
}