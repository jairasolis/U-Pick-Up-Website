// import React from 'react'
// import './Faq.css'
// import Accordion from '/Accordion';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus } from '@fortawesome/free-solid-svg-icons'

// // import components
// import Navbar2 from '../../../components/navbar/Navbar2'
// import LeftBar from '../../../components/leftBar/LeftBar'


// const Faq = () => {
//   return (
//     <div className='faq' style={{display:'flex'}}>
//       <div className="faq-content">
//         <div className='header'>
//           <div className="faq-header">
//             <h1> FAQs </h1>
//           </div>
//         </div>
        
//         <main>
//           <div className="faq-cards">
//             <div className="cards">
//               <FontAwesomeIcon icon={faPlus} style={{color:'#516E53'}}/>
//             </div>
//             <div className="cards">
//               <FontAwesomeIcon icon={faPlus} style={{color:'#516E53'}}/>
//             </div>
//             <div className="cards">
//               <FontAwesomeIcon icon={faPlus} style={{color:'#516E53'}}/>
//             </div>
//             <div className="cards">
//               <FontAwesomeIcon icon={faPlus} style={{color:'#516E53'}}/>
//             </div>
//             <div className="cards">
//               <FontAwesomeIcon icon={faPlus} style={{color:'#516E53'}}/>
//             </div>
//             <div className="cards">
//               <FontAwesomeIcon icon={faPlus} style={{color:'#516E53'}}/>
//             </div>
//             <div className="cards">
//               <FontAwesomeIcon icon={faPlus} style={{color:'#516E53'}}/>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

// export default Faq
import React, { useState } from 'react';
import './Faq.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const Faq = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpansion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'Where is the claim area for modules?',
      answer: 'The claim area for modules is located...',
    },
    {
      question: 'Where is the claim area for modules?',
      answer: 'The claim area for modules is located...',
    },
    {
      question: 'Where is the claim area for modules?',
      answer: 'The claim area for modules is located...',
    },
    {
      question: 'Where is the claim area for modules?',
      answer: 'The claim area for modules is located...',
    },
    {
      question: 'Where is the claim area for modules?',
      answer: 'The claim area for modules is located...',
    },
    {
      question: 'Where is the claim area for modules?',
      answer: 'The claim area for modules is located...',
    },
    {
      question: 'Where is the claim area for modules?',
      answer: 'The claim area for modules is located...',
    },
    
  ];

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
            {faqs.map((faq, index) => (
              <div className="cards" key={index}>
                <p className="question" onClick={() => toggleExpansion(index)}>
                  {faq.question}
                  <FontAwesomeIcon icon={expandedIndex === index ? faMinus : faPlus} className="icon" />
                </p>
                {expandedIndex === index && (
                  <div className="answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Faq;
