import React from 'react';
import moment from 'moment';
import { ImageVIEW } from '../../shared/funs'; 

const Friends = (props) => {
    const { activeUser , myId , friend } = props;
     
    return (
        <div className='friend'>
            <div className="friend-image">

                <div className="image">
                    <img src={ImageVIEW(friend.image)} alt="" />
                    {/* {
                        activeUser && activeUser.length > 0 && activeUser.some(u => u.userId === fndInfo._id) ? <div className="active_icon"></div> : ''
                    } */}
                </div>
            </div>
            
            <div className="friend-name-seen"> 


                <div className="friend-name">
                     <h4 className={friend?.from !== "admin" &&  friend?.status !== undefined && friend?.status !== 'seen' ? 'unseen_message Fd_name':'Fd_name' }>{friend.senderName}</h4>

                   <div className="msg-time">
                        {
                            friend && friend.from === "user" ? <span>You </span> : <span className={friend?.from !== "admin" &&  friend?.status !== undefined && friend?.status !== 'seen'?'unseen_message':'' }>{`${friend.senderName} `}</span>

                        }
                        {
                            friend && friend.message.type === "msg" ? <span className={friend?.from !== "admin" &&  friend?.status !== undefined && friend?.status !== 'seen'?'unseen_message':'' }>{friend.message.text.slice(0, 10)}</span> 
                           : friend && friend.message.type === "img" ? <span>send a image</span> 
                           : friend && friend.message.type === "file" ? <span>send a file</span> : <span>connect you</span>
                        }
                        <span>{friend ? moment(friend.createdAt).startOf('mini').fromNow() : moment(friend.createdAt).startOf('mini').fromNow()}</span>
                    </div>
                    
                </div>
                {

                    friend?.from === "admin" ? 
                        <div className="seen-unseen-icon">

                            {
                                friend.status === 'seen' ? <img src={ImageVIEW(friend.image)} alt="" /> :
                                friend.status === 'delivared' ? <div className="delivared"><i className="fa-solid fa-check-double"></i></div>
                                : <div className='unseen'><i className="fa-solid fa-check"></i></div>
                            }
                        </div> :
                        <div className="seen-unseen-icon">
                            {
                                friend?.status !== undefined && friend?.status !== 'seen' ? <div className="seen-icon"></div> : ''
                            }

                        </div>
                }
            </div>
       
       
       
        </div>
    )
}

export default Friends
