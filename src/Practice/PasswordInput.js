import React,{useState} from 'react'
import NextInput from './nextInput'
import Email from "./Email"

const PasswordInput = () => {
    const [text,setText]=useState("")
   
  return (

    <>
    <div>
        <input type="password"
        onChange={(e)=>setText(e.target.value)}/>
        {text}
    </div>
    <Email text={text}/>
    <NextInput text={text}/>
    </>
   
  )
}

export default PasswordInput