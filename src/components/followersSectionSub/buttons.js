export default function Buttons(props){
    return(
        <span id="followers-nav">
            <button 
                className={props.requestsSection ? 'followersActive': ''}
                onClick={() => props.setRequestsSection(true)} 
            >Requests<div>{props.length.request}</div>
            </button>
            <button 
                className={!props.requestsSection ? 'followersActive':''}
                onClick={() => props.setRequestsSection(false)} 
            >Followers <div>{props.length.accepted}</div>
            </button>
        </span>
    )

}