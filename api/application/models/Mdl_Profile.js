const mysql = require('../heplers/database');

exports.GetProfile = async (nickname) => {
  return new Promise(async (resolve, reject) => {
    mysql.select({
      table: 'v_userdata',
      conditions: {
        nickname: nickname
      },
      limit: 1,
      show_query: true
    }, async (err, result) => {
      if (err) reject(err);
      if (result.length) {
        console.log(result.length);
        result[0].skills = await this.Skills(result[0]['id_usuario'])
        result[0].languages = await this.Languages(result[0]['id_usuario'])
        result[0].social = await this.Social(result[0]['id_usuario'])
        result[0].certifications = await this.Certifications(result[0]['id_usuario'])
        result[0].studies = await this.Studies(result[0]['id_usuario'])
        resolve(result[0]);
      } else {
        resolve(null);
      }

    });


  });
}

exports.GetUser = async (idUser) => {
  return new Promise(async (resolve, reject) => {
    mysql.select({
      table: 'v_userdata',
      conditions: {
        id_usuario: idUser
      },
      limit: 1,
      show_query: true
    }, async (err, result) => {
      if (err) reject(err);
      if (result.length) {
        console.log(result.length);
        result[0].skills = await this.Skills(idUser)
        result[0].languages = await this.Languages(idUser)
        result[0].social = await this.Social(idUser)
        result[0].certifications = await this.Certifications(idUser)
        result[0].studies = await this.Studies(idUser)
        resolve(result[0]);
      } else {
        resolve(null);
      }

    });


  });
}




exports.Skills = async (idUser) => {
  return new Promise(async (resolve, reject) => {
    mysql.select({
      table: 't_dat_detalles_usuario',
      fields: ['habilidades'],
      conditions: {
        f_id_usuario: idUser
      },
      limit: 1,
      show_query: true
    }, async (err, result) => {
      if (err) reject(err);
      console.log(result);
      resolve(result[0]['habilidades']);
    });


  });
}
exports.Languages = async (idUser) => {
  return new Promise(async (resolve, reject) => {
    mysql.select({
      table: 'v_idiomas',
      fields: ['Conversasional', 'Escritura', 'Idioma', 'Lectura'],
      conditions: {
        id_usuario: idUser
      },
      show_query: true
    }, async (err, result) => {
      if (err) reject(err);
      console.log(result.length);
      resolve(result);
    });


  });
}
exports.Studies = async (idUser) => {
  return new Promise(async (resolve, reject) => {
    mysql.select({
      table: 'v_estudios',
      fields: ['Carrera', 'Escuela', 'Pais'],
      conditions: {
        id_user: idUser
      },
      show_query: true
    }, async (err, result) => {
      if (err) reject(err);
      console.log(result.length);
      resolve(result);
    });


  });
}

exports.Certifications = async (idUser) => {
  return new Promise(async (resolve, reject) => {
    mysql.select({
      table: 't_dat_certificaciones',
      fields: ['nombre', 'institucion', 'fecha'],
      conditions: {
        f_id_usuario: idUser
      },
      show_query: true
    }, async (err, result) => {
      if (err) reject(err);
      console.log(result.length);
      resolve(result);
    });


  });
}

exports.Social = async (idUser) => {
  return new Promise(async (resolve, reject) => {
    mysql.select({
      table: 't_dat_rsociales',
      conditions: {
        f_id_usuario: idUser
      },
      show_query: true
    }, async (err, result) => {
      if (err) reject(err);
      console.log(result.length);
      resolve(result);
    });
  });
}
