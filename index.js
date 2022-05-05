const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 4000;

const app = express();

//middleware
app.use(cors())
app.use(express.json())
//gmmosto
//7tAlair6BBabwAUF





const uri = "mongodb+srv://gmmosto:7tAlair6BBabwAUF@cluster0.rqmgq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const productCollection = client.db('blaptop').collection('product')
        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products)
        })

        app.get('/product/:id', async(req,res)=>{
          const id = req.params.id
          const query = {_id: ObjectId(id)}
          const product = await productCollection.findOne(query)
          res.send(product)
        })

        // app.post('/additem',(req, res) =>{
        //   const newUser = req.body;
        //   console.log('add new user',newUser);
        //   res.send('user data received')
        // })
    }
    finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('server is connected')
});

app.listen(port, () => {
    console.log("running port", port);
})
