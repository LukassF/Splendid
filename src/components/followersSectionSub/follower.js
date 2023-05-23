import '../../styles/style.css'


export default function Follower(props){

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
    
    function manageRequest(state){
        props.setFollowers([])
        props.followers.forEach(item => {
            if(item.username === props.username){
                props.setFollowers(prev => [
                    {
                        username:item.username,
                        image:item.image,
                        backgroundImage:item.backgroundImage,
                        role:item.role,
                        email:item.email,
                        state:state,
                        key:item.key

                    },...prev]
                )
            }else props.setFollowers(prev => [...prev,item])
        })
    }
    return(
        <div className="follower-card" tabIndex='0' ref={props.reference}>
           <div className="follower-card-content">
                <div className="front">
                    <div className="follower-image"><img src={props.image} height="100%"></img></div>
                    <span className="follower-name">{props.username}</span>  
                    <span>{props.role}</span> 
                </div>
    
                <div className="back">
                    <div className="follower-background-image"><img src={props.backgroundImage} width="100%"></img></div>
                    <div className="follower-profile-image-back"><img src={props.image} height="100%"></img></div>
                    <h4>{props.username}</h4>
                    <ul>
                        <li><i className="fa fa-phone"></i> {randomIntFromInterval(100000000,999999999)}</li>
                        <li><i className="fa fa-envelope"></i> {props.email}</li>
                        <li>Since {randomIntFromInterval(1,30)}.{randomIntFromInterval(1,12)}.{randomIntFromInterval(2020,2023)}</li>
                        {props.renderManage ? <span>
                            <button onClick={() => manageRequest('accepted')} id="first">Accept request</button>
                            <button onClick={() => manageRequest('declined')} id="second">Decline request</button>
                        </span>: <span>
                            <button onClick={() => manageRequest('declined')} id="second">Remove</button>
                        </span>}
                    </ul>
                    <div className="follower-stats">
                        <div>
                            Followers
                            <span>{Math.floor(Math.random() * 200)}k</span>
                        </div>
                        <div>
                            Videos
                            <span>{Math.floor(Math.random() * 500)}</span>
                        </div>
                        <div>
                            Likes
                            <span>{Math.floor(Math.random() * 999)}k</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}