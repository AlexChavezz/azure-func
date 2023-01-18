const client = require("../db/client");
const messagesConnection = client.db('portfolio').collection('messages');
const usersConnection = client.db('portfolio').collection('users');

module.exports = async function (context, req) {
    const { userName, password } = req.body;
    try {
        await client.connect();

        const results = await Promise.all([
            usersConnection.findOne({ name: userName, password }),
            messagesConnection.find({}).toArray()
        ])
        console.log(results)
        if (!results[0]) {
            return context.res = {
                status: 401,
                body: { "message": "You're not authorized to view this content" }
            }
        }
        context.res = {
            status: 200,
            body: results
        }
    }
    catch (error) {
        context.res = {
            status: 500
        }
    }
    finally {
        await client.close();
    }
}