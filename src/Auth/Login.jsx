import React,{useState,useEffect,useContext} from 'react'
import AuthContext from '../context/AuthContext';
import MessageContext from '../context/MessageContext';
import ax from '../ax';
import Master from './../Pages/Layout/Master';
import { useHistory } from 'react-router-dom';
import LabelContext from '../context/LabelContext';

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loader,setLoader] = useState(false);
  const [error,setError] = useState({});
  // const [label,setLabel] = useContext(LabelContext);

  //context
  const authUserContext = React.useContext(AuthContext);
  const msgContext = React.useContext(MessageContext);
  const message = useContext(MessageContext);
  const history = useHistory();


  useEffect(()=>{
    if(localStorage.getItem('token')){
      message.setMessage({type:'error',message:"You already login"})
      history.push("/");
    }
  },[])


  const login=()=>{


    setLoader(true);
    const frmData = new FormData();
    frmData.append("email",email);
    frmData.append("password",password);

    ax.post("/login",frmData).then((d)=>{
      setLoader(false);
      const {success,data} = d.data;
      const {token,user} = d.data.data;

      if(success === false){
        setError(data);
      }else{
        localStorage.setItem("token",token);

        //local storage set Item
        localStorage.setItem("token",token);
        //set auth user to context
        authUserContext.setAuthUser(user);
  
        //toast 
        msgContext.setMessage({type:'success',message:`Welcome  Back ${user.name}`})
        

        // ax.get("/category",{headers:{Authorization:`Bearer ${token}`}}).then(
        //   ({data})=>{
        //     setLabel(data.data);
        //     //redirect
        //     history.push("/");
        //   })

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
          <h3 className="text-white">Login</h3>
        </div>
        <div className="card-body">

            <div className="form-group">
              <label htmlFor className="text-white">Enter Email</label>
              <input type="email" 
              className={`form-control bg-dark border-0 text-white ${error.email ? 'border border-danger' : ""}`} name="email" placeholder="enter your email" 
              onChange={(e)=>setEmail(e.target.value)}/>

              {
                error.email && error.email.map((err,index)=>{
                  return(
                    <small key={index} className='text-danger'>{err}</small>
                  )
                })
              }
            </div>
            <div className="form-group">
              <label htmlFor className="text-white">Enter Password</label>
              <input type="password" 
              className={`form-control bg-dark border-0 text-white ${error.password ? 'border border-danger' : ""}`} name="password" placeholder="*****" 
              onChange={(e)=>setPassword(e.target.value)}/>

              {
                error.password && error.password.map((err,index)=>{
                  return(
                    <small key={index} className='text-danger'>{err}</small>
                  )
                })
              }
            </div>
            <br/>
            <button type="submit" defaultValue="Login" className="btn btn-dark"
            disabled={loader}
            onClick={()=>login()}>
                
            {
              loader && 
              (<>
                  <span className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true" />
                  <span className="visually-hidden">Loading...</span>
              </>)
            }

                Login
            </button>

        </div>
      </div>
    </div>
  </div>
</div>

    </Master>
  )
}

export default Login