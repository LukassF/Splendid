import  {useState, useEffect, useRef, useReducer}  from "react"
import '../styles/style.css'
import Comments from './videoSub/comments'
import {CSSTransition} from 'react-transition-group'

function reducer(state,action){
    switch(action.type){
        case 'like':
            return{color: state.color==='black'?'rgba(255, 135, 135, 0.7)':'black'}
        case 'mouseOver':
            return{color :state.color==='rgba(255, 135, 135, 0.7)'?'rgba(255, 135, 135, 0.7)': 'black'}
        case 'mouseLeave':
            return{color:state.color === 'rgba(255, 135, 135, 0.7)'?'rgba(255, 135, 135, 0.7)':'rgba(77, 75, 75,0.7)'}
        default:
            return {color: state.color}
    }
    
}

export default function Video(props){
    const videoRef = useRef()
    const [icon,setIcon] = useState('fa fa-play')
    const [like,setLike] = useState(0)
    const [comment,setComment] = useState(0)
    const [share,setShare] = useState(0)
    const [viewComments,setViewComments] = useState(false)
    const [state,dispatch] = useReducer(reducer,{color:'rgba(77, 75, 75,0.7)'})

    useEffect(() => {
        setLike(Math.floor(Math.random()*950))
        setComment(Math.floor(Math.random()*250))
        setShare(Math.floor(Math.random()*150))
    },[props.id])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(videoRef.current!==null){
                    if(entry.isIntersecting){
                        videoRef.current.play()
                        setIcon('fa fa-pause')
                    }else{
                        videoRef.current.pause()
                        setIcon('fa fa-play')
                    }
            }
            })
        })
        observer.observe(videoRef.current)
    },[])
 
    function playVideo(){
        setIcon(icon === 'fa fa-pause' ? 'fa fa-play': 'fa fa-pause')
        if(videoRef.current.paused){
            videoRef.current.play()
        }else{
            videoRef.current.pause()
        }
    }

    function likeVideo(e){
        dispatch({type:'like'})
        if(e.currentTarget.classList[0]==='liked'){
            e.currentTarget.classList.remove('liked')
        }else{e.currentTarget.classList.add('liked')}
    }

    function closeComments(event){
        if(event.target === event.currentTarget){
        setViewComments(false)}
    }

    function close(){
        setViewComments(false)
    }

    return(
        <div className='video-container' onClick={event => closeComments(event)}>
            <div className="creator">
                <div className="image-container"><img src={props.image} height="100%"></img></div>
                <div>{props.username}</div>
                <div>The purpose of lorem ipsum is to create a natural looking block of text and so on.graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to hav</div>
            </div>
            <div className="video-and-buttons">
                <div className='black-background' onClick={playVideo}>
                    {props.renderButtons && <div className="buttons-small">
                        <span><i className="fa fa-heart"></i> {like}k</span>
                        <span onClick={() => {
                                                if(window.localStorage.getItem('currentUsername') && props.allow === true) setViewComments(true)
                                            }
                        }><i className="fa fa-message"></i> {props.allow ? comment + 'k' : 'Disabled'}</span>
                        <span><i className="fa fa-share"></i> {share}k</span>
                    </div>}
                    <video loop width="100%" ref={videoRef}>
                        <source src={props.source}/>
                    </video>
                    <div className='buttons'>
                        <button id="play"><i className={icon}></i></button>
                        <div id="volume"><button id="mute"><i className='fa fa-volume-up'></i></button><input type="range" defaultValue='0'></input></div>
                    </div>
                </div>
                {props.renderButtons&&
                    <ul>
                        <li id="like-button" onClick={(e) => likeVideo(e)} onMouseOver={() => dispatch({type:'mouseOver'})} onMouseLeave={() => dispatch({type:'mouseLeave'})} style={{color:state.color}}><i className="fa fa-heart" style={{backgroundColor:state.color}}></i><div id="like-quantity">{like}K</div></li>
                        <li onClick={() => {
                            if(window.localStorage.getItem('currentUsername') && props.allow) setViewComments(true)
                            }
                        }><i className="fa fa-message"></i>{props.allow ? comment + 'K' : 'Disabled'}</li>
                        <li><i className="fa fa-share"></i>{share}K</li>
                    </ul> 
                }
            </div>
            <CSSTransition in={viewComments} unmountOnExit timeout={300} classNames='view-comments'>
                <Comments comment={comment} close={close}/>
            </CSSTransition>
        </div>
    )
}