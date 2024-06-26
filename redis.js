const redis = require('redis')
const dotenv = require('dotenv')
dotenv.config()

const redisClient = ()=>{
    return  redis.createClient({
        url : process.env.redis_server_url
    }
    )
}
const client =redisClient();
client.on('error' ,(err)=>{
    console.log(err)
});

client.on('connect' ,()=>{
    console.log('connected to redis')
});

client.on('end' ,()=>{
    console.log('redis connection ends')
});

client.on('SIGQUIT' ,()=>{
    client.quit()
});

module.exports = client;

