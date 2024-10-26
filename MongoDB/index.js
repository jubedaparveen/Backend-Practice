const { MongoClient } = require("mongodb");

// const mongodb = reqiure('mongodb');

const MongodbUrl = 'mongodb://localhost:27017';

const dbname = 'jubeda_283';

const client = new MongoClient(MongodbUrl);

const connect = async () =>{
    await client.connect();
    const db = client.db(dbname);
    const collection = db.collection('users');
    return collection;
}


// Now Insert date in Database
// create a function 
const insertDataDetails = async() =>{
    const collection = await connect();
    const dataDetails = {
        'name':'Jubeda Parveen',
        'city': 'Mhow, Indore',
        'contact': 'jubeda@gmail.com'
    };
    const responce = await collection.insertOne(dataDetails);
    console.log(responce);
};
// insertDataDetails();


//Function for inserting multple Data
const insertmultipleDataDetails = async () =>{
    const collection = await connect();
    const dataDetails = [
        {
            name : 'jub par',
            city : 'mhow',
            contact : 'jub@gmail.com'
        },{
            name : 'jube parv',
            city : 'mhow, indore',
            contact : 'jube@gmail.com'
        },{
            name : 'jubeda par',
            city : 'Indore',
            contact : 'jubeda@gmail.com'
        }
    ];
    const insertResponce = await collection.insertMany(dataDetails);
    console.log(insertResponce);
};
// insertmultipleDataDetails();


// function for Read data from database
const readData = async()=>{
    const collection = await connect();
    const findResponse = await collection.find().toArray();
    console.log(findResponse);
};
// readData();


// function for Search data from database
const searchData = async()=>{
    const collection = await connect();
    const searchResponse = await collection.find({name:'jub par'}).toArray();
    console.log(searchResponse);
};
// searchData();

// function for Update data in database
const updateData = async ()=>{
    const collection = await connect();
    const updateResponse = await collection.updateOne(
        {name:'jub par'},
        {
            $set:{age:35, status : 'active'}
        }
    );
    console.log(updateResponse);
};
// updateData();


// function for Delete data from database
const deleteData = async ()=>{
    const collection = await connect();
    const response = await collection.deleteOne({name: 'jub par'});
    console.log(response);
};
deleteData();
