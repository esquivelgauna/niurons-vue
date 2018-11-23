const mysql = require('../heplers/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_Secret = 'NvTfMrR';


exports.Lyfs = async (idLyf) => {
  return new Promise(async (resolve, reject) => {
    if (idLyf) {
      mysql.select({
        table: 't_dat_usuario',
        conditions: {
          email: email
        },
        limit: 1,
        show_query: true
      }, async (err, result) => {
        if (err) reject(err);

      });
    } else {
      mysql.select({
        table: 't_dat_usuario',
        conditions: {
          email: email
        },
        limit: 1,
        show_query: true
      }, async (err, result) => {
        if (err) reject(err);
   
      });
    }

  });
}

exports.checkUser = async (password, passwordHash) => {
  const match = await bcrypt.compare(password, passwordHash);
  console.log(match);
  return match;

}


exports.token = (data) => {
  return new Promise((resolve, reject) => {
    console.log('Doing token ...');
    let myToken = jwt.sign({
      id: data['id_usuario'],
      seller: data['bool_vendedor'],
      name: data['nombre'],
      lastName: data['apellido'],
      nickname: data['nickname'],
      img: data['imagen_perfil'],
      email: data['email'],
      email_2: data['email_secundario']
    }, JWT_Secret, {
      expiresIn: 864000 // expires in 24 hours
    });
    resolve(myToken);
  });
}
