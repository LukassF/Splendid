import { useState,useEffect,useRef } from "react";
import './styles/style.css'




export default function VideoProfile(props){
    const fileRef = useRef('')
    const profileVideoRef = useRef('')
    const selectButtonRef = useRef('')
    const [selectedVideo,setSelectedVideo] = useState(null)
    const [videoLink,setVideoLink] = useState(null)
    const [caption,setCaption] = useState(null)
    const [allow,setAllow] = useState(true)
   


    useEffect(() => {
        if(selectedVideo){
            setVideoLink(URL.createObjectURL(selectedVideo))
        }
    },[selectedVideo])


    useEffect(() => {
        if(selectedVideo){
        props.setCreatedVideo({
            source:videoLink,
            video:Object.assign(selectedVideo),
            user:{
                image: JSON.parse(window.localStorage.getItem('usersArray')).map(item => {
                    if(item.username === window.localStorage.getItem('currentUsername')){
                        return item.profileImage
                    }
                }
                    
                    ),
                username:window.localStorage.getItem('currentUsername')},
            id:JSON.parse(window.localStorage.getItem('videoArray')).length,
            key:Math.random(),
            allow:allow
        })
    }
    },[videoLink,allow])
   
    
    const buttonStyles = () => {
        selectButtonRef.current.style.position = 'absolute'
        selectButtonRef.current.style.width = '50px'
        selectButtonRef.current.style.height = '50px'
        selectButtonRef.current.style.bottom = '2%'
        selectButtonRef.current.style.right = '2%'
        selectButtonRef.current.style.borderRadius = '20%'
        selectButtonRef.current.style.transition = 'all 0.3s'
    }
    function toggleButton(e){
        e.currentTarget.classList.toggle('toggled')
    }

    useEffect(() => {
        if(profileVideoRef.current!==null && videoLink){
            profileVideoRef.current.load()
            buttonStyles()
        }
    },[videoLink])


    function uploadVideo(){
        if(videoLink!==null ) {
            props.setArray(prev => [props.createdVideo,...prev])
            props.upload(false)
            props.uploaded(true)
            props.loading(true)
            setTimeout(() => {
                props.loading(false)
            },1700)
            setTimeout(() => {
                props.uploaded(false)
                window.location.reload()
            },3400)
           
        }
        else (alert("Choose a video before uploading"))
    }

    return(
        <section id="video-creator-section">
            <button onClick={() => props.upload(false)} id="close-upload"><i className="fa fa-close"></i></button>
            <div id="creator">
                <textarea placeholder="Enter caption" onChange={e => setCaption(e.target.value)}/>
                <span onClick={(e) => {toggleButton(e) 
                                        setAllow(!allow)
                                        }} className="allow"><button></button><p className="paragraph">Disallow comments</p><i className="fa fa-message"></i></span>
                <span onClick={toggleButton} className="allow"><button></button><p className="paragraph">Allow shares</p><i className="fa fa-share"></i></span>
                <span onClick={toggleButton} className="allow"><button></button><p className="paragraph">Allow stitches</p><i className="fa fa-adjust"></i></span>
                <span onClick={toggleButton} className="allow"><button></button><p className="paragraph">Allow downloads</p><i className="fa fa-download"></i></span>
                <button id="finish-upload" onClick={() => uploadVideo()}>Upload</button>
            </div>
            <div id="live-view">
                {caption&&<div className='caption'>{caption}</div>}
                <div className="black-background-profile">
                    <input type="file" accept="video/*" ref={fileRef} onChange={e => setSelectedVideo(e.target.files[0])}/>
                    <button onClick={() => fileRef.current.click()} ref={selectButtonRef} id="select-video"><i className="fa fa-film"></i>{!videoLink&&<span> Select a video file</span>}</button>
                    {videoLink&& <video loop autoPlay width="100%" ref={profileVideoRef}>
                        <source src={videoLink}/>
                    </video>}
                </div>
            </div>
        </section>
    )
}
