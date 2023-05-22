import React from 'react'
import zxcvbn from 'zxcvbn'

const PasswordStrengthMeter = ({checks,PasswordInput}) => {
    const textResult=zxcvbn(PasswordInput)
    console.log(textResult)
    
  return (
    <>
    <div className='hint' >
          <ul className='ul'>
            Passwords should contain:

              
              {
              checks.capsLetterCheck?
                <li className='valid'>At least <b>one uppercase </b>letter</li>:
                <li className='invalid'>At least <b>one uppercase </b>letter</li>
              }

             {
              checks.lowerCaseCheck?
                  <li className='valid'>At least <b>one lowercase </b>letter</li>:
                  <li className='invalid'>At least <b>one lowercase </b>letter</li>
              }
                
              {
              checks.numberCheck?
                <li className='valid'>At least <b>one number </b></li>:
                <li className='invalid'>At least <b>one number </b></li>
              }


              {
              checks.lengthCheck?
                <li className='valid'>A minimum <b>8 characters </b></li>:
                <li className='invalid'>A minimum <b>8 characters </b></li>
              }

              {
              checks.specialCharCheck?
              <li className='valid'>At least <b>one special character</b></li>:
              <li className='invalid'>At least <b>one special character</b></li>
              }

            </ul> 
            
      </div>
    
    </>
  )
}

export default PasswordStrengthMeter