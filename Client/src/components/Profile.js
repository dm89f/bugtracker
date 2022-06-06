import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {TiTick} from 'react-icons/ti'
import {
  Row, Col, Card, CardBody, CardFooter, CardHeader, Button,
  Form, FormGroup, Input, Label
} from 'reactstrap'
import { API } from '../constants/routes'

import { useGetDev } from '../contexts/UserContext'
import { AppError } from '../utils/handleError'
import {getDevStats, updatePassword} from '../utils/utils'


const DevInfo =()=>{
  
  
  const dev = useGetDev();
  useEffect(()=>{
  },[dev]);

  return(
    <section>
      <Row className='border-bottom mb-3'>
        <Col xs={6} sm={3}>
          <p className='fw-bolder'>Fullname : </p>
        </Col>
        <Col xs={6}>
          { dev && `${dev.firstname} ${dev.lastname}` }
        </Col>
      </Row>
      <Row className='border-bottom mb-3'>
        <Col xs={6} sm={3}>
          <p className='fw-bolder'>Role : </p>
        </Col>
        <Col xs={6}>
          { dev && dev.authorization }
        </Col>
      </Row>
      <Row className='border-bottom mb-3'>
        <Col xs={6} sm={3}>
          <p className='fw-bolder'>First Name : </p>
        </Col>
        <Col xs={6}>
          { dev && dev.firstname }
        </Col>
      </Row>
      <Row className='border-bottom mb-3'>
        <Col xs={6} sm={3}>
          <p className='fw-bolder'>Last Name : </p>
        </Col>
        <Col xs={6}>
          { dev&&dev.lastname  }
        </Col>
      </Row>
      <Row className='border-bottom mb-3'>
        <Col xs={6} sm={3}>
          <p className='fw-bolder'>Phone No : </p>
        </Col>
        <Col xs={6}>
          { dev&&dev.phone_no  }
        </Col>
      </Row>
      <Row className='border-bottom mb-3'>
        <Col xs={6} sm={3}>
          <p className='fw-bolder'>Email : </p>
        </Col>
        <Col xs={6}>
        { dev&&dev.email  }

        </Col>
      </Row>
    </section>
  )


}

const DevStats =()=>{

  const [devStats, setDevStats] = useState({});

  useEffect(()=>{
    init();
  },[])

  async function init(){

    try{
      const data = await getDevStats();
      setDevStats(data);
    }catch(err){
      console.log(err)
    }

  }

  return(
    <div>
      <Row>
        <Col xs={6} >
          <p className='fw-bolder' >No of Projects Contributed</p>
        </Col>
        <Col xs={6} >
          <p>{ devStats.no_projects_contributed }</p>
        </Col>
      </Row>
      <Row>
        <Col xs={6} >
          <p className='fw-bolder' >No of Projects involved</p>
        </Col>
        <Col xs={6} >
          <p>{devStats.no_team}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={6} >
          <p className='fw-bolder' >No of Tickets Raised</p>
        </Col>
        <Col xs={6} >
           <p>{devStats.no_tickets_raised }</p>
        </Col>
      </Row>
    </div>
  )

}

const ResetPassword = ()=>{

  const [secQstns, setSecQstns] = useState([]);

  const [ selSecQstn, setSelSecQstn ] = useState('');
  const [secAns, setSecAns] = useState('');
  const [pswd, setPswd] = useState('');
  const [repPswd, setRepPswd] = useState('');



  useEffect(()=>{
    init();
  });

  async function init(){

    try{

      const resp = await axios.get( API.GET_SEC_QSTNS, { withCredentials:true } );
      setSecQstns(JSON.parse(resp.data))

    }catch(err){

    }

  }


  const handleEditPswd = async(e)=>{
    e.preventDefault();
    try{

      if( pswd !== repPswd ) throw new AppError("password do not match Equal");
      
      const data = await updatePassword( selSecQstn, secAns, pswd );
      console.log(data);

    }catch(error){
      console.log(error)
    }

  }


  return(
    <section>
      <Row className='mt-5'>
          <Form onSubmit={ handleEditPswd }>
            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor='sec_qstn'> Select Secret Question</Label>
                  <Input
                    id={"sec_qstn"}
                    name={"sec_qstn"}
                    type='select'
                    required
                    value={selSecQstn}
                    onChange={(e)=>{ setSelSecQstn(e.target.value) }}
                  >
                    <option value="" >---SELECT QUSETION---</option>
                    {
                      secQstns&&secQstns.map( (item)=>{
                        return(
                          <option key={item.title} value={item.value} >{item.title}</option>
                        )
                      } )
                    }
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor='sec_asn'>Secret Answer</Label>
                  <Input 
                    required
                    onChange={(e)=>{ setSecAns(e.target.value) }}
                    value={secAns} 
                    id='sec_asn' 
                    type='text'
                  ></Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label htmlFor='pswd'>Password</Label>
                  <Input required id='pswd' type='password' value={pswd} onChange={(e)=>{setPswd( e.target.value) }}  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor='rep_pswd'>Repeat Password</Label>
                  <Input required id='rep_pswd' type='password' value={repPswd} onChange={(e)=>{setRepPswd( e.target.value) }}  ></Input>
                </FormGroup>
              </Col>
            </Row>
            <Button color='success' type='submit' >Update Password</Button>
          </Form>

      </Row>
    </section>
  )

} 


function Profile() {

  const [resetPswd, setResetPswd ] = useState(false);

  function toggleResetPswd(){
    setResetPswd((prev)=>(!prev));
  }

  const dev = useGetDev();
  useEffect(()=>{
  },[dev])

  return (
    <section className='p-2 profile-cntnr'>
      <Row>
        <Col className='mb-3' lg={8} >
          <Card  className='shadow'  >
            <CardHeader>
              Profile 
            </CardHeader>
            <CardBody>
              <DevInfo/>
              <div className='d-flex justify-content-center' >
                <Button onClick={toggleResetPswd} color='danger'>ResetPassword</Button>
              </div>
              {
                resetPswd&&<ResetPassword/>
              }
            </CardBody>
          </Card>
        </Col>

        <Col>
        <Card className='shadow' lg={4} >
          <CardHeader>
            Dev Stats 
          </CardHeader>
          <CardBody>
            <DevStats/>
          </CardBody>
        </Card>

        </Col>
      </Row>

    </section>
  )
}

export default Profile