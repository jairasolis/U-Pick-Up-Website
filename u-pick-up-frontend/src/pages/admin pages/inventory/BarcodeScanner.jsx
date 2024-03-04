import React, { useState } from 'react';
import './BarcodeScanner.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";


const BarcodeScanner = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className='barcode-scanner-page'>
      <div className="scan-box-container">
        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2 className='update-header-text'>Update Item</h2>
              {/* <button className="scan-close" onClick={closeModal}>
              <FontAwesomeIcon icon={faCircleXmark} className="exit-icon" />
              </button> */}
              <div className="scanned-material-deets">
                <p> Material: </p>
                <p> Subject Code: </p>
                <p> Quantity: </p>
                <hr />
                <p> New quantity: 
                <input className='new-quantity-input' type="number" value={inputValue} onChange={handleInputChange}/> </p>
              </div>
              <div className="scann-buttons">
                <button className='retry-scan-button'  onClick={closeModal}> Retry </button>
                <button className='update-scan-button'> Update </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <button className="button-scan" onClick={openModal}> Scan </button>
    </div>
  );
};

export default BarcodeScanner;
