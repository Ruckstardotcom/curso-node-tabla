
const { inquirerMenu,
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist } = require('./helpers/inquirer');

const Tareas = require('./models/tareas');
const { guardarDB , leerDB } = require('./helpers/fileHandler');
const Tarea = require('./models/tarea');
require('colors');


 

const main = async () => {

    let opt = "";
    const tareas = new Tareas();

    const tareasDB = leerDB( tareas._listado );
    if( tareasDB ){

        tareas.cargarTareasFromDB( tareasDB );
    }    
    await pausa();
    do {

        opt = await inquirerMenu();

        switch(opt){
            case '1':
                // crear opcion
                const desc = await leerInput("Descripcion:");
                const tar = tareas.crearTarea(desc);
             
                console.log(desc);
            break;

            case '2':
                // console.log( tareas.listadoArr );
                tareas.listadoCompleto();
                break;
            case '3':   //listar completadas
                tareas.listarPendientesCompletadas();
                break; 
            case '4':  //listar pendientes
                tareas.listarPendientesCompletadas(false);
                break; 
            case '5':  //listar pendientes
                const ids = await  mostrarListadoChecklist( tareas.listadoArr);
                tareas.toogleCompletadas(ids);
            break; 
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if(id !== '0' ){
                    
                    const ok = await confirmar('¿Está Seguro?');
                    // console.log( { ok } );
                    if( ok ){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }

                }
                
                break;
        }
        
        guardarDB( tareas.listadoArr  );
        
        
        await pausa();

    } while( opt !== "0" )
}

main();