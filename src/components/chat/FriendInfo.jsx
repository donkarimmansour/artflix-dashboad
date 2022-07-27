import React from 'react'
import { ImageVIEW } from '../../shared/funs'; 

const FriendInfo = ({currentfriend,activeUser,message}) => { 
 
    return (
        <div className='friend-info'>
            <input type="checkbox" id='gallery'/>
            <div className="image-name">
                <div className="image">
                <img src={ImageVIEW(currentfriend.image)} alt=""/>
                </div>
                {/* {
                    activeUser && activeUser.length>0 && activeUser.some(u=>u.userId === currentfriend._id)?<div className="active-user">Active</div>:''
                } */}
                
                <div className="name">
                    <h4>{currentfriend.senderName}</h4> 
                </div>
            </div>
            <div className="others">
                <div className="media">
                    <h3>Shared Media</h3>
                    <label htmlFor="gallery"><i className="fa-solid fa-angle-down"></i></label>
                </div>
            </div> 
            <div className="gallery">
                {
                    message && message.length > 0 ? message.map((m,index)=> m.message.type === "img" && <img key={index} src={ImageVIEW(m.message.image)} alt= '' />) : ''
                }
            </div>
        </div>
    )
}

export default FriendInfo
