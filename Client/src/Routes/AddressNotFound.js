import React from 'react'
import '../404.css';
import {FaQuestionCircle} from 'react-icons/fa'

export default function AddressNotFound() {
  return (
    <section className='page-404'>
      <div className="mainbox">
        <div className="err">4</div>
        <FaQuestionCircle className="far fa-question-circle fa-spin"></FaQuestionCircle>
        <div className="err2">4</div>
        <div className="msg">Maybe this page moved? Got deleted? Never existed in the first place?<p>Let's go 
        <a href="/login">Login</a> and try from there.</p></div>
      </div>
    </section>
  )
}
