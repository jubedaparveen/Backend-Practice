# Backend-Practice
<h2> In this repository i'm gonna to practice Backend (Express.js, Node.js, MongoDB,Api creation, Api Integration, AWS)</h2>

<h3> On 16 oct 2024 - Create a Simple Server </h3> <br>
{
    Today i learn how to create Server with Http, use createServer method, 
    What is Controler and why use res.end
}

<h3> On 17 oct 2024 - Create server with Express.js </h3> <br>
{

    in Express.js define first method and then Route
    Ex- express.get('/', (req, res)=>{
    });
}

==================================================================
{
    <br>While Creating API :- occur two case<br>
        case 1. same two method but<br>
                different both Route<br>
        case 2. same two Route but <br>
                different both method<br>
}
===================================================================
{
    <br>Way to send data <br>
    1. Query - Not part of url
               Send multiple date 
               user can define key
    
     Ex- http://localhost:3300?name=jubeda&age=32&contact=jubeda@gmail.com

    2. Params - send single data 
                server can define key

     Ex- http://localhost:3300/name=jubeda
}
===================================================================
{
    <br>Export and Import <br>
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

<h3> On 18 oct 2024 - Middleware </h3> <br>
{
    <br>1. fs file concept
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
    <br>2. Topic- Middleware

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

<h3> On 21 oct 2024 - Route level middleware, File uploadation </h3> <br>
{
    //Trafic distribution or control through multiple "Router" And "Middleware"

    //file Uploadation
        ----Multer - 

}

<h3> On 22 oct 2024 - Database(MongoDB) </h3> <br>
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

<h3> On 23 oct 2024 - MongoDB Api - Read and Insert Api </h3> <br>
{
    Essential steps to Follow--

    1. install MongoDB, Express, Multer
}

<h3> On 25 oct 2024 - MongoDB Api - Delete and Update Api </h3> <br>
{
    Essential steps to Follow--
    1. 
}

<h3> On 26 oct 2024 - Mongoose  </h3> <br>
{
    method -post- create-user
                   const data = new User(req.body);
                   const saveResponse = await data.save(); 

            put - Update-user
                const response = await User.updateOne(
                    req.params,
                    {
                        $set:req.body
                    }

            delete - delete-user
                 const response = await User.deleteOne(req.params);
   
            get - read-user
                const response = await User.find();    
}
<h3> On 28 oct 2024 - Admin-Panel </h3> <br>
{
    Start Concept of MVC (Model, View, Controller, )

}
