import React from 'react'
import zxcvbn from "zxcvbn"

const NextInput = ({text}) => {
    const texter=zxcvbn(text)
     console.log(texter)
  return (
    <div>nextInput</div>
  )
}

export default NextInput