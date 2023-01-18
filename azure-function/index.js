const client = require("../db/client");

const messagesConnection = client.db('portfolio').collection('messages');
module.exports = async function (context, req) {
    // -> [post]
    const requestParams = req.body;
    try
    {
        if(validateFields(requestParams))
        {
            await client.connect();
            console.log('Connected to mongoDB');
            await messagesConnection.insertOne(requestParams);
            await client.close();
            console.log('Connection closed');
        }

        context.res = {
            body: {ok: true, message:"Message sent successfully"},
            contentType: 'application/json'
        };
    }
    catch(error)
    {
        console.log(error)
        context.res = {
            status: 500
        };
    }
}


function validateFields({email, name, message})
{
    const emailRegEx = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');
    if(!emailRegEx.test(email))
    {
        return false;
    }
    if(name.trim().length === 0)
    {
        return false;
    }
    if(message.trim().length === 0)
    {
        return false;
    }
    return true;
}