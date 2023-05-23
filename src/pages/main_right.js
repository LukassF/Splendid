import {useState, useRef, useEffect} from 'react'
import '../styles/style.css'
import Video from '../components/video'
import users from '../users.json'
import FollowersSection from '../components/followersSection'


export default function MainRight(props){

    let videoArray = JSON.parse(window.localStorage.getItem('videoArray'))
    let followersStorage = window.localStorage.getItem('followers')
    
    const videoBlackBackground = useRef([])
    const videoContainerRef = useRef([])
    
    const [followers,setFollowers] = useState([])
    const [length,setLength] = useState({})

//---------------------------------------------------------------------------------------------------------------------
    if(followers.length === 0) setFollowers(users.users)
    
    useEffect(() => {
        if(followersStorage) setFollowers(JSON.parse(followersStorage))
        onResizing1()
    },[])

    useEffect(() => {
        window.localStorage.setItem('followers',JSON.stringify(followers))
        setLength({
            request:followers.filter(item => item.state === 'request').length,
            accepted:followers.filter(item => item.state === 'accepted').length
        })
    },[followers])

    var onResizing1 = () => {
        if(window.innerWidth < 650 && videoBlackBackground.current[0]!==null){
            videoBlackBackground.current.forEach(item => {
                if(item) item.style.width = '100%'
            })
            videoContainerRef.current.forEach(item => {
                if(item) item.style.width = '110vw'
            })
        }else{
            videoBlackBackground.current.forEach(item => {
                if(item) item.style.width = '500px'
            })
            videoContainerRef.current.forEach(item => {
                if(item) item.style.width = '100%'
            })
        }
    }
        
    window.onresize = onResizing1

//--------------------------------------------------------------------------------------------------------------------

    return(
        <div className="right-menu">
            {(props.navigation === 'feed' && videoArray && props.updateHome) && videoArray.map(item => {
                if(item.user.username.includes(props.browser))
                    return(
                        <Video 
                            reference1={el => videoBlackBackground.current.push(el)}
                            reference2={el => videoContainerRef.current.push(el)}
                            source={item.source} 
                            username={item.user.username} 
                            image={item.user.image} 
                            id={item.id} 
                            key={item.id} 
                            renderButtons={true}
                            allow={item.allow}
                        />
                    )
            })}

            {props.navigation === 'following' && 
                <FollowersSection followers={followers} length={length} setFollowers={setFollowers}/>
            }
        </div>
    )
}