function helpFn(){
    console.log(`
    All Commands -->
        node main.js tree "directoryPath"
        node main.js organise "directoryPath"
        node main.js help 
    `);
}

module.exports = {
    helpKey : helpFn
}