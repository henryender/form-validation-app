import * as yup from "yup";
import { string } from 'yup';


const schema= yup.object().shape({
    name: yup.string().required(),
    Email:yup.string().required().email("Email must be valid"),
    username:yup.string().required(),
    gender:yup.string().required(),
    age:string().required().nullable(),
    password:yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Please Check Password"),
    cpassword:yup.string().oneOf([yup.ref("password"),null],"Password Mismatch").required("Field is required"),
    terms:yup.bool().oneOf([true],"Please accept terms and conditions"),
  });
  export default schema