const fs = require('fs');

const path = './bd/ListaTareas.json';

const guardarDB = ( archivo = "" ) => {

    fs.writeFileSync( path, JSON.stringify( archivo ) );

}   

const leerDB = () => {

    if( !fs.existsSync( path ) ){
        return null;
    }

    const info = fs.readFileSync( path, { encoding: "utf-8" });
    const data = JSON.parse( info );
    console.log( data );
    return data;

}

module.exports = {
    guardarDB,
    leerDB
}