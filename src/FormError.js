import React from 'react';
import './Form.css';

 const FormErrors = ({formErrors}) =>
  <div align="center" className='formErrors'> 
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName.toUpperCase()} {formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
    
  </div>
export default FormErrors;