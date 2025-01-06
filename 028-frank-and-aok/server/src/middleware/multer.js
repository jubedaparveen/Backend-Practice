const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:(req, file, next) =>{
        next(null, './src/uploadfiles')
    },
    filename:(req, file, next) =>{
        next(null, Date.now() + Math.floor(Math.random() * 999999) + path.extname(file.originalname))
    }
});

const multerupload = multer({storage}).fields([
    {name: 'thumbnail', maxCount: 1},
    {name: 'secondary_thumbnail', maxCount: 1},
    {name: 'images', maxCount: 10},
    {name: 'bannerimg', maxCount: 1},
]);

module.exports = multerupload;