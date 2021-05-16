const { all } = require("../routes");

const { Facultad, Departamento, Rol} = require('../models/index');
let  Createinitial= async (next)=>{
    
    facultades=[
      {centro_de_costo: 254, nombre: 'ciencias exactas', descripcion: 'ciencias' },
      {centro_de_costo: 259, nombre: 'idiomas', descripcion: 'shjdsuc' },
      {centro_de_costo: 245, nombre: 'bienestar', descripcion: 'hfuef' },
      {centro_de_costo: 254, nombre: 'ingenieria', descripcion: 'hzdjswdf' },
      {centro_de_costo: 255, nombre: 'salud', descripcion: 'sbchf' },
      {centro_de_costo: 235, nombre: 'eduacion', descripcion: 'sbchfbvjrg' }
    ];
    const  departamentos= [
      {nombre: 'fisica', descripcion: 'shfduswfhe', facultades_id: 1 },
      {nombre: 'quimica', descripcion: 'dfhewgvev', facultades_id: 1},
      {nombre: 'bienestar', descripcion: 'djvhrjv', facultades_id: 3 },
      {nombre: 'biologia', descripcion: 'asbvd', facultades_id: 1 },
      {nombre: 'idiomas', descripcion: 'ddjvherjvr', facultades_id: 2 },
      {nombre: 'Ing ambiental', descripcion: 'huehv', facultades_id: 4 },
      {nombre: 'Ing electronica', descripcion: 'huehv', facultades_id: 4 },
      {nombre: 'Ing electrica', descripcion: 'huehv', facultades_id: 4 },
      {nombre: 'Ing sistemas', descripcion: 'huehv', facultades_id: 4 },
      {nombre: 'medicina', descripcion: 'huehv', facultades_id: 5 },
      {nombre: 'enfermeria', descripcion: 'huehv', facultades_id: 5 },
      {nombre: 'odontología', descripcion: 'huehv', facultades_id: 5 },
      {nombre: 'Lic matematica', descripcion: 'huehv', facultades_id: 6 },
      {nombre: 'Lic fisica', descripcion: 'huehv', facultades_id: 6 },
      {nombre: 'Lic lenguas', descripcion: 'huehv', facultades_id: 6 }
    ];
    const  roles=[
      {nombre: 'ESTUDIANTE', descripcion: 'toda la U' },
      {nombre: 'DECANATURA', descripcion: 'facultad' },
      {nombre: 'VICERRECTORIA', descripcion: 'administrativos' },
      {nombre: 'PROFESOR', descripcion: 'toda la U' },
      {nombre: 'COORDINACION', descripcion: 'departamento' },
      {nombre: 'ADMIN', descripcion: 'plataforma' }
    ];
    for (var i=0; i<facultades.length; i++){
      const facultad= await Facultad.build(facultades[i]);
      await facultad.save();
    };
    for (var i=0; i<departamentos.length; i++){
        const departamento= await Departamento.build(departamentos[i]);
        await departamento.save();
        console.log("se guardo");
      };
    for (var i=0; i<roles.length; i++){
        const rol= await Rol.build(roles[i]);
        await rol.save();
    };
    console.log("se crearon satisfactoriamente");

    next;

};
module.exports = { Createinitial};