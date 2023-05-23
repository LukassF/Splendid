import  {useState} from "react"
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./home"
import LoginPage from "./pages/loginPage"
import Profile from "./profile"
import './styles/style.css'
import { CSSTransition } from "react-transition-group"



function App(){
    const [welcome,setWelcome] = useState(false)
    return(
        <>
        <CSSTransition in={welcome} unmountOnExit timeout={400} classNames="welcome-page-transition">
                <div id="welcome-page">
                    <span>Welcome!</span>
                    <span>{window.localStorage.getItem('currentUsername')}</span>
                </div>
        </CSSTransition>
        {welcome && <div style={{width:'100vw',height:'100vh',backgroundColor:'white',position:'absolute',zIndex:'30'}}></div>}

        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<LoginPage setWelcome={setWelcome}/>}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='*' element={<h1>404 not found</h1>} />
        </Routes>
        </> 
    )
}



const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

