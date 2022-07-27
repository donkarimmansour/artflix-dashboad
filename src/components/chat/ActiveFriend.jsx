import React from 'react'
import { ImageVIEW } from '../../shared/funs'
 
const ActiveFriend = ({user,setCurrentFriend}) => {

    return (
        <div onClick={()=> setCurrentFriend({
            _id : user.id,
            chatId : user
        })} className="active-friend">
            <div className="image-active-icon">
                <div className="image">
                    <img src={ImageVIEW(user.image)} alt=""/>
                    <div className="active-icon"></div>
                </div>
            </div>
        </div>  
    )
}

export default ActiveFriend
