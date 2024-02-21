import React, { useState } from 'react';

const EditBookPage = ({ editFormData, editBookId, onSubmit, onCancel }) => {
  const [updatedData, setUpdatedData] = useState(editFormData);

  const handleUpdate = (e) => {
    e.preventDefault();
    // Perform any validation if needed
    onSubmit(editBookId, updatedData);
  };

  return (
    <div>
      {/* Your edit form content goes here */}
      <form onSubmit={handleUpdate}>
        {/* Update input fields based on your data structure */}
        <input
          type="text"
          value={updatedData.subject_name}
          onChange={(e) => setUpdatedData({ ...updatedData, subject_name: e.target.value })}
        />
        {/* Add more input fields as needed */}
        <button type="submit">Update</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EditBookPage;
