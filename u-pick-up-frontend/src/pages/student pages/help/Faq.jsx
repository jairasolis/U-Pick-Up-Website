import React from 'react'
import './Faq.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

// import components
import Navbar2 from '../../../components/navbar/Navbar2'
import LeftBar from '../../../components/leftBar/LeftBar'


const Faq = () => {
  return (
    <div className='faq' style={{display:'flex'}}>
      <div className="faq-content">
        <div className='header'>
          <div className="faq-header">
            <h1> FAQs </h1>
          </div>
        </div>
        
        <main>
          <div className="faq-cards">
            <div className="cards">
              <FontAwesomeIcon icon={faPlus} style={{color:'#516E53'}}/>
            </div>
            <div className="cards">
              <FontAwesomeIcon icon={faPlus} style={{color:'#516E53'}}/>
            </div>
            <div className="cards">
              <FontAwesomeIcon icon={faPlus} style={{color:'#516E53'}}/>
            </div>
            <div className="cards">
              <FontAwesomeIcon icon={faPlus} style={{color:'#516E53'}}/>
            </div>
            <div className="cards">
              <FontAwesomeIcon icon={faPlus} style={{color:'#516E53'}}/>
            </div>
            <div className="cards">
              <FontAwesomeIcon icon={faPlus} style={{color:'#516E53'}}/>
            </div>
            <div className="cards">
              <FontAwesomeIcon icon={faPlus} style={{color:'#516E53'}}/>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Faq
