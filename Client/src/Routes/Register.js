import axios from 'axios';
import React, {  useState } from 'react'
import {
  Form, Input,
  Button, Label,
  FormGroup, Row, Col
} from 'reactstrap'
import {
  FaUserPlus
} from 'react-icons/fa'
import { useNavigate, Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('');
  const [ confPassword, setConfPassword ] = useState('');
  // const [getSecQstns, setGetSecQstns] = useState([]);
  const [ secQstn, setSecQstn] = useState('');
  const [ secAns, setSecAns ] =useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const navigate = useNavigate();

  // useEffect(()=>{

  //   (async()=>{
  //     const res  = await axios.get('/api_v1/auth/sec_qstn');
  //     console.log(JSON.parse(res.data))
  //     setGetSecQstns( JSON.parse(res.data) );      
  //   })()

  // },[])

  const validateForm = ()=>{
    
    const validEmail = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
    const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
    const validName = new RegExp('^[A-Za-z]+$');
    const validPhone = new RegExp('^[0-9]{10}$');

    if( !validName.test(firstName) || !validName.test(lastName) ){
        
      setFirstName('');
      setLastName('');
      toast.error('firstname and lastname should only consist of alphabets!');
      return false;

    }

    if( !validEmail.test(email) ){
      
      setEmail('');
      toast.error('invalid email address!');
      return false;

    }
    
    if( !validPhone.test(phoneNo)){
      setPhoneNo('');
      toast.error('Phone no should only consists 10 digits of characters 0-9');
      return false;
    }

    if( !validPassword.test(password) ){
      setPassword('');
      setConfPassword('');
      toast.error('Password shold consist of Minimum eight characters, at least one letter and one number:');
      return false;
    }

    if( password !== confPassword ){
      setPassword('');
      setConfPassword('');
      toast.error('Password and confirmation password do not match');
      return false;
    }

    return true

  }
  
  const resetFormFields = ()=>{
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setConfPassword('')
    setSecQstn('')
    setSecAns('')
    setPhoneNo('')

  }

  const handleSubmit = async (e)=>{

    e.preventDefault();
    e.stopPropagation();
    if(!validateForm()){                                  //handle formValidation error
      return;
    }    

    axios.post( '/api_v1/auth/register',{      
      
        first_name:firstName,
        last_name:lastName,
        email:email,
        password:password,
        sec_qstn:secQstn,
        sec_ans:secAns,
        phone_no:phoneNo
      
    } ).then( (res)=>{
        
      if(res.status === 201){
        toast.success("Registration Successfull !");
        navigate('/auth/login');
      }else{
        toast.error(res.reponse.data);
      }

    } ).catch( (err)=>{
                                                            //handle Client Errors
      toast.error(err.response.data.msg);
      resetFormFields();
      console.error(err);

    } )


  }

  return (
    <section>
      <ToastContainer/>
      <div className='auth-bg' >
        <Form className='auth-info' onSubmit={handleSubmit} >
          <h3 className='text-center' > <FaUserPlus/> Register</h3>
          <Row>
            <Col md={6} >
              <FormGroup>                
                <Label htmlFor='first_name' >First Name : </Label>
                <Input 
                  type='text' 
                  name='first_name' 
                  id="first_name"
                  value={firstName}
                  onChange={(e)=>{ setFirstName(e.target.value) }}
                  required
                  ></Input>
              </FormGroup>
            </Col>
            <Col md={6} >
              <FormGroup>
                <Label htmlFor='last_name' >Last Name : </Label>
                <Input 
                  type='text' 
                  id="last_name" 
                  name="last_name" 
                  value = {lastName}
                  onChange = { (e)=>{ setLastName(e.target.value) } }
                  required
                ></Input>
              </FormGroup>
            </Col>                       
          </Row>
          <Row>
            <Col md={6} >
              <FormGroup>
                <Label htmlFor='email'>Email : </Label>
                <Input 
                type='email' 
                id='email'
                value = { email }
                onChange = { (e)=>{ setEmail(e.target.value) } }
                required
              ></Input>
              </FormGroup>
            </Col>
            <Col md={6} >
              <FormGroup>
                  <Label htmlFor='phone_no'>Phone No : </Label>
                  <Input 
                  type='text' 
                  id='phone_no'
                  value = { phoneNo }
                  onChange = { (e)=>{ setPhoneNo(e.target.value) } }
                  required
                  ></Input>
                </FormGroup>
            </Col>
          </Row>
           

            <FormGroup>
              <Label htmlFor='password'> Password</Label>
              <Input 
                id='password' 
                type='password' 
                value = {password}
                onChange={ (e)=>{ setPassword(e.target.value) } }
                required
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='confirm_password'>Confirm Password</Label>
              <Input 
                id='confirm_password' 
                type='password' 
                value = { confPassword }
                onChange = { (e)=>{ setConfPassword(e.target.value) } }
                required
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='sec_qstn' >
                Select secret question
              </Label>
              <select
                className='form-select' 
                name='sec_qstn' 
                id='sec_qstn'
                value = { secQstn } 
                onChange={(e)=>{ setSecQstn(e.target.value) }} 
                required
              >
                <option value=''  >----Select Secret Question----</option>
                <option value='What is your pet name ?' >What is your pet name ?</option>
                <option value='What is your nick name ?' >What is your nick name ?</option>
                <option value='What is your native city ?' >What is your native city ?</option>
                <option value='what is your favorite color ?' >what is your favorite color ?</option>
                {/* {
                  getSecQstns.forEach( (qstn)=>{
                    return (
                      <option value={qstn.title} >{qstn.title}</option>
                    )
                  } )
                } */}
              </select> 
            </FormGroup>
            <FormGroup>
              <Label htmlFor='sec_ans'>Secret Answer</Label>
              <Input 
                type="text"
                value = {secAns}
                onChange = { (e)=>{ setSecAns(e.target.value) } }
                required
              ></Input>
            </FormGroup>

            <Button type='submit'>Register</Button>
            <div className='mt-3'>
              <p className='text-secondary'>
                Already have an account Login {"   "}
                <Link className='text-primary' to={"/login"} >here</Link>
              </p>
          </div>
        </Form>
      </div>
    </section>
  )
}

export default Register;