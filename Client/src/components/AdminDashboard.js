import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col, Card, CardBody, CardHeader, CardFooter, Button, Form} from 'reactstrap'

import {getAllDevs, getDevInfoUtil, updateDevRole} from '../utils/adminUtils'
import {FaEdit} from 'react-icons/fa'
import {toast} from 'react-toastify'

import { useGetDev } from '../contexts/UserContext'



function AdminDashboard() {

  const [devs, setDevs] = useState([]);
  const admin = useGetDev();
  const [ dev, setDev ] = useState({});
  const [ devInfo, setDevInfo ] = useState({});
  const [ editRole, setEditRole ] = useState(false);
  const [role, setRole] = useState('');

  useEffect( ()=>{
    getdevs();
  },[] );

  
  async function getdevs(){
    
    const data = await getAllDevs();
    setDevs(data);
    setDev(data[0]);
    getDevInfo(data[0].id)

  }

  //to get dev stats
  const getDevInfo = async (devId)=>{
    try{
      
      const data = await getDevInfoUtil(devId);
      setRole(dev.authorization && dev.authorization.title);
      setDevInfo(data);

    }catch(err){
      console.log(err)
    }
  } 

  //to update dev Role
  const updateDeveloperRole = async (e)=>{
    e.preventDefault();
    try{

      if( dev.id === admin.userId ) throw new Error("cannot update the developer");
      await updateDevRole( dev.id, role);
      setEditRole((prev)=>(!prev))
      await getdevs();
      toast.success("dev role updated successfully");

    }catch(error){
      toast.error(error.message);
    }
  }


  return (
    <section className='admin-dashboard'>
      <Row>
        
        <Col md={4} >
          <Card>
            <CardHeader> <span className='fs-4 fw-bolder'>Developers</span> </CardHeader>
            <CardBody>
              <Row className='border-bottom'>
                <Col><span className='fs-5 fw-bolder'>Name</span></Col>
                <Col><span className='fs-5 fw-bolder'>Role</span></Col>
              </Row>
              {
                devs.map( (dev)=>{
                  return(
                    <Row onClick={()=>{ setDev(dev); getDevInfo(dev.id)  }}  className='py-1 border-bottom' key={dev.id}>
                      <Col>{dev.fullName}</Col>
                      <Col>{dev.authorization.title}</Col>
                    </Row>
                  )
                } )
              }
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </Col>
        
        <Col md={5} >
          <Card>
              <CardHeader><span className='fs-4 fw-bolder'>Developer Info</span></CardHeader>
              <CardBody> 

                <div className='table-responsive'>
                  <table className='table'>
                    <tbody>
                      <tr> 
                        <th>
                          <span className='fs-6'>
                            Name 
                          </span>
                        </th> 
                        <td>:</td>
                        <td >
                          <span className='fs-6'>
                            { dev.fullName }
                          </span>
                        </td>
                      </tr>
                      <tr> 
                        <th>
                          <span className='fs-6'>
                            Role 
                          </span>

                        </th> 
                        <td>:</td>
                        <td >
                          <span className='fs-6'>
                            { dev.authorization && dev.authorization.title }
                            {
                                editRole ? 
                                <div className='my-2'>
                                  <Form onSubmit={updateDeveloperRole}>
                                    <select className='form-select' 
                                      required
                                      value={role} 
                                      onChange={(e)=>{
                                      setRole(e.target.value);
                                    }} >
                                      <option value={""}>--SELECT--ROLE--</option>
                                      <option value="senior dev">Senior Dev</option>
                                      <option value="junior dev">Junior Dev</option>
                                      <option value="admin">Admin</option>
                                    </select>
                                    <div>
                                      <Button type='submit' color='primary' className='mx-1 mt-2'>Save</Button>
                                      <Button className='mx-1 mt-2'>Cancel</Button>
                                    </div>
                                  </Form>
                                </div>
                                :  
                                <span className='fs-6 mx-5' onClick={()=>{ setEditRole((prev)=>(!prev)) }} >
                                  <FaEdit color='darkblue' size={20} />
                                </span>
                              }
                          </span>
                        </td>
                      </tr>
                      <tr> 
                        <th>
                          <span className='fs-6'>
                            Email 
                          </span>
                        </th> 
                        <td>:</td>
                        <td >
                          <span className='fs-6'>
                            { dev.email }
                          </span>
                        </td>
                      </tr>
                      <tr> 
                        <th>
                          <span className='fs-6'>
                            Phone 
                          </span>
                        </th> 
                        <td>:</td>
                        <td >
                          <span className='fs-6'>
                            { dev.phone_no } 
                          </span>
                        </td>
                      </tr>
                      <tr> 
                        <th>
                          <span className='fs-6'>
                            No of Projects Contributed
                          </span>
                        </th> 
                        <td>:</td>
                        <td >
                          <span className='fs-6'>
                            { devInfo.no_tickets_raised}
                          </span>
                        </td>
                      </tr>

                      <tr> 
                        <th>
                          <span className='fs-6'>
                            No of Projects involved :
                          </span>
                        </th> 
                        <td>:</td>
                        <td >
                          <span className='fs-6'>
                            { devInfo.no_projects_contributed} 
                          </span>
                        </td>
                      </tr>

                      <tr> 
                        <th>
                          <span className='fs-6'>
                            No of Tickets Raised
                          </span>
                        </th> 
                        <td>:</td>
                        <td >
                          <span className='fs-6'>
                            { devInfo.no_team}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
              <CardFooter> </CardFooter>
          </Card>
        </Col>
      </Row>
    </section>
  )
}

export default AdminDashboard