import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import schema from "./Schema"
import PasswordStrengthBar from 'react-password-strength-bar';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { Box, Grid, Typography } from '@mui/material';
import result from './countries.json'
import data from './states.json'
import { toast, Toaster } from 'react-hot-toast';
import { animateScroll as scroll } from 'react-scroll';

function SemanticForm() {
  const [state, setState] = useState('')
  const [area, setArea] = useState('')

  const handleArea = (e) => setArea(e.target.value)
  function handleState(e) { setState(e.target.value) }

  const [eyeIcon, setEyeicon] = useState(true);
  const [rule, setRule] = useState(false)
  const [item, setItem] = useState([]);

  const [checks, setChecks] = useState({
    capsLetterCheck: false,
    numberCheck: false,
    lengthCheck: false,
    specialCharCheck: false,
    lowerCaseCheck: false,
  })

  function ChecksHandler(e) {
    const { value } = e.target;
    const capsLetterCheck = /[A-Z]/.test(value)
    const lowerCaseCheck = /[a-z]/.test(value)
    const numberCheck = /[0-9]/.test(value)
    const lengthCheck = value.length >= 8;
    const specialCharCheck = /[!@$()+=#%^&*_]/.test(value);
    setChecks({
      capsLetterCheck,
      lowerCaseCheck,
      numberCheck,
      lengthCheck,
      specialCharCheck,
    })
  }
  function Togglerule() { setRule(true) }
  function OnBlurHandler() { setRule(false) }
  function updateIcon() { setEyeicon(!eyeIcon) }

  const eye = {
    color: "blue",
    marginLeft: "-30px",
    marginTop: "10px",
    cursor: "pointer",
  }
  const NewEye = {
    color: "gray",
    marginLeft: "-30px",
    marginTop: "10px",
    cursor: "pointer",
  }

  const { handleSubmit, register, formState: { errors }, reset, watch } = useForm({
    resolver: yupResolver(schema)
  });

  const SubmitData = (data) => {
    console.log(data); reset(); setChecks(false);
    setItem(
      [...item, {
        value1: name, value2: username, value3: Email, value4: stateData, value5: countryInfo,
        value6: age, id: item.length
      }]
    );
    toast.success(`Details for ${name} Successfully Submitted`);
    scroll.scrollToTop('target')
  }

  const PasswordInput = watch("password")
  const name = watch("name")
  const username = watch("username")
  const Email = watch("Email")
  const stateData = watch("state")
  const countryInfo = watch("country")
  const age = watch("age")



  return (
    <>
      <Toaster position="top-center"
        reverseOrder={false} />
      <div style={{ margin: "20px" }}>
        <Grid container spacing={2} id="target">
          <Grid item xs={12} sm={7} md={8} lg={7}>
            <Box sx={{
              width: { md: '70%', lg: "60%" }, margin: "auto",
              border: '2px solid lightblue', borderRadius: '10px'
            }} >
              <form onSubmit={handleSubmit(SubmitData)} class="ui form segment">
                <h2 className='App' style={{ color: "gray" }}><strong>Register for an Account</strong></h2>

                <div class="field" >
                  <label>Name</label>
                  <input placeholder="First Name" name="name" type="text"
                    {...register("name")} />
                  <p className='invalid'>{errors.name?.message}</p>

                </div>
                <div class="field" >
                  <label>Email</label>
                  <input placeholder="your email..." name="Email" type="text"
                    {...register("Email")} />
                  <p className='invalid'>{errors.Email?.message}</p>
                </div>

                <div class="field">
                  <label>Username</label>
                  <input placeholder="Username" name="username" type="text"
                    {...register("username")} />

                  <p className='invalid'>{errors.username?.message}</p>

                  <div class="field">
                    <label>Gender</label>
                    <select class="ui dropdown" name="gender"{...register("gender")}>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <p className='invalid'>{errors.gender?.message}</p>

                <div class="inline fields">
                  <label>Age: </label>
                  <div class="field">
                    <div class="ui radio checkbox">
                      <input type="radio" name="age" {...register("age")}
                        value="18-20" />
                      <label>18-20</label>
                    </div>
                  </div>

                  <div class="field">
                    <div class="ui radio checkbox">
                      <input type="radio" name="age" {...register("age")}
                        value="25-45" />
                      <label>25-45</label>
                    </div>
                  </div>
                </div>
                <p className='invalid'>{errors.age?.message}</p>

                <div class="field">
                  <label>Country:</label>
                  <select  className='ui dropdown'name="country" {...register("country")}
                    onChange={handleState} >
                    <option  style={{ textAlign: 'center' }}>--Select Country--</option>
                    {result.map((getcon, index) =>
                      <option style={{ textAlign: 'left' }} key={index} >{getcon.name}</option>)}
                  </select>
                </div>
                <p className='invalid'>{errors.country?.message} </p>


                <div class="field">
                  <label>State:</label>
                  <select  className='ui dropdown' name="state" {...register("state")} >
                    {area === '' ? <option value=''>--Select State--</option> : ''}
                    {data.filter(city => city.country_name === state).map((city) =>
                      <option style={{ textAlign: 'Left' }} key={city.id} onChange={handleArea}>
                        {city.name}</option>)}
                    {state !== '' && area === '' ? <option style={{ textAlign: 'Left' }} disabled>
                      Not Available</option> : null}
                  </select>
                </div>
                <p className='invalid'>{errors.state?.message} </p>

                <div class="field" >
                  <label>Password</label>
                  <input type={eyeIcon ? "password" : "text"} name="password" {...register("password")}
                    placeholder='Your Password....'
                    onClick={Togglerule} onBlur={OnBlurHandler} onKeyUp={ChecksHandler} />
                  <i class="far fa-eye" style={eyeIcon ? NewEye : eye} onClick={updateIcon}></i>
                  <PasswordStrengthBar password={PasswordInput} />

                  <p className='invalid'> {errors.password?.message}</p>

                  {rule && <PasswordStrengthMeter checks={checks} PasswordInput={PasswordInput} />}
                </div>

                <div class="field">
                  <label>Confirm Password</label>
                  <input type="password" name="cpassword"
                    placeholder='Your Password....'{...register("cpassword")} />
                  <p className='invalid'>{errors.cpassword?.message}</p>
                </div>
                <div class="inline field">
                  <div class="ui checkbox">
                    <input type="checkbox" name="terms"
                      {...register("terms")} />
                    <label>I agree to the terms and conditions</label>
                    <p className='invalid'>{errors.terms?.message}</p>
                  </div>

                  <div class=" field" className='field2'>
                    <button class="ui primary button">
                      Submit

                    </button>
                  </div>


                </div>
              </form>

            </Box>
          </Grid>


          <Grid item sm={5} md={4} lg={5} xs={12} >
            <div >
              <Box textAlign='center' padding="5px"
                sx={{ backgroundColor: "lightblue" }} border='2px solid black' height='220px'>
                <Typography variant='h5'>Confirm Details</Typography>
                {item.length === 0 ? (
                  <Box marginTop='30px' padding="5px">
                    <Typography variant='h6'>No Entries Yet!</Typography>
                    <Typography variant='body1'>Please fill and submit form</Typography>
                  </Box>)

                  : (
                    item.map(newItem => <div key={newItem.id}>
                      <Typography> <strong>Name:</strong> {newItem.value1}</Typography>
                      <Typography> <strong>UserName:</strong> {newItem.value2}</Typography>
                      <Typography> <strong>Email: </strong>{newItem.value3}</Typography>
                      <Typography><strong>Age: </strong>{newItem.value6}</Typography>
                      <Typography><strong>State: </strong>{newItem.value4}</Typography>
                      <Typography><strong>Country:</strong> {newItem.value5}</Typography>
                      <button class="ui primary button"
                        className='confirm' onClick={() => { toast.success('Details Confirmed, Sending to Database...'); setItem([]) }}>
                        Please confirm</button>

                    </div>)
                  )}

              </Box>
            </div>
          </Grid>



        </Grid>

      </div>


    </>
  )
}

export default SemanticForm