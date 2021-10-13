const Tarea = require('./tarea')
const colors = require('colors');

/**
 * _listado
 * { ''uuid-123123123-123123123-2: {id:12, desc:asd, completadoEn: 993213}}
 */
//  const Tarea = require('./models/tarea');

class Tareas {
 

    constructor(){
        this._listado = {};
    }

    cargarTareasFromDB( tareas = []){

        tareas.forEach( item => {

            // this._listado[ item.id ] = item;

            this._listado[ item.id ] = new Tarea
            (                
                item.desc,
                item.id,
                item.completadoEn
            );

        });

    }


     borrarTarea = ( id = "") =>{
        if(this._listado[id])  delete this._listado[id];
    }

    get listadoArr  () {
        let listado = [];
        Object.keys(this._listado).forEach( key => {
            let tarea = this._listado[key];            
            listado.push(tarea);
        });
        return listado;
    }
    //se iguala a string vacia para que el editor sepa que es de tipo string
    crearTarea(desc = ''){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea; 
        return tarea;
    }

    
    listadoCompleto(){

        console.log(); //para hacer un salto de linea
        
        this.listadoArr.forEach( ({ id,desc, completadoEn }, i) => {
            let str = `${ ((i+1) + '.').green } ${ desc } :: ${ (completadoEn)? 'Completada'.green : 'Pendiente'.red }`;  
            console.log( str );

        })

    }

    listarPendientesCompletadas ( completadas = true){
        
        console.log(); //para hacer un salto de linea
        let index = 0;
        
        this.listadoArr.forEach( tarea  => {
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn ) 
                                    ? 'Completada'.green
                                    : 'Pendiente'.red;
            
            if(!completadas && !completadoEn){
                console.log( `${  (  index  + '.').green } ${ desc } :: ${ estado }` );
            }


            if(completadas && completadoEn){
                console.log( `${  (  index + '.').green } ${ desc } :: ${ completadoEn.green }` );
            }
            ++index;
            // console.log( str );

        })

    }

    toogleCompletadas ( ids = [] ){

        ids.forEach( id => {

            const tarea = this._listado[id];
            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArr.forEach( tarea => {

            if ( !ids.includes( tarea.id ) ){
                this._listado[tarea.id].completadoEn = null; 
            }

        });


    } 

}




module.exports = Tareas;