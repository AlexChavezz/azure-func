const client = require("../db/client");

const messagesConnection = client.db('portfolio').collection('messages');

module.exports = async function (context, req) {
   
    try
    {
        await getConnection();
        const data = await messagesConnection.find({}).toArray();
        context.res ={
            status: 200,
            body: data
        }
        await closeConnection();
    }
    catch(error)
    {
        context.res = {
            status: 500
        };
    }

}


async function getConnection()
{
    await client.connect();
    console.log('Connected to mongoDB');
    return client.db('portfolio').collection('messages');
}

async function closeConnection()
{
    await client.close();
    console.log('Connection closed');
}