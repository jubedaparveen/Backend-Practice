const fs = require('fs');

// show path of dir and file
// console.log(__dirname, __filename) 

//create file in public folder
// fs.writeFileSync('./public/index.html', 'Using Read Function.');

// fs.writeFileSync('./public/index.txt', 'first txt file');

//read file
// fs.readFile('./public/index.html', 'utf-8', 
//     (error, date) => {
//     console.log(date);
// });

//update on flie
// fs.appendFileSync('./public/index.html', ' Updating in index.html file')

//if file available or not
fs.existsSync(`${__dirname}/public/index.html`);


//delete file
// fs.unlinkSync('./public/hello.html');