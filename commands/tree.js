let fs = require('fs');
let path = require('path');

function treeFn(dirPath){
    //let destPath;
    if (dirPath == undefined){
        process.cwd();
        treeHelper(process.cwd(),"")
        return;
    }
    else{
        let doesExist =  fs.existsSync(dirPath);
        if (doesExist== true){
            console.log("s");
            treeHelper (dirPath, "");   
}
    }
}

function treeHelper(dirPath, indent){
    //is file or folder
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile == true){
        let fileName = path.basename(dirPath);
        console.log(indent + "----" +fileName);
        return;
    }
    else{
        let dirName = path.basename(dirPath)
        console.log(indent + "----" + dirName);
        let children = fs.readdirSync(dirPath);
        for (let i=0;i<children.length;i++){
            let childrenPath = path.join(dirPath, children[i]);
            treeHelper(childrenPath, indent + "\t");
        }

    }
}

module.exports ={
    treeKey : treeFn
}