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
    question: 'Where is the claiming area for modules?',
    answer: 
    'You can find it on shs building first floor'
  },
  {
    question: 'Where is the claiming area for modules?',
    answer: 
    'You can find it on shs building first floor'
  },
  {
    question: 'Where is the claiming area for modules?',
    answer: 
    'You can find it on shs building first floor'
  },
  {
    question: 'Where is the claiming area for modules?',
    answer: 
    'You can find it on shs building first floor'
  },
  {
    question: 'Where is the claiming area for modules?',
    answer: 
    'You can find it on shs building first floor'
  },
  {
    question: 'Where is the claiming area for modules?',
    answer: 
    'You can find it on shs building first floor'
  },

]

export default Faq;