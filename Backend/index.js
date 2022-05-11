require('dotenv').config();
const express = require('express');
const app = express();



const db = require('./config/db_config')

app.use( express.json() )
app.use( express.urlencoded({extended:true} ) );



//testnig Connection
app.get('/api', (req, res)=>{
  
  console.log("req from client");
  res.json({"msg":"hello you reached the server"});
  res.end();
})

app.post('/api/auth/login', (req, res)=>{

  console.log(req.body);
  res.json("req received");

})

app.post( '/api/auth/register', (req, res)=>{

  console.log(req.body);
  res.json({'msg':'reg form sent'}).end();

} )



const PORT = process.env.PORT || 3001;
app.listen(PORT, (res, err)=>{
  console.log(`Server running at port ${PORT}`)
})