# Backend-Practice
In this repository i'm gonna to practice Backend (Express.js, Node.js, MongoDB,Api creation, Api Integration, AWS)

On 16 oct 2024 - Create a Simple Server.
{
    Today i learn how to create Server with Http, use createServer method, 
    What is Controler and why use res.end
}

On 17 oct 2024 - Create server with Express.js 
{

    in Express.js define first method and then Route
    Ex- express.get('/', (req, res)=>{
    });

===================================================================
    While Creating API :- occur two case
        case 1. same two method but
                different both Route
        case 2. same two Route but 
                different both method
===================================================================
    Way to send data
    1. Query - Not part of url
               Send multiple date 
               user can define key
    
     Ex- http://localhost:3300?name=jubeda&age=32&contact=jubeda@gmail.com

    2. Params - send single data 
                server can define key

     Ex- http://localhost:3300/name=jubeda
===================================================================
    Export and Import
    1. for object export
        module.export = PersonalDetails;
    
    2. for oblect export
        module.export = {
            PersonalDetails,
            user
        }
    3. Direct export
        export.PersonalDetails = {
            fname: 'john',
            lname:'joy',
            age:30
        }
} 

On 18 oct 2024 - Middleware
{
    1. fs file concept
        show path of dir and file
            console.log(__dirname, __filename) 

        //create file in public folder
            Ex- fs.writeFileSync('./public/index.html', 'Using Read Function.');

            Ex- fs.writeFileSync('./public/index.txt', 'first txt file');

        //read file
            Ex- fs.readFile('./public/index.html', 'utf-8', 
                (error, date) => {
                console.log(date);
            });

        //update on flie
            Ex- fs.appendFileSync('./public/index.html', ' Updating in index.html file')

        //if file available or not
            Ex- fs.existsSync(`${__dirname}/public/index.html`);


        //delete file
            Ex- fs.unlinkSync('./public/hello.html');
===========================================================================
    2. Topic- Middleware

        //Middleware
        const middleware = (req, res, next/cb) =>{

        };
        req - 
        res - 
        next/cb - 

        //router
        serrot.get('/',(req, res)=>{
        res.send('Welcome to New Api')
        });
        req- user side request
        res- server side request/developer side 
}

On 21 oct 2024 - Route level middleware, File uploadation
{
    //Trafic distribution or control through multiple "Router" And "Middleware"

    //file Uploadation
        ----Multer - 

}

On 22 oct 2024 - Database(MongoDB)
{
    Create - connecton between database(MongoDB) and aplication 
    Create - Database
    Create - collection

    staps - follow to create database
    1. install MongoDB Package 
        npm i MongoDB
    2. Import MongoDB
        const mongobd = require('mongodb);
    3. set url of MongoDB
        const MongoDBUrl = 'mongobd://localhost:27017';
    4. Create Database
        const dbname = 'jubeda_283';
    5. Create collection 
        const collection = db.collection('usres');
    6. set connection between mongobd and application
        firstly need a client

        const client = New MongoClient(MongoDBUrl);

        // these above all are the synchronous process, so need to make a Function

    7. Create Function which establish connection to the Database

            const connect = async () =>(
                await client.connect();
                const db = client.db(dbname);
                const collection = db.collection('users');

                return collection;
            );
    
    // Now Insert date in Database
    // create a function 
    //Function for inserting multple Data
    //Function for inserting multple Data
    // function for Read data from database
    // function for Search data from database
    // function for Update data in database
    // function for Delete data from database


}

On 23 oct 2024 - MongoDB Api - Read and Insert Api
{
    Essential steps to Follow--

    1. install MongoDB, Express, Multer
}

On 25 oct 2024 - MongoDB Api - Delete and Update Api
{
    Essential steps to Follow--
    1. 
}
