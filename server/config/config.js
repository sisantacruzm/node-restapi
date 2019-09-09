
// ===============================
// Base de Datos Atlas
// ===============================
// Usuario => mongoadmin
// Clave   => pzGxdvcjnmWAY4N9
// mongodb+srv://mongoadmin:pzGxdvcjnmWAY4N9@cluster0-llytp.mongodb.net/cafe

let urlDB

// ===============================
// Entorno
// ===============================

process.env.NODE_ENV = process.env.MONGODB_URI || 'dev';

// ===============================
// Vencimiento de Token
// ===============================
// 60 segundos
// 60 Minutos
// 24 Horas
// 30 Dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30

// ===============================
// SEED de Autenticación
// ===============================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'

// ===============================
// Base de Datos
// ===============================

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://mongo:27017/cafe'
} else {
    urlDB = process.env.MONGODB_URI
}

process.env.URLDB = urlDB

// ===============================
// Puerto
// ===============================

process.env.PORT = process.env.PORT || 3000;

// ===============================
// Google ClientID
// ===============================

process.env.CLIENT_ID = process.env.CLIENT_ID || '193216986521-rq7ts263q08drd3bgvpnu64rc1mgqcd7.apps.googleusercontent.com'
