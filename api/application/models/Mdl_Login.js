const mysql = require('../heplers/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_Secret = 'NvTfMrR';


exports.Login = async (email, password) => {
  return new Promise( async (resolve, reject) => {
    mysql.select({
      table: 't_dat_usuario',
      conditions: {
        email: email
      },
      limit: 1,
      show_query: true
    }, async (err, result) => {
      if (err) reject(err);
      if (result) {
        if (result.length > 0) {
          // console.log(result);
          if (await this.checkUser(password, result[0]['password'])) {
            resolve({
              status: true,
              message: 'Sesion iniciada correctamente',
              token: await this.token(result[0]),
            });
          } else {
            resolve({
              status: false,
              message: 'Correo y/o contraseña incorrectos.'
            });
          }
        } else {
          resolve({
            status: false,
            message: 'El correo no esta registrado.'
          });
        }
      } else {
        resolve({
          status: false,
          message: 'El correo no esta registrado.'
        });
      }
    });
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
