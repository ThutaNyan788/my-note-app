import React, { useState ,useEffect,useContext} from 'react'
import Master from './../Pages/Layout/Master';
import ax from '../ax';
import AuthContext from '../context/AuthContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import MessageContext from '../context/MessageContext';



const Register = () => {

const history = useHistory();
const msgContext = React.useContext(MessageContext);
const message = useContext(MessageContext);

useEffect(()=>{
  if(localStorage.getItem('token')){
    message.setMessage({type:'error',message:"You already login"})
    history.push("/");
  }
},[])

const [name,setName] = useState('');
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
const [error,setError] = useState({});
const [loader,setLoader] = useState(false);

//context
const authUserContext = React.useContext(AuthContext);


const login=()=>{
  setLoader(true);
  var frmData = new FormData();
  frmData.append("name",name);
  frmData.append("email",email);
  frmData.append("password",password);



  ax.post("/register",frmData).then((res)=>{
    setLoader(false);
    const {success,data} = res.data;
    if(success === false){
      setError(data);

    }else{
      //success

      //local storage set Item
      localStorage.setItem("token",data.token);
      //set auth user to context
      authUserContext.setAuthUser(data.user);

      //toast 
      msgContext.setMessage({type:'success',message:`Welcome ${data.user.name}`})

      //redirect
      history.push("/");
    }
  })

}



  return (
   <Master>
     <div className="container mt-3">
  <div className="row">
    {/* For Category and Information */}

    <div className="col-md-8 offset-md-2">
      <div className="card">
        <div className="card-header bg-dark">
          <h3 className="text-white">Register</h3>
        </div>
        <div className="card-body">
   
            <div className="form-group">
              <label htmlFor className="text-white">Enter Username</label>
              <input type="text"
             className={`form-control bg-dark  text-white ${error.name ? 'border border-danger' : ""}`}
              name="name" placeholder="enter your name" 
              onChange={(e)=>setName(e.target.value)}/>
  
             {
               error.name && error.name.map((err,index)=>{
                 return(
                  <small key={index} className='text text-danger'>{err}</small>
                 )  
               })
             }
            </div>
            
            <div className="form-group">
              <label htmlFor className="text-white">Enter Email</label>
              <input type="text" 
              className={`form-control bg-dark  text-white ${error.email ? 'border border-danger' : ""}`}
              name="email" placeholder="enter your email" 
              onChange={(e)=>setEmail(e.target.value)}/>

            {
               error.email && error.email.map((err,index)=>{
                 return(
                  <small key={index} className='text text-danger'>{err}</small>
                 )  
               })
             }
             
            </div>


          <div className="form-group">
              <label htmlFor 
              className="text-white">Enter Password</label>
              <input type="text" 
              className={`form-control bg-dark  text-white ${error.password ? 'border border-danger' : ""}`}
              name="password" placeholder="******" 
              onChange={(e)=>setPassword(e.target.value)}/>

            {
               error.password && error.password.map((err,index)=>{
                 return(
                  <small key={index} className='text text-danger'>{err}</small>
                 )  
               })
             }
             
          </div>
            <br/>
          <button 
            disabled={loader}
            type="submit" 
            defaultValue="Register" 
            className="btn btn-dark"
            value='register' 
            onClick={()=>login()}>

            {
              loader && 
              (<>
                  <span className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true" />
                  <span className="visually-hidden">Loading...</span>
              </>)
            }


            &nbsp;Register
        </button>

        </div>
      </div>
    </div>
  </div>
</div>

    </Master>
  )
}

export default Register