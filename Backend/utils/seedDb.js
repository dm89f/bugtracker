const uuid = require('uuid')
const { genPswdHash } = require('../config/passportConfig')
// const { Authorization} = require('../models/');
// const { Developer } = require('../models');
// const { DevTeam } = require('../models');
// const { Ticket } = require('../models');
// const { Tpriority } = require('../models/Tpriority');
// const { Project } = require('../models');
// const { Tstatus } = require('../models/TstatusModel');
// const { Ttype } = require('../models');
const { SecQstn } = require('../models/SecQstnModel');

seedDB();

async function seedDB(){

  try{

    // await Tpriority.sync( {force:true} )
    // await Tstatus.sync( {alter:true} )
    // await Ttype.sync( {alter:true} )
    await SecQstn.sync( {alter:true} );
    // await Authorization.sync( { alter:true } );
    // await Developer.sync({alter:true});
    // await Project.sync({alter:true});
    // await Ticket.sync( {alter:true} );
    // await DevTeam.sync({ alter:true });

    // await seedTtype();
    // await seedTstatus();
    // await seedTpriority();
    await seedSecQstn(); 
    // await seedAuth();
    // await seedDev();
    // await seedProject();
    // await seedDevTeam();
    // await seedTicket();


  }catch( error ){

    console.log(error)

  }

}


async function seedTtype(){

  await Ttype.bulkCreate([
    { id:uuid.v1(), title:"issue" },
    { id:uuid.v1(), title:"bug" },
    { id:uuid.v1(), title:"error" },
    { id:uuid.v1(), title:"feature request" },
    { id:uuid.v1(), title:"other" },
  ])

}

async function seedTstatus(){

  await Tstatus.bulkCreate([
    {
      id:uuid.v1(),
      title:'new',
    },
    {
      id:uuid.v1(),
      title:'open',
    },
    {
      id:uuid.v1(),
      title:'in progress',
    },
    {
      id:uuid.v1(),
      title:'resolved',
    },
    {
      id:uuid.v1(),
      title:'additional info required',
    }
  ]);


}

async function seedTpriority(){
  await Tpriority.bulkCreate([
    {
      id:uuid.v1(),
      title:'low'
    },
    {
      id:uuid.v1(),
      title:'high'
    },
    {
      id:uuid.v1(),
      title:'medium'
    },
    {
      id:uuid.v1(),
      title:'immediate'
    }
  ]);
}

async function seedSecQstn(){
  await SecQstn.bulkCreate([
    {
      id:uuid.v1(),
      title:'What is your pet name ?',
    },
    {
      id:uuid.v1(),
      title:'What is your nick name ?',
    },
    {
      id:uuid.v1(),
      title:'What is your native city ?',
    },
    {
      id:uuid.v1(),
      title:'what is your favorite color ?'
    },

  ]);
}


async function seedAuth(){
  await Authorization.bulkCreate([
    {
      id:uuid.v1(),
      title:'junior dev'
    },
    {
      id:uuid.v1(),
      title:'senior dev'
    },
    {
      id:uuid.v1(),
      title:'admin'
    }
  ]);

}

// async function seedDev(){

//   await Developer.bulkCreate( [
//     {
//       id:uuid.v1(),
//       firstname:'dileep',
//       lastname:'bc',
//       email:'dileepwert@gmail.com',
//       phone_no:'1234567890',
//       secQstnId:'b3ea06a0-d1b4-11ec-ac37-f5176ea110d2',
//       sec_ans:'dog',
//       authorizationId:'b3ea2db0-d1b4-11ec-ac37-f5176ea110d2',     
//       password_hash:genPswdHash('dilidm121')
//     },
//     {
//       id:uuid.v1(),
//       firstname:'adam',
//       lastname:'west',
//       email:'adam@gmail.com',
//       phone_no:'9012234556',
//       secQstnId:'b3ea06a2-d1b4-11ec-ac37-f5176ea110d2',
//       sec_ans:'tiptur',
//       authorizationId:'b3ea2db2-d1b4-11ec-ac37-f5176ea110d2',
//       password_hash:genPswdHash('dilidm121')
//     },
//     {
//       id:uuid.v1(),
//       firstname:'robert',
//       lastname:'gump',
//       email:'robert@gmail.com',
//       phone_no:'9012123556',
//       secQstnId:'b3ea06a3-d1b4-11ec-ac37-f5176ea110d2',
//       sec_ans:'orange',
//       authorizationId:'b3ea2db1-d1b4-11ec-ac37-f5176ea110d2',
//       password_hash:genPswdHash('dilidm121')
//     }
// ] )

// }

// async function seedProject(){

//   await Project.bulkCreate([
//     {
//       id:uuid.v1(),
//       title:'Bugtracker',
//       contributed_by:'7b811ed0-d1b8-11ec-a571-35a8dd98ced7'
//     },
//     {
//       id:uuid.v1(),
//       title : 'News Aggregator',
//       contributed_by : '80473cf0-d1b9-11ec-ae73-7b150d63b36a'
//     },
//     {
//       id:uuid.v1(),
//       title:'E Commerce',
//       contributed_by:'804f5340-d1b9-11ec-ae73-7b150d63b36a'
//     }
//   ])

// }

// async function seedDevTeam(){

//   await DevTeam.bulkCreate([
    
//     {
//       developerId : '7b811ed0-d1b8-11ec-a571-35a8dd98ced7',
//       projectId : '4f7bd300-d1ba-11ec-a124-fb8196056390'
//     },
//     {
//       developerId:'80473cf0-d1b9-11ec-ae73-7b150d63b36a',
//       projectId:'4f7bd300-d1ba-11ec-a124-fb8196056390'
//     },
//     {
//       developerId:'804f5340-d1b9-11ec-ae73-7b150d63b36a',
//       projectId:'4f7bd300-d1ba-11ec-a124-fb8196056390'
//     }

//   ])

// }

// async function seedTicket(){

//   await Ticket.bulkCreate([
//     {
//       id:uuid.v1(),
//       title:'create react front-end',
//       description:' connect express and react, build ui',
//       time_est:new Date(Date.now() + 1000 * 60 * 60 * 24* 7),
//       projectId:'4f7bd300-d1ba-11ec-a124-fb8196056390',
//       raised_by_dev:'7b811ed0-d1b8-11ec-a571-35a8dd98ced7',
//       tpriorityId:'b3e9b881-d1b4-11ec-ac37-f5176ea110d2',
//       tstatusId:'b3e96a60-d1b4-11ec-ac37-f5176ea110d2',
//       ttypeId:'b3e8a713-d1b4-11ec-ac37-f5176ea110d2'      
//     },
//     {
//       id:uuid.v1(),
//       title:'add routes',
//       description:'add routes to backend',
//       time_est:new Date(Date.now() + 1000 * 60 * 60 * 24* 2),
//       projectId:'4f7bd300-d1ba-11ec-a124-fb8196056390',
//       raised_by_dev:'7b811ed0-d1b8-11ec-a571-35a8dd98ced7',
//       tpriorityId:'b3e9b882-d1b4-11ec-ac37-f5176ea110d2',
//       tstatusId:'b3e96a63-d1b4-11ec-ac37-f5176ea110d2',
//       ttypeId:'b3e8a710-d1b4-11ec-ac37-f5176ea110d2'      
//     },
//     {
//       id:uuid.v1(),
//       title:'create DB Schema',
//       description:'implement sequelize schema models',
//       time_est:new Date(Date.now() + 1000 * 60 * 60 * 24* 3),
//       projectId:'4f7bd300-d1ba-11ec-a124-fb8196056390',
//       raised_by_dev:'804f5340-d1b9-11ec-ae73-7b150d63b36a',
//       tpriorityId:'b3e9b882-d1b4-11ec-ac37-f5176ea110d2',
//       tstatusId:'b3e96a64-d1b4-11ec-ac37-f5176ea110d2',
//       ttypeId:'b3e8a714-d1b4-11ec-ac37-f5176ea110d2'      
//     },
//   ])

// }
