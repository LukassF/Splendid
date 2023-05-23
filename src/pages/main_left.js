import  {useRef} from "react"
import '../styles/style.css'
import User from '../components/users'


export default function MainLeft(props){
    const navList = useRef()
    
    function toggleActive(e){
        navList.current.children[0].classList.remove('active')
        navList.current.children[1].classList.remove('active')
        e.target.classList.add('active')
    }

    return(
            <div className="left-menu" ref={props.reference.leftMenu}>
                <div className="left-content" ref={props.reference.leftContent}>
                    <ul className="list" ref={navList} >
                        <li className="active" onClick={(e) => {
                            props.dispatch({type:'Feed'})
                            toggleActive(e)
                        }}><i className="fa fa-home"></i> Feed</li>
                        <li onClick={(e) => {
                            if(window.localStorage.getItem('currentUsername')){
                                props.dispatch({type:'Following'})
                                toggleActive(e)
                            }
                            else alert('You have to be logged in first!')
                            
                        }}><i className="fa-solid fa-people-group"></i> Following</li>
                    </ul>
                    <hr></hr>
                    <div id="help-creators" >
                        Help creators online by becoming a virtual sponsor, then reap your benefits!
                        <button><a href="https://pl.wikipedia.org/wiki/Sponsoring">See details</a></button>
                    </div>
                    <hr></hr>
                    <ul className="list2">
                        <div className="list2-header">Suggested Accounts</div>
                        {props.videoArray.map(item => {
                            return(
                                    <User image={item.user.image} username={item.user.username} key={item.user.username}/>
                            )
                        })}
                    </ul>
                    <hr></hr>
                    <div id="footer">
                        <button><i className="fa fa-phone"></i> Contact Us</button>
                        <div id="footer-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed sollicitudin elit. Nulla congue porttitor nisl id feugiat. Donec gravida vitae ante eu imperdiet. In hac habitasse platea dictumst. Etiam ipsum eros, varius rhoncus ligula sit amet, pellentesque hendrerit metus. Nam dictum tellus in quam sollicitudin, non vulputate sem vestibulum.</div>
                    </div>
                </div>
            </div>
    )
}

