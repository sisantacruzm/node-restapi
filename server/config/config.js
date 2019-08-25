
// ===============================
// Base de Datos Atlas
// ===============================
// Usuario => mongoadmin
// Clave   => pzGxdvcjnmWAY4N9
// mongodb+srv://mongoadmin:pzGxdvcjnmWAY4N9@cluster0-llytp.mongodb.net/cafe


// ===============================
// Entorno
// ===============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===============================
// Base de Datos
// ===============================

let urlDB

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://mongo:27017/cafe'
} else {
    urlDB = 'mongodb+srv://mongoadmin:pzGxdvcjnmWAY4N9@cluster0-llytp.mongodb.net/cafe'
    urlDB = process.env.MONGODB_URI
}

process.env.URLDB = urlDB

// ===============================
// Puerto
// ===============================

process.env.PORT = process.env.PORT || 3000;