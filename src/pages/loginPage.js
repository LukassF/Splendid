import  {useState, useEffect, useRef}  from "react"
import '../styles/style.css'
import { Link , useNavigate} from "react-router-dom";
import { CSSTransition } from "react-transition-group";


export default function LoginPage({setWelcome}){
    const [username,setUsername] = useState('')
    const [login,setLogin] = useState('')
    const [password,setPassword] = useState('')
    const [errorText,setErrorText] = useState('')
    const [passwordText,setPasswordText] = useState('')
    const [loginText,setLoginText] = useState('')
    const [loginPasswordText,setLoginPasswordText] = useState('')
    const [userObject,setUserObject] = useState({})
    const [usersArray,setUsersArray] = useState([])
    const [translate,setTranslate] = useState('translate(-50%, -50%)')
    const [buttonText, setButtonText] = useState('Sign up now!')
    const [mainText, setMainText] = useState('Not registered yet?')
    const [toggleRegister,setToggleRegister] = useState(true)
    const [small,setSmall] = useState(false)
    const passwordRef1 = useRef()
    const passwordRef2 = useRef()
    const passwordRef3 = useRef()
    const curtainRef = useRef()
    const checkboxRef = useRef('')
    const loginLeftRef = useRef(null)
    const loginRightRef = useRef(null)
    const contentLoginRef1 = useRef(null)
    const contentLoginRef2 = useRef(null)
    const navigate = useNavigate()

    function resizeLogin(){
        if(window.innerWidth<920){
            setSmall(true)
            if(loginLeftRef.current && mainText === "Not registered yet?"){
                loginLeftRef.current.style.zIndex = '2'
                loginRightRef.current.style.zIndex = '1'
                contentLoginRef1.current.style.width = '80%'
            }else if(loginRightRef.current && mainText === "Already registered?"){
                loginRightRef.current.style.zIndex = '2'
                loginLeftRef.current.style.zIndex = '1'
                contentLoginRef2.current.style.width = '80%'
            }
        }else if(loginLeftRef.current && mainText === "Not registered yet?"){
            setSmall(false)
            contentLoginRef1.current.style.width = '60%'
            loginLeftRef.current.style.zIndex = '1'
            loginRightRef.current.style.zIndex = '1'
        }else if(loginRightRef.current && mainText === "Already registered?"){
            setSmall(false)
            contentLoginRef2.current.style.width = '60%'
            loginLeftRef.current.style.zIndex = '1'
            loginRightRef.current.style.zIndex = '1'
        }else setSmall(false)
        
    }
    
    function toggleLogin(){
        if(curtainRef.current!==null){
            setTranslate(translate==='translate(-50%, -50%)'?'translate(-150%, -50%)': 'translate(-50%, -50%)')
            setButtonText(buttonText === 'Sign up now!'?'Log into your account.':'Sign up now!')
            setMainText(mainText==='Not registered yet?'?'Already registered?':'Not registered yet?')
            setPasswordText('')
            setErrorText('')
            setLoginText('')
            setLoginPasswordText('')
            setToggleRegister(false)
            setTimeout(() => {
                setToggleRegister(true)
            },300)
        }
    }

    function passwordCheck(e){
        if(JSON.parse(window.localStorage.getItem('usersArray')).filter(item => (item.username === login && e.target.value === item.password)).length !== 0) return true
        else return false
    }

    useEffect(() => {
        if(curtainRef.current!==null){
            curtainRef.current.style.transform = translate
        }
    },[translate])

    useEffect(() => {
        if(window.localStorage.getItem('usersArray')){
            setUsersArray(JSON.parse(window.localStorage.getItem('usersArray')))
        }
    },[])

    useEffect(() => {
        if(userObject.username !== undefined)
            setUsersArray(prev => [...prev,userObject])
    },[userObject])

    useEffect(() => {
        if(usersArray.length!==0)
        window.localStorage.setItem('usersArray',JSON.stringify(usersArray))
    },[usersArray])

    function checkUsername(e){
        if(window.localStorage.getItem('usersArray')){
            if(JSON.parse(window.localStorage.getItem('usersArray')).filter(item => item.username === e.target.value).length !== 0)return false
            else return true
        }
    }
    

    window.onresize = resizeLogin
    useEffect(() => {
        resizeLogin()
    },[buttonText])

    return(
        <main id="login-page-main">
            <section>
                <span id="nav">
                    <Link to='/'><i className="fa fa-arrow-left"><span> Return</span></i></Link>
                    {small && <button onClick={toggleLogin}>{buttonText}</button>}
                </span>
                <div id="login-left" ref={loginLeftRef}>
                    <CSSTransition in={mainText==='Not registered yet?'} timeout={600} unmountOnExit classNames='left-transition'>
                        <div className="login-left-content">
                            <article ref={contentLoginRef1}>
                                <h1>Login</h1>
                                <h4>I already have an account.</h4>
                                <div className="username-container">
                                    <input name="username" required id="username" type="text" placeholder="Enter username" onChange={(e) => setLogin(e.target.value)} 
                                        onBlur={(e) => {
                                            if(!window.localStorage.getItem('usersArray') || JSON.parse(window.localStorage.getItem('usersArray')).filter(item => item.username === login).length === 0){
                                                setLoginText('Username not found')
                                                e.target.style.backgroundColor = 'pink'
                                                e.target.style.border = 'solid red 2px'
                                            }else{
                                                setLoginText('')
                                                e.target.style.backgroundColor = 'white'
                                                e.target.style.border = 'none'
                                            }
                                        }}/>
                                    <span>{loginText}</span>
                                </div>
                                <div className="password-container">
                                    <input name="password" required id="password1" type="password" placeholder="Enter password" ref={passwordRef1} onBlur={(e) => {
                                        if(!window.localStorage.getItem('usersArray') || JSON.parse(window.localStorage.getItem('usersArray')).filter(item => item.username === login).length === 0 || !passwordCheck(e)){
                                            setLoginPasswordText('Password Incorrect')
                                            e.target.style.backgroundColor = 'pink'
                                            e.target.style.border = 'solid red 2px'
                                        }else if(JSON.parse(window.localStorage.getItem('usersArray')).filter(item => item.username === login).length !== 0 && passwordCheck(e)){
                                            setLoginPasswordText('')
                                            e.target.style.backgroundColor = 'white'
                                            e.target.style.border = 'none'
                                        }
                                    }}/>
                                    <i className="fa fa-eye" id="see-password-icon" onClick={() => passwordRef1.current.type = passwordRef1.current.type=== 'password' ? 'text': 'password'}/>
                                    <span>{loginPasswordText}</span>
                                </div>
                                <div className="forgot-password">Forgot password?</div>
                            
                                <button className="button1" onClick={() => {
                                    if(loginPasswordText === ''){
                                        setWelcome(true)
                                        window.localStorage.setItem('currentUsername',login)
                                        setTimeout(() => {
                                            navigate('/')
                                        },1000)
                                        setTimeout(() => {
                                            
                                            setWelcome(false)
                                        },2000)
                                    }
                                }}>Log In</button>
                                <div id="login-with">
                                    <span>Or log in using</span>
                                <div>
                                    <div><img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" width="30px"/></div>
                                    <div><img src="https://img.freepik.com/darmowe-ikony/szukaj_318-265146.jpg" alt="google-logo" width="30px"/></div>
                                    <div><img src="https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-png-dallas-shootings-don-add-are-speech-zones-used-4.png" width="30px"/></div>
                                </div>
                            </div>
                            </article>
                        </div>
                    </CSSTransition>
                </div>
                <div id="login-right" ref={loginRightRef}>
                    <div id="curtain" ref={curtainRef}>
                        <CSSTransition in={toggleRegister} unmountOnExit timeout={300} classNames='curtain-text'>
                            <span>
                                <div>{mainText}</div>
                                <button onClick={toggleLogin}>{buttonText}</button>
                            </span>
                        </CSSTransition>
                    </div>
                    <CSSTransition in={mainText==='Already registered?'} timeout={600} unmountOnExit classNames='right-transition'>
                        <div className="login-right-content">
                            <article ref={contentLoginRef2}>
                                <h1>Sign up</h1>
                                <h4>I want to become a member.</h4>
                                <div className="username-container">
                                    <input name="username" required id="username" type="text" placeholder="Enter username" 

                                        onBlur={(e) => {
                                              if(e.target.value.length > 5){
                                                if(window.localStorage.getItem('usersArray')){ 
                                                    if(checkUsername(e)){
                                                        e.target.style.backgroundColor = 'white'
                                                        e.target.style.border = 'none'
                                                        setUsername(e.target.value)
                                                        setErrorText('')
                                                    }else{
                                                        e.target.style.backgroundColor = 'pink'
                                                        e.target.style.border = 'solid red 2px'
                                                        setErrorText('Username taken')
                                                    }                                                                                                  
                                                }else{
                                                    e.target.style.backgroundColor = 'white'
                                                    e.target.style.border = 'none'
                                                    setUsername(e.target.value)
                                                    setErrorText('')
                                                }
                                            }else{
                                                console.log(checkUsername(e))
                                                e.target.style.backgroundColor = 'pink'
                                                e.target.style.border = 'solid red 2px'
                                                setErrorText("Username has to be longer")
                                            }
        
                                        }}
                                    />
                                    <span>{errorText}</span>
                                </div>
                                <div className="password-container">
                                    <input name="password" required id="password2" type="password" placeholder="Enter password" ref={passwordRef2} onChange={(e) => setPassword(e.target.value)}/>
                                    <i className="fa fa-eye" id="see-password-icon" onClick={() => passwordRef2.current.type = passwordRef2.current.type=== 'password' ? 'text': 'password'}/>
                                </div>
                                <div className="password-container">
                                    <input name="password" required id="password3" type="password" placeholder="Repeat password" ref={passwordRef3} 
                                    
                                        onBlur={(e) => {
                                            if(e.target.value === password){
                                                e.target.style.backgroundColor = 'white'
                                                e.target.style.border = 'none'
                                                setPasswordText('')
                                            }else{
                                                e.target.style.backgroundColor = 'pink'
                                                e.target.style.border = 'solid red 2px'
                                                setPasswordText('Passwords are not the same')
                                            }
                                        }}
                                    
                                    />
                                    <i className="fa fa-eye" id="see-password-icon" onClick={() => passwordRef3.current.type = passwordRef3.current.type=== 'password' ? 'text': 'password'}/>
                                    <span>{passwordText}</span>
                                </div>
                                <div className="checkbox-container">
                                    <label htmlFor="checkbox">Accept terms of use</label>
                                    <input type="checkbox" required id="checkbox" ref={checkboxRef}/>
                                </div>
                                <button className="button2" onClick={() => {
                                    if(errorText === '' && passwordText === '' && checkboxRef.current.checked){
                                        setUserObject({
                                            username:username,
                                            password:password,
                                            profileImage:'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg',
                                            backgroundImage:'https://obiektowe.tarkett.pl/media/img/M/THH_25121916_25131916_25126916_25136916_001.jpg'
                                        })
                                        setWelcome(true)
                                        window.localStorage.setItem('currentUsername',username)
                                        setTimeout(() => {
                                            navigate('/')
                                        },1000)
                                        setTimeout(() => {
                                            
                                            setWelcome(false)
                                        },2000)
                                    }
                                }}>Register</button>
                            </article>
                        </div>
                    </CSSTransition>
                </div>
            </section>
        </main>

    )
}