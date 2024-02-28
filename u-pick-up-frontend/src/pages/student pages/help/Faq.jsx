import React, {useState} from 'react'
import './Faq.css'

const Faq = () => {

  const [selected, setSelected] = useState(null)

  const toggle = (i) => {
    if (selected === i ) {
      return setSelected(null)
    }

    setSelected(i)
  }

  return ( 
  <div className='faq' style={{display:'flex'}}>
    <div className='faq-content'>
      <div className='header'>
        <div className='faq-header'>
          <h1>FAQs</h1>
        </div>
      </div>

  <div className='wrapper'>
    <div className='accordion'>
      {quest.map((items, i )=> (
        <div className='items'>
          <div className='title' onClick={()=> toggle(i)}>
            <h2>{items.question}</h2>
            <span>{selected === i ? '-' : '+'}</span>
          </div>
          <div className={selected === i ? 'content show' : 'content'}>{items.answer}</div>
        </div>
      ))}

    </div>
  </div>
  </div>
  </div>
  )
}

const quest = [
  {
    question: 'Who sells the school textbooks and/or uniform?',
    answer: 
    'Typically, these items are available through the school administration and are often included in your matriculation fees or semester expenses.'
  },
  {
    question: 'What are the requirements for obtaining the required textbooks and/or Uniforms?',
    answer: 
    'You simply need to present your Certificate of Matriculation (COM) at the designated counter.'
  },
  {
    question: 'Where can I get the textbooks and/or uniform?',
    answer: 
    'The textbooks and uniforms are obtainable at FDV building, situated across the Basic Ed Building'
  },
  {
    question: 'Where is the claiming area for modules?',
    answer: 
    'The modules are available at Basic Education, Ground Floor, in the designated room allocated for each department.'
  },
  {
    question: 'Where can I find digital versions of the modules? ',
    answer: 
    'If the module is not yet available, your instructor will provide it. ',
  },
  {
    question: 'When should I acquire the textbooks and/or uniforms?',
    answer: 
    'Textbooks and/or can be acquired once registration is complete and, if available, are accessible immediately thereafter.'
  },

]

export default Faq;