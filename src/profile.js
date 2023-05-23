import { useState,useEffect,useRef } from "react";
import './styles/style.css'
import { Link } from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import VideoProfile from "./video_profile";
import Video from "./components/video";
import Upload from "./upload_button";
import localforage from "localforage";
import NavbarBottom from "./components/navbar-bottom";
import ChangeImageForm from "./components/changeImage";
import profile from "./functions/profile_images";


export default function Profile(){
    const profileNavRef = useRef('')
    const nameChangeInputRef = useRef('')
    const h1Ref = useRef('')
    const article2Ref = useRef()
    const profileImage = useRef('')
    const listRef = useRef('')
    const changeRef = useRef(null)
    const videoBlackBackground = useRef([])
    const videoContainerRef = useRef([])
    const [renderProfileImage2,setRenderProfileImage2] = useState(false)
    const [nameChangeInput,setNameChangeInput] = useState(false)
    const [username,setUsername] = useState(window.localStorage.getItem('currentUsername'))
    const [upload,setUpload] = useState(false)
    const [uploaded,setUploaded] = useState(false)
    const [loading,setLoading] = useState(false)
    const [updated,setUpdated] = useState(false)
    const [array,setArray] = useState([])
    const [tempArray,setTempArray] = useState([]) //temporary array for changing username
    const [auxilliaryArray,setAuxilliaryArray] = useState([]) // temporary array for assigning new object url on reload
    const [modifiedUsers,setModifiedUsers] = useState([]) // temporary array for modifying usersArray with new username or new image
    const [clickedImage,setClickedImage] = useState(false)
    const [createdVideo,setCreatedVideo] = useState({
        source:null,
        video: null,
        user:{
            image:null,
            username:null},
        id:JSON.parse(window.localStorage.getItem('videoArray')).length,
        key:Math.random(),
        allow:true
    })  

    //Storing a created video file 
    useEffect(() => {
        if(createdVideo.video !== null) localforage.setItem(`Video${createdVideo.id}`,createdVideo.video)
    },[createdVideo])

    
    useEffect(() => {
        setAuxilliaryArray([])
            if(JSON.parse(window.localStorage.getItem('videoArray')).length > 6){
                JSON.parse(window.localStorage.getItem('videoArray')).map(item => {
                    if(item.user.username === window.localStorage.getItem('currentUsername')){
                        localforage.getItem(`Video${item.id}`).then(res => {
                            setAuxilliaryArray(prev => [
                                {
                                    //Assigning a new URL to a dynamically created video on every page render and storing it in an auxilliary array
                                    source: URL.createObjectURL(res),
                                    video:res,
                                    user:{
                                        username:item.user.username,
                                        //Setting user image from database in case it has been modified 
                                        image: profile('profileImage')
                                    },
                                    id:item.id,
                                    key:item.key,
                                    allow:item.allow
                                },...prev
                            ])
                        })
                    }else setAuxilliaryArray(prev => [...prev,item])
                })}
        setArray(JSON.parse(window.localStorage.getItem('videoArray')))
        onProfileResizing()
    },[])

    useEffect(() => {
        window.localStorage.setItem('videoArray',JSON.stringify(array))
        setTempArray([])
    },[array])

    useEffect(() => {
        if(tempArray.length!==0) setArray(tempArray)
    },[tempArray])

    useEffect(() => {
        if(auxilliaryArray.length > 6) {
            window.localStorage.setItem('videoArray',JSON.stringify(auxilliaryArray))

            if(auxilliaryArray.length === array.length)
            setUpdated(true)
        }
    },[auxilliaryArray])

    useEffect(() => {
        if(modifiedUsers.length !== 0)
            window.localStorage.setItem('usersArray', JSON.stringify(modifiedUsers))
    },[modifiedUsers])

    useEffect(() => {
        onProfileResizing()
    },[clickedImage])

    function logOut(){
        window.localStorage.removeItem('currentUsername')
    }

    window.onscroll = () => {
        if(profileNavRef.current!==null){
            if(document.documentElement.scrollTop>=window.innerHeight-375){
                profileNavRef.current.style.position = 'fixed'
                setRenderProfileImage2(true)
            }else{
                profileNavRef.current.style.position = 'relative'       
                setRenderProfileImage2(false)
            }
        }
    }

    const onProfileResizing = () =>{
        if(window.innerWidth<1300 && article2Ref.current){
            article2Ref.current.style.display = 'block'
            profileImage.current.style.transform = 'translate(-20%,50%) scale(0.7)'
            if(window.innerWidth<900){
                profileImage.current.style.left = '50%'
                profileImage.current.style.transform = 'translate(-50%,5%) scale(0.8)'
                profileImage.current.style.boxShadow = 'none'
                listRef.current.style.width = "90%"

                if(window.innerWidth < 650 && videoBlackBackground.current[0]){
                    videoBlackBackground.current.forEach(item => {
                        if(item) item.style.width = '100%'
                    })
                    videoContainerRef.current.forEach(item => {
                        if(item) item.style.width = '110vw'
                    })
                    if(changeRef.current){
                        changeRef.current.style.width = '100vw'
                        changeRef.current.style.height = 'auto'
                        changeRef.current.style.minHeight = '400px'
                    }
                }else{
                    videoBlackBackground.current.forEach(item => {
                        if(item)
                        item.style.width = '500px'
                    })
                    videoContainerRef.current.forEach(item => {
                        if(item) item.style.width = '100%'
                    })
                    if(changeRef.current){
                        changeRef.current.style.width = '800px'
                        changeRef.current.style.height = '400px'
                    }       
                }
            }else{
                profileImage.current.style.left = '6%'
                profileImage.current.style.transform = 'translate(-20%,50%) scale(0.7)'
                profileImage.current.style.boxShadow = '0px 6px 15px 2px gray'
                listRef.current.style.width = "55%"
            }
            
        }else if(article2Ref.current){
            article2Ref.current.style.display = 'grid'
            profileImage.current.style.transform = 'translate(0%,50%)'
        }
    }
    window.onresize = onProfileResizing

    return(
        <main id="profile-page-main">
            <div id="background-image" style={{backgroundImage:`url(${profile('backgroundImage')})`}} onClick={() => setClickedImage(true)}>
                <Link to='/'><i className="fa fa-arrow-left"></i></Link>
            </div>
            <article className="article-1">
                <div id="profile-image" ref={profileImage} style={{backgroundImage: `url(${profile('profileImage')})`}} onClick={() => setClickedImage(true)}></div>
                <span className="name">
                    <h1 ref={h1Ref}>{window.localStorage.getItem('currentUsername')}<i className="fa fa-pencil" onClick={() => setNameChangeInput(!nameChangeInput)}></i></h1>
                    {nameChangeInput&&<input 
                    type="text" 
                    ref={nameChangeInputRef} 
                    style={{width: h1Ref.current.offsetWidth}} 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    onKeyDown={(e) => {
                        if(e.key === 'Enter'){
                            setNameChangeInput(false)
  
                            array.forEach(item => {
                                if(item.user.username === window.localStorage.getItem('currentUsername')){
                                    setTempArray(prev => [{source:item.source,video:item.video, user:{image:item.user.image,username:username},id:item.id,key:item.key},...prev])
                                }
                                else{
                                    setTempArray(prev => [...prev,item])
                                }
                            })

                            setModifiedUsers([])
                            JSON.parse(window.localStorage.getItem('usersArray')).forEach(item => {
                                if(item.username === window.localStorage.getItem('currentUsername')){
                                    setModifiedUsers(prev => [{username:username, password:item.password, backgroundImage:item.backgroundImage, profileImage:item.profileImage},...prev])
                                }else setModifiedUsers(prev => [...prev,item])
                            })

                            window.localStorage.setItem('currentUsername',username)

                            setTimeout(() => {
                                window.location.reload()
                            },10)
                                                                    
                        }
                    }}/>}
                </span>
                <h3>Catch the bull by it's horns!</h3>
                <ul ref={listRef}>
                    <li><span>Followers</span><span>376k</span></li>
                    <li><span>Likes</span><span>14m</span></li>
                    <li><span>Views</span><span>44m</span></li>
                    <li><span>Comments</span><span>1.2m</span></li>
                    <li><span>Shares</span><span>656k</span></li>
                    <li><span>Videos</span><span>123</span></li>
                </ul>
                <Link id="log-out" to='/login' onClick={logOut}>Log out</Link>
            </article>
            <article className="article-2" ref={article2Ref}>
                <nav id="left-nav" ref={profileNavRef}>
                    <CSSTransition in={renderProfileImage2} unmountOnExit timeout={300} classNames='nav-image'>
                        <div className="profile-image-2" style={{backgroundImage:`url(${profile('backgroundImage')})`}} onClick={() => setClickedImage(true)}>
                            <div style={{backgroundImage: `url(${profile('profileImage')})`}}></div>
                            <h1>{window.localStorage.getItem('currentUsername')}</h1>
                        </div>
                    </CSSTransition>
                    <ul>
                        <li><i className="fa fa-phone"></i> +48 798 767 199</li>
                        <li><i className="fa fa-envelope"></i> szkulkerolf@gmail.com</li>
                        <button id="chat"><i className="fas fa-comment-dots"></i> Chat</button>
                        <div>
                            <i className="fa fa-instagram"></i>
                            <i className="fa fa-facebook"></i>
                            <i className="fa fa-snapchat"></i>
                        </div>
                    
                    <div id="text-end">
                    Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, 
                    graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who
                     is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.
                    </div>
                    </ul>
                </nav>
                <div className="content-profile">
                    <CSSTransition in={clickedImage} unmountOnExit timeout={300} classNames="change-image">
                       <ChangeImageForm setModifiedUsers={value => setModifiedUsers(value)} reference={changeRef} setClickedImage={setClickedImage}/>
                    </CSSTransition>
                    {uploaded&&<div id="svg">
                        {loading&& <div className="lds-dual-ring"></div>}
                        {!loading&&<svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>}
                    </div>}
                    {!upload && <Upload setUpload={value => setUpload(value)} />}
                    <CSSTransition in={upload} unmountOnExit timeout={300} classNames='video-creator-transition'> 
                        <VideoProfile createdVideo={createdVideo} setCreatedVideo={value => setCreatedVideo(value)} setArray={value => setArray(value)} array={array} upload={value => setUpload(value)} uploaded={value => setUploaded(value)} loading={value => setLoading(value)}/>
                    </CSSTransition>
                      <div id="my-videos">
                        {(JSON.parse(window.localStorage.getItem('videoArray')).length !== 0 && updated)&& JSON.parse(window.localStorage.getItem('videoArray')).map(item => {
                            if(item.user.username === window.localStorage.getItem('currentUsername')){
                                return(
                                    <div className="my-videos-container">
                                        <Video 
                                            reference1={el => videoBlackBackground.current.push(el)}
                                            reference2={el => videoContainerRef.current.push(el)}
                                            source={item.source}
                                            username={item.user.username}
                                            image={item.user.image}
                                            id={item.id}
                                            key={Math.random()}
                                            renderButtons={false}
                                        />
                                        <div className="video-stats">
                                            <span id="box-top"></span><span id="box-left"></span><span id="box-right"></span><span id="box-bottom"></span>
                                            <p><i className="fa-solid fa-message"></i>Lorem ipsum dolor sit amet. Ut harum voluptates et iure fuga vel eveniet cumque qui fugiat iusto sit libero sint ea voluptates autem. Aut velit aliquid est cupiditate quia eum delectus maiores sed sint sint ea sequi distinctio et odit architecto ex quaerat cumque?</p>
                                            <p><i className="fa fa-heart"></i>Et ipsa doloremque rem eaque nihil ut corrupti repellendus et nihil expedita qui asperiores veritatis quo vero commodi. Eum incidunt esse est iure exercitationem ea tenetur velit nam molestias autem et distinctio ipsum. Eos doloremque debitis est rerum ullam rem nesciunt natus nam explicabo ullam. Sed deserunt quia est omnis Quis aut maiores dolorem At doloremque enim et minima dolorem. </p>
                                            <p><i className="fa fa-share"></i>Vel architecto cumque et temporibus beatae qui internos aliquid est sequi provident ex dolorum velit in voluptas placeat sed ullam quibusdam. Quo natus nihil sit nostrum illum et nihil aperiam et aperiam facilis ab alias maxime. </p>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </article>
            <NavbarBottom/>
        </main>
    )
}