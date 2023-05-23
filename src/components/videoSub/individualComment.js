import profile from '../../functions/profile_images'
import '../../styles/style.css'

export default function IndividualComment(props){

    return( 
        <div className="individual-comment">
            <div style={{backgroundImage: `url(${profile('profileImage')})`}}></div>
            <div>{window.localStorage.getItem('currentUsername')}</div>
            <div>{props.comment}</div>
            <i className="far fa-heart"><span>{props.commentQuantity}</span></i>
        </div>
    )
} 