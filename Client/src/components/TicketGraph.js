import React, { useEffect, useState } from 'react'
import {useTheme} from '../contexts/ThemeContext';
import { getTicketStats  } from '../utils/devUtils'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { Doughnut } from 'react-chartjs-2'
ChartJS.register(ArcElement, Tooltip, Legend);


function TicketGraph({ type }) {

  const Ttype  = {}
  const tStatus  = {}
  const tPriority  = {}

  let [graphTstatus, setGraphTstatus ] = useState({});
  let [graphTpriority,setGraphTpriority ] = useState({});
  let [graphTtype, setGraphTtype ] = useState({});
  useEffect(()=>{

    init();

  },[])





  async function init(){
    try{
      
      const data = await getTicketStats();
      // console.log(data);
      for( let item in data ){

        let ans = new Map();
        for( let item2 in data[item ]){
          // console.log(data[item][item2].title)
          ans.set( data[item][item2].title, data[item][item2].size )
        }
        
        if(item === "cntTstatuses"){
          ans.forEach( (val, key)=>{
            tStatus[key]=val;
          } )  ;
          // console.log(tStatus);        
        }else if( item === "cntTpriorities" ){
          ans.forEach( (val, key)=>{
            tPriority[key]=val;
          } )  ;
          // console.log(tPriority); 
        }else if( item === 'cntTtypes' ){
          ans.forEach( (val, key)=>{
            Ttype[key]=val;
          } )  ;
          // console.log(Ttype); 
        }
      }



      setGraphTstatus( {
        labels:Object.entries(tStatus).map( (key, val)=>{
          return key[0]}) ,
        datasets: [
          {
            label: 'Ticket by Status',
            data: Object.entries(tStatus).map( (key, val)=>{
              return key[1]}),
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      })

      setGraphTpriority( {
        labels: Object.entries(tPriority).map( (key, val)=>{
          return key[0]}),
        datasets: [
          {
            label: 'Ticket by Priority',
            data: Object.entries(tPriority).map( (key, val)=>{
              return key[1]}),
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      })

      setGraphTtype({
        labels: Object.entries(Ttype).map( (key, val)=>{
          return key[0];
        } ),
        datasets: [
          {
            label: 'Ticket by Type',
            data: Object.entries(Ttype).map( (key, val)=>{
              return key[1];
            } ),
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }
      )

    }catch(error){
      console.log(error)
    }
  }


  const darkTheme = useTheme()

  return (
    <section className={`tickets-graph-container ${darkTheme?"d-theme":""}`}>
      <div className={`mt-3 ticket-graph card shadow ${darkTheme?"d-theme":""}`} >
        <h5 className={`card-header ${darkTheme?"d-theme":""}`} >Tickets by Priority</h5>
        <div className='card-body'>
          {
            graphTpriority.datasets &&<Doughnut data={graphTpriority} />
          }
        </div>
        
      </div>
      <div className={`mt-3 ticket-graph card shadow ${darkTheme?"d-theme":""}`} >
        <h5 className={`card-header ${darkTheme?"d-theme":""}`} >Tickets by Status</h5>
        <div className='card-body'>
          {
            graphTstatus.datasets &&<Doughnut data={graphTstatus} />
          }
        </div>
        
      </div>
      <div className={`mt-3 ticket-graph card shadow ${darkTheme?"d-theme":""}`} >
        <h5 className={`card-header ${darkTheme?"d-theme":""}`} >Tickets by Type </h5>
        <div className='card-body'>
          {
            graphTtype.datasets &&<Doughnut data={graphTtype} />
          }
        </div>
        
      </div>
    </section>

  )
}

export default TicketGraph