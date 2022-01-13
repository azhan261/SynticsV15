import React, { useState, useRef,  useEffect }  from 'react'
import { Link , useHistory, useLocation} from 'react-router-dom';
import LoginService from '../services/LoginService';
import Message from '../elements/Message';
import Error from '../elements/Error';
import Swal from 'sweetalert2'
import { getRegisterationStudents } from '../../Apis/apiForRegistration';
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawMesh } from '../Face Recognition Login/utilities';
import  WebCamStreamVideoCapture  from '../Modals/WebCamStreamVideoCapture';
import FaceRecognition from '../Face Recognition Login/FaceRecognition';

import {
    COMMON_FIELDS,
    REGISTRATION_FIELDS,
    LOGIN_FIELDS,
    LOGIN_MESSAGE,
    ERROR_IN_LOGIN,
  } from '../MessageBundle';

function LoginAuthFunctional() {

    const [emailState, setEmailState] = useState('')
    const [passwordState, setPasswordState] = useState('')
    const [errorState, setErrorState] = useState(false)
    const [loginSuccessState, setLoginSuccess] = useState(false)
    const [activeStatus, setActiveStatus] = useState(false)
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const history = useHistory()
    var countActive = 0
    var countNotActive = 0
    var activeTest = ''
    var countReversal 





    const runFacemesh = async () => {
      // OLD MODEL
      // const net = await facemesh.load({
      //   inputResolution: { width: 640, height: 480 },
      //   scale: 0.8,
      // });
      // NEW MODEL
      const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
      setInterval(() => {
        detect(net);
      }, 10);
    };
  
    const detect = async (net) => {
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        // Get Video Properties
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;
  
        // Set video width
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;
  
        // Set canvas width
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
  
        // Make Detections
        // OLD MODEL
        //       const face = await net.estimateFaces(video);
        // NEW MODEL
        const face = await net.estimateFaces({input:video});
        console.log(face, "checking");
       
        
        if (face.length == 0) {
          countActive = 0
          countNotActive = countNotActive + 1
          if (countNotActive = 5 ){
            activeTest = 'false'
          }
        }
        else{
          countNotActive = 0
          countActive = countActive + 1
          if(countActive = 5){
            activeTest = "true"
          }
        }
        
       
        // Get canvas context
        if(canvasRef.current.getContext("2d") != null){
          const ctx = canvasRef.current.getContext("2d");
          requestAnimationFrame(()=>{drawMesh(face, ctx)});
        }
        
        
       
      }
    };
  
    
    console.log("count active: " + countActive, "count not active: " + countNotActive)

    const handleOnChangeUserName = (e) => {
      console.log("car")
      setEmailState(e.target.value);
      console.log(emailState)
  };

  const Swal = require('sweetalert2')
  const handleOnChangePassword = (e) => {
      console.log("bike")
      setPasswordState( e.target.value );
      console.log(passwordState)
      
  };


  const onSubmit = async (e) => {
    e.preventDefault()
    const data = {
      email: emailState,
      password: passwordState,
      id : ''
    };
    runFacemesh()
    console.log(data)
    console.log(countNotActive)
    const loginResult = await LoginService(data);
    const timerId = setTimeout(() => {
      testing(loginResult, data)
    }, 1500)
    
  };

  const testing = async (loginResult, data) => {
    if (loginResult !== 200) {
      console.log("!200 error")
        setErrorState(true)
        setLoginSuccess(false)
    } else {
        console.log(loginResult)
        setErrorState(false)
        /*
        console.log(data.email)
        data.id = '612b86db1bc22a07884603aa'
        console.log(data.id)
        */
        console.log("Checking const gettingEmail = await getRegisterationStudents(data.email)")
        const gettingEmail = await getRegisterationStudents(data.email)
        console.log("Checkec and Fullfilled")
        console.log(gettingEmail)
        var idForStudent = gettingEmail[0]._id
    
        if((gettingEmail[0].status == "Student") && (gettingEmail[0].confirmation == "Approved")  && (activeTest == 'true')){
          console.log("Condition FullFilled for getting specific Student")
          console.log("got it")
          setLoginSuccess(true)
          console.log(gettingEmail[0])
          history.push({
            pathname : `/student/studentDashboard/${idForStudent}`,
            state: gettingEmail[0]
          })

        }
        else if(gettingEmail[0].confirmation !== "Approved"){
          console.log("not got it")
          Swal.fire("Awaiting Approval Status",
          'You will be able to login once your information has been verified! <br> Please email at azlan@syntics.co for further information', 
          'error')
          //setErrorState(true)
        }
        else{
          Swal.fire("Incorrect Information",
          'The! <br> Please email at azlan@syntics.co for further information!', 
          'error')
        }
        //history.push("/home")
        console.log("Error not hit")
    }
  }

    console.log(activeStatus)
    return (
      <div>

      <div>
                <div className="my-5 container">
                    <br /><br /><br /><br />
                    <div className="row">
                    <h1 id = "checking" className="h3BlackDashboard mb-2 text-gray-800 text-center"></h1>
              <Webcam
            ref={webcamRef}
            
          />
  
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: 640,
              height: 480,
            }}
          />
                        <div className="col-md-4"></div>
                        <div className="col-md-4 pt-5">
                            <form >
                                <h3>Login In</h3>
                              
                                {/* {error && <span className="alert alert-danger">{error}</span>} */}
                               
                                
                                <div className="form-group">
                                    <label>Email</label>
                                    <input required tabIndex={1} type="email" name = "Username" placeholder="Email"  className="form-control" onChange={(e) => handleOnChangeUserName(e)} />
                                </div>
                                <div className="form-group">
                                    <label>Password (6 Characters) : <Link to="/forgotpassword" tabIndex={4}>Forgot Password?</Link></label>
                                    <input required tabIndex={2} type="password" placeholder="Password"  className="form-control"onChange={(e) => handleOnChangePassword(e)} />
                                </div>
                               
                                
                                <button tabIndex={3} className="btn btn-secondary text-white btn-block" onClick={(e) => onSubmit(e)}>Login</button> <br />
                                <span>Do not have an account? <Link to="/register">Register</Link></span>
                            </form>
                        </div>
                        {loginSuccessState && <Message message={LOGIN_MESSAGE}  />}    {' '}
                        {errorState && <Error message={ERROR_IN_LOGIN} />}    {' '}
                        <div className="col-md-4"></div>
                    </div>
                    <br /><br /><br /><br />
                </div>
            </div>
        </div>
        
    )
}

export default LoginAuthFunctional
