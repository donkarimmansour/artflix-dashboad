import React from 'react'
import moment from 'moment';
import { ImageDOWNLOAD, ImageVIEW } from '../../shared/funs';

const Message = ({ message, currentfriend, scrollRef, typingMessage }) => {
 
 
    return ( 
        <>
            <div className='message-show'>
                {
                    message && message.length > 0 && message.map((m, index) =>
                        m.from ==="admin" ? <div key={index} ref={scrollRef} className="my-message">

                            <div className="image-message">
                                
                                <div className="my-text">
                                    <p className='message-text my'>{m.message.type === 'img' ? <img src={ImageVIEW(m.message.image)} alt='image' /> :
                                                                    m.message.type === "file" ? <a href={ImageDOWNLOAD(m.message.image)}>file</a>   : m.message.text}</p>
                                    {
                                        index === message.length - 1 &&  m.from ==="admin" ?
                                            m.status === 'seen' ? <img className='img' src={ImageVIEW(currentfriend.image)}  alt="" /> : m.status === 'delivared' ? <span><i className="fa-solid fa-check"></i></span> : <span><i className="fa-solid fa-check-double"></i></span> : ''
                                    }  
                                </div>

                            </div>
                            <div className="time">
                                {moment(m.createdAt).startOf('mini').fromNow()}
                            </div>
                        </div>  
                         
                        : <div key={index} ref={scrollRef} className="fd-message">
                            <div className="image-message-time">
                                <img src={ImageVIEW(currentfriend.image)} alt="" />
                                <div className="message-time">
                                    <div className="fd-text">
                                        <p className='message-text fd'>{m.message.type === 'img' ? <img src={ImageVIEW(m.message.image)} alt='image' />  
                                                                          : m.message.type === 'file' ? <a href={ImageDOWNLOAD(m.message.image)}>file</a>
                                                                          : m.message.text}</p>
                                    </div>
                                    <div className="time">
                                        {moment(m.createdAt).startOf('mini').fromNow()}
                                    </div>
                                </div>
                            </div>

                        </div>
                    ) }

            </div>



            {
                typingMessage && typingMessage.msg && typingMessage.id === currentfriend.id ? <div className="typing-message">
                    <div className="fd-message">
                        <div className="image-message-time">
                            <img src={ImageVIEW(currentfriend.image)} alt="" />
                            <div className="message-time">
                                <div className="fd-text">
                                    <p className='message-text'>{typingMessage.msg}....</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : ''
            }

        </>
    )
}

export default Message
