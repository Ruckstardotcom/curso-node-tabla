const { v4: uuidv4} = require('uuid');

class Tarea {
    id='';
    desc='';
    completadoEn= null;
    
    constructor( desc, id = "", completadoEn = null) {
        this.desc = desc;
        this.id = ( id === "" ) ? uuidv4() : id;
        this.completadoEn = completadoEn;
    }

    // constructor(desc ) {
    //     this.id = uuidv4();
    //     this.desc = desc;
    // }
}



module.exports = Tarea;