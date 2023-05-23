import { useState,useEffect,useRef } from "react";
import './styles/style.css'

export default function Upload(props){
    const uploadListRef = useRef('')
    const [i,setI] = useState(1)

    useEffect(() => {
        if(uploadListRef.current!==null){
            uploadListRef.current.children[0].style.display = 'none'
            uploadListRef.current.children[1].style.display = 'none'
            uploadListRef.current.children[2].style.display = 'none'
            uploadListRef.current.children[i].style.display = 'block'
            setTimeout(() => {
                setI(i<2?i+1:0)
            },5000)
        }
    },[i])

    return(
        <div id="upload-button-profile">
            <ul ref={uploadListRef}>
                <li>Don't forget to check the video's orientation before uploading it. You don't want to end up with a sideways or upside-down video!</li>
                <li>When adding a description, try to keep it short and sweet. People tend to have short attention spans, so a concise and engaging description can help grab their attention.</li>
                <li>If you're using filters or other effects, make sure they don't overpower the video. The goal is to enhance the video, not distract from it.</li>
            </ul>
            <button onClick={() => props.setUpload(true)}>+ Upload</button>
            <img src="https://icons-for-free.com/iconfiles/png/512/cloud+upload+file+storage+upload+icon-1320190558968694328.png" width="80%"></img>
        </div>
    )
}