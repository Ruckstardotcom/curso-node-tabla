const inquirer = require('inquirer');
const colors = require('colors');
const { validate } = require('uuid');


const menuOpts = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
            value: "1",
            name: "1. Crear Tarea"
            } 
            ,{
                value: "2",
                name: '2. Listar Tarea'
            }   
            ,{
                value: "3",
                name: '3. Listar Tareas completadas'
            }   
            ,{
                value: "4",
                name: '4. Listar Tareas pendientes'
            }    
            ,{
                value: "5",
                name: '5. Completar Tarea(s)'
            }   
            ,{
                value: "6",
                name: '6. Borrar Tarea'
            }   
            ,{
                value: "0",
                name: '0. Salir'
            }   
        ] 
}];

const inquirerMenu = async() =>{

    console.clear();

    console.log("==============================".green);        
    console.log("    Seleccione una opcion".green);        
    console.log("==============================\n".green);
    
    const { opcion } = await inquirer.prompt(menuOpts);
    return opcion;
}


const listadoTareasBorrar = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,  
            name:  `${ idx } ${ tarea.desc }`       
        }  

    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = 
    [{
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
    }];

    const { id } = await inquirer.prompt( preguntas );
    return id;
}





const mostrarListadoChecklist = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,  
            name:  `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn )  ?
                true : false       
        }  

    }); 

    const pregunta = 
    [{
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
    }];

    const { ids } = await inquirer.prompt( pregunta );
    return ids;
}


const confirmar = async message => {

    const question = [{

        type: 'confirm',
        name: 'ok',
        message
    }];

const { ok } = await inquirer.prompt( question );
return ok;
};

const pausa = async() => {

    const optPausa = [
        {
            type: 'input',
            name: 'pausa',
            message: `Presione ${ colors.bgGreen('ENTER') } para continuar `,
        }
    ];

    console.log(`
    `)
    await inquirer.prompt(optPausa);
}

const leerInput = async( message ) => {
    
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if( value.length === 0 ){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt( question );
    return desc;

}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}