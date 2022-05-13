require('dotenv').config();
const express = require('express');
const app = express();
const {Developer} = require('./models');
const session = require('express-session');
const { db } = require('./config/dbConfig');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const LocalStratefy = require('passport-local');
const { verifyCallback, genPswdHash, customFields } = require('./config/passportConfig');
const {authRouter} = require('./routes/api_v1/auth');
const { projectsRouter } = require('./routes/api_v1/projectsRouter');

const myStore = new SequelizeStore({
  checkExpirationInterval:15*60*1000,
  db:db.sequelize
});
myStore.sync();

app.use( session({
  secret:process.env.SESSION_SECRET,
  store:myStore,
  resave:false,
  saveUninitialized:false,
  cookie:{
    sameSite:'lax',
    httpOnly:true,
    maxAge:30*24*60*60*1000 //in milli sec
  }
}) )
app.use( express.json() )
app.use( express.urlencoded({extended:true} ) );

//passport config
app.use( passport.initialize() );
app.use( passport.session() );
const strategy = new LocalStratefy( customFields, verifyCallback );
passport.use(strategy);
passport.serializeUser( (user, done)=>{

  console.log("user : ", user);
  
  done(null, user.id);
} );
passport.deserializeUser( (userId, done)=>{

  ( async( userId, done )=>{
      const dev = await Developer.findOne( {
        where:{
          id:userId
        }
      } );
      if(dev){
        done(null, dev);
      }else{
        done(null, false);
      }
  } )(userId, done);

} )


//routers
app.use( '/api_v1/auth', authRouter )
app.use( '/api_v1/projects', projectsRouter  )

//testing session
app.get( '/', (req, res)=>{

  if( req.session.countPageView ){

    req.session.countPageView++

  }else{

    req.session.countPageView=1;

  }

  console.log(req.session.countPageView);

  res.send('page view'+req.session.countPageView);

} );

app.get( '/notAuthorized', (req, res)=>{

  res.statusCode = 401 ;
  res.statusMessage = "Unauthrized";
  
} )

app.use( (err, req, res, next)=>{

  const{ message='internal server error', status = 500 } = err;
  console.error(err);
  res.status(status).json({
    "msg":message
  })


} )




const PORT = process.env.PORT || 3001;
app.listen(PORT, (res, err)=>{
  console.log(`Server running at port ${PORT}`)
})