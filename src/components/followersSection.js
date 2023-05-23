import {useState} from 'react'
import Buttons from './followersSectionSub/buttons'
import Requests from './followersSectionSub/requests'
import Accepted from './followersSectionSub/accepted'

export default function FollowersSection(props){
    let followersStorage = window.localStorage.getItem('followers')
    const [requestsSection,setRequestsSection] = useState(true)

    return(
        <section id="following">
            <Buttons length={props.length} setRequestsSection={setRequestsSection} requestsSection={requestsSection}/>
            
            <Requests requestsSection={requestsSection} followers={props.followers} setFollowers={props.setFollowers}/>
            
            {(!requestsSection && JSON.parse(followersStorage).filter(item => item.state === 'accepted').length === 0) && <article id="no-followers">
                <img src="https://i.pinimg.com/originals/13/ac/7a/13ac7a0d3470b516acf8a2d93096a6ae.jpg" width="90%"></img>
                <div>No followers yet...</div>
                <div>Accept follow requests or find new friends yourself!</div>
            </article>}

            {(!requestsSection && JSON.parse(followersStorage).filter(item => item.state === 'accepted').length !== 0) &&
                <Accepted followers={props.followers} setFollowers={props.setFollowers}/>
            }
        </section>
    )
}