import React from 'react'
import {
  Row,
  Col,
  Button
} from 'reactstrap'

import {
  FaEdit
} from 'react-icons/fa'

export const Project = () => {
  return (
   <section className='hero-contnr'>
    <section className='container-fluid mt--5'>
      <div className='row'>
        <div className='col-xl-4 mt-3'>
          <div className='shadow card'>
            <div className='card-header'>
              <div className='row align-items-center mb-2'>
                <div className='col'>
                  <h7 className='mb-0' >Team</h7>
                </div>
                <div className='col'>
                  <Button className=' btn-sm d-block ms-auto'>Add New Member</Button>
                </div>
              </div>
              <div className='table-responsive'>
                <table className='align-items-center table-flush table'>
                  <thead className='thead-light'>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col"></th>
                  </thead>
                  <tbody>
                    <tr className='teamRow'>
                      <th>Dileep B C</th>
                      <td>abc@gmail.com</td>
                      <td>01234567890</td>
                      <td>:</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='card-footer'>Footer</div>
            </div>

          </div>
        </div>
        <div className='col-xl-8 mt-3'>
          <div className='shadow card'>
            <div className='card-header'>
              <div className='row align-items-center mb-2'>
                <div className='col'>
                  <h7 className='mb-0' >Team</h7>
                </div>
                <div className='col'>
                  <Button className=' btn-sm d-block ms-auto'>Raise New Ticket</Button>
                </div>
              </div>
              <div className='table-responsive'>
                <table className='align-items-center table-flush table'>
                  <thead className='thead-light'>
                    <th scope="col">Ticket Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Author</th>
                    <th scope="col"></th>
                  </thead>
                  <tbody>
                    <tr className='teamRow'>
                      <th>add chat function</th>
                      <td>chat Funcationality</td>
                      <td>Dileep</td>
                      <td>:</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='card-footer'>Footer</div>
            </div>

          </div>
        </div>
      </div>
      <div className='row mt-5'>
        <div className='shadow card'>
          <div className='card-header'>
            <h6>Selected Ticket Info</h6>
          </div>
          <div className='card-body'>
          <div className='row'>
            <div className='col-xl'>
              <div className='row mt-3'>
                <div className='shadow card'>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col'>
                        <h6>Ticket Title</h6>
                      </div>
                      <div className='col'>
                        <h6>Ticket Author </h6>
                      </div>
                      <div className='col'>
                        <h6>Ticket Discription</h6>
                      </div>
                      <div className='col'>

                      </div>
                    </div>
                    <div className='row'>
                      <div className='col'>
                        <h6>Dileep</h6>
                      </div>
                      <div className='col'>
                        <h6>test </h6>
                      </div>
                      <div className='col'>
                        <h6>Test</h6>
                      </div>
                      <div className='col'>                        
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col'>
                        <h6>Dileep</h6>
                      </div>
                      <div className='col'>
                        <h6>test </h6>
                      </div>
                      <div className='col'>
                        <h6>Test</h6>
                      </div>
                      <div className='col'>                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl'>
              <div className='shadow card mt-3'>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col'>
                      Messages
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          </div>
        </div>        
      </div>

    </section>
   </section>
  )
}
