import {useRef} from 'react'
import '../styles/style.css'

export default function ChangeImageForm(props){
    const profileImgRef = useRef(null)
    const backgImgRef = useRef(null)
   
    function changeImage(){
        let users = JSON.parse(window.localStorage.getItem('usersArray'))
        let currentUser = window.localStorage.getItem('currentUsername')

        users.forEach(item => {
            if(item.username === currentUser){
                props.setModifiedUsers(prev => 
                    [{
                        username:currentUser,
                        password:item.password,
                        backgroundImage:backgImgRef.current.value.length !== 0 ? backgImgRef.current.value : item.backgroundImage,
                        profileImage:profileImgRef.current.value.length !== 0 ? profileImgRef.current.value : item.backgroundImage
                    },...prev])

            }else props.setModifiedUsers(prev => [...prev,item])
        })
    }

    return(
        <div id="blur" onClick={(e) => {
            if(e.target === e.currentTarget) props.setClickedImage(false)
        }}>
            <form ref={props.reference}>
                <div id="form-content">
                    <h1>Change profile or background image!</h1>
                    <label htmlFor="profile-img-input">Change profile-image</label>
                    <input type="text" placeholder="Enter url" id="profile-img-input" ref={profileImgRef}/>
                    <button onClick={changeImage}>Confirm</button>

                    <label htmlFor="backg-img-input">Change background-image</label>
                    <input type="text" placeholder="Enter url" id="backg-img-input" ref={backgImgRef}/>
                    <button onClick={changeImage}>Confirm</button>
                </div>
                <ol>
                    <li>Find the URL of the image you want to use. You can do this by right-clicking on the image and selecting "Copy image address" or "Copy image URL" depending on your browser.</li>
                    <li>Paste the URL of the image you want to use in the space provided. Make sure that the URL is correct and that the image is publicly accessible.</li>
                    <li>Click "Confirm" to save your changes.</li>
                    <li>Check your profile or account page to make sure that the new image has been applied successfully.</li>
                </ol>
            </form>
        </div>
    )
}