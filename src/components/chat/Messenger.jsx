import React, { useEffect, useState, useRef } from 'react'
import Friends from './Friends'; 
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getFriends, messageSend, getMessage, ImageMessageSend} from "../../redux/actions/chat";
import { CLEAR_MESSAGE } from '../../redux/constans/message';
import ActiveFriend from './ActiveFriend';
import { Create } from '../../services/file';
import { ImageVIEW } from '../../shared/funs';
import {  loader} from '../../shared/elements';
import { DELIVARED_MESSAGE, SEEN_ALL, SEEN_MESSAGE, SOCKET_MESSAGE, UPDATE_FRIEND_MESSAGE, UPDATE_FRIEND_STATUS } from '../../redux/constans/chat';
import './chat.css';
import { isAuthentication } from '../../redux/actions/auth';
import { useNavigate } from 'react-router-dom';
import RightSide from './RightSide';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { START_LOADING, STOP_LOADING } from '../../redux/constans/loading';

// import useSound from 'use-sound';
// import notificationSound from '../audio/notification.mp3';
// import sendingSound from '../audio/sending.mp3';


const Messenger = () => {

    const socket = useRef();
    const scrollRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    toast.configure()

    const { isAuth , user , token } = useSelector((state) => state.auth);
    const authorization = { "Authorization": `bearer ${token}` }

    useEffect(() => {
      dispatch(isAuthentication());
    }, [dispatch]);
  
    useEffect(() => {
      if (!isAuth) {
        navigate("/login");
      } 
    }, [isAuth]);
    

    const { friends, message } = useSelector(state => state.chat);


     // //set Friends
     useEffect(() => {
               dispatch(getFriends(authorization));
      }, [dispatch]);


    // const [notificationSPlay  , { stop  }] = useSound(notificationSound);
    // //const [sendingSPlay , , { stop : stopTwo  }]  = useSound(sendingSound);

    // useEffect(() => {
    //     stop()
    //   }, [stop]);

    //   const notificationSPlay = new Audio(notificationSound)
    //   const sendingSPlay = new Audio(sendingSound)
      
    //   useEffect(() => {
    //       notificationSPlay.play()
    //       // .then(_ => {
    //       //     // autoplay starts!
    //       // }).catch(error => {
    //       //    //show error
    //       // })
    //   }, [notificationSPlay]);
  

    //redux
    
    const { successMsg } = useSelector(state => state.message);
    const { loading } = useSelector(state => state.loading);

    //states
    const [currentfriend, setCurrentFriend] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [activeUser, setActiveUser] = useState([]);
    const [socketMessage, setSocketMessage] = useState('');
    const [typingMessage, setTypingMessage] = useState('')


    useEffect(() => {
        socket.current = io('ws://localhost:8080');

        //set new uer
        socket.current.emit('addAdmin')

        //get new message
        socket.current.on('getMessage', (data) => {
           setSocketMessage(data);
        }) 

        //realtime typing
        socket.current.on('typingMessageGet', (data) => {
            setTypingMessage(data);
        })


        //see all
        socket.current.on('msgSeenResponse', id => {

            dispatch({
                type: SEEN_MESSAGE,
                payload: id
            })
        })

       //see current one
        socket.current.on('seenSuccess', id => {
            dispatch({
                type: SEEN_ALL,
                payload: id
            })
        })

        //Delivared alert
        socket.current.on('msgDelivaredResponse', id => {
            dispatch({
                type: DELIVARED_MESSAGE,
                payload: id
            })
        })

        // get Online Users
        socket.current.on('getUser', (users) => {
            setActiveUser(users);
        });

        // new user add alert
        socket.current.on('new_user_add', name => {
            toast.info(name + " online")
        })

      
       
    }, []);






    //get Message
    useEffect(() => {
        if (friends && friends.length > 0) {
           dispatch(getMessage("a" , currentfriend._id))  
        }

    }, [currentfriend?._id])

   // initial Messages
    useEffect(() => {
        if (friends && friends.length > 0) {
            setCurrentFriend(friends[0]);
        }
    }, [friends])



    // send new Message
    const sendMessage = (e) => {
                e.preventDefault();
               // sendingSPlay();

                    const messageData = {
                        ...currentfriend.chatId,
                        from: "admin",
                        message: newMessage ? newMessage : '❤️'

                    }


                // send msg to api
                dispatch(messageSend(messageData));
                setNewMessage('')
    }



        // on Success Send message in local
          useEffect(() => {
            if (successMsg === "MessageSend") {

                // //new message
                socket.current.emit('sendMessage', message[message.length - 1]); //last msg

                // //update friend last message
                dispatch({
                    type: UPDATE_FRIEND_MESSAGE,
                    payload:  message[message.length - 1] //last msg
                })

            } //get Message 
            else if(successMsg === "getMessage"){
               if (message.length > 0) {
 
            if (message[message.length - 1].from !== "admin" && message[message.length - 1].status !== 'seen') {
 
                //update friend see
                dispatch({
                    type: UPDATE_FRIEND_STATUS,
                    payload: currentfriend._id
                })

                    
                }

             } 

            }
            
            dispatch({ type: CLEAR_MESSAGE })

        }, [successMsg])


          
    useEffect(() => {
        // on Success Send from user to me
        if (socketMessage && currentfriend) {


            if (socketMessage.id === currentfriend._id && socketMessage.from === "user") {

                // insert new msg
                dispatch({type: SOCKET_MESSAGE, payload: socketMessage})


                dispatch({type: UPDATE_FRIEND_MESSAGE, payload: socketMessage})

                setSocketMessage('')


            } // on Success Send from user to me in outside 
            else if (socketMessage.id !== currentfriend._id && socketMessage.from === "user") {
                //    notificationSPlay();

                toast.info(`${socketMessage.senderName} send a new message`);

                dispatch({type: UPDATE_FRIEND_MESSAGE, payload: socketMessage})

            }

        }

    }, [socketMessage])





    // search
    const search = (e) => {

            const getFriendClass = document.getElementsByClassName('hover-friend');
            const frienNameClass = document.getElementsByClassName('Fd_name');

            for (var i = 0; i < getFriendClass.length , i < frienNameClass.length; i++) {

                let text = frienNameClass[i].innerText.toLowerCase();

                if (text.indexOf(e.target.value.toLowerCase()) > -1) {
                    getFriendClass[i].style.display = '';
                } else {
                    getFriendClass[i].style.display = 'none';
                }
            }
    }



    //input Hendle
    const inputHendle = (e) => {
        setNewMessage(e.target.value);
    }


    //emoji Send
    const emojiSend = (emu) => {
        setNewMessage(`${newMessage}` + emu);
    }

    //Image Send
    const ImageSend = (e , type) => {    
    
        if (e.target.files.length !== 0) {
             //    sendingSPlay();

            const formData = new FormData();
            formData.append('image', e.target.files[0]);
           
            dispatch({ type: START_LOADING })

            Create(formData).then(({ data }) => {

                if (!data.err) {
                    dispatch({ type: STOP_LOADING })
               
                    const messageData = {
                        ...currentfriend.chatId,
                        from: "admin",
                        message: data.msg,
                        type
                    }

                       dispatch(ImageMessageSend(messageData));

                } else {
                    dispatch({ type: STOP_LOADING })
                    toast.warning(`There was an error while uploading your file`);

                }

            }).catch(err => {
                console.log("get orders api err ", err);
                dispatch({ type: STOP_LOADING })
            })
        }

    }




    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [message]);



    return (
        <div className="chatapp">

        <div className="messenger">

            {loading && loader()}
        
            <div className="row">
                <div className="col-3">
                    <div className="left-side">
                        <div className="top">
                            <div className="image-name">
                                <div className="image">
                                    <img src={ImageVIEW(user.image)} alt="" />
                                </div>
                                <div className="name">
                                    <h3>{`${user.firstname} ${user.lastname}`}</h3>
                                </div>
                            </div>
                           


                        </div>
                        <div className="friend-search">
                            <div className="search">
                                <input onChange={search} type="text" placeholder='search' className="form-control" />
                            </div>
                        </div>
                        <div className="active-friends">
                            { 
                                activeUser && activeUser.length > 0 ? activeUser.map((u , i) => <ActiveFriend key={i} setCurrentFriend={setCurrentFriend} user={u.userInfo} />) : ''
                            }

                        </div>
                        <div className="friends">
                            {
                                friends && friends.length > 0 ? friends.map((fd, index) => <div key={index} 

                                onClick={() => setCurrentFriend(fd)}
                                
                                className={currentfriend._id === fd._id ? 'hover-friend active' : 'hover-friend'} >
                                    <Friends activeUser={activeUser} friend={fd.chatId} />
                                </div>) : 'no friend'
                            }

                        </div>
                    </div>
                </div>
                {
                    currentfriend?._id ? <RightSide
                        activeUser={activeUser}
                        ImageSend={ImageSend}
                        currentfriend={currentfriend?.chatId}
                        inputHendle={inputHendle}
                        newMessage={newMessage}
                        sendMessage={sendMessage}
                        message={message}
                        scrollRef={scrollRef}
                        emojiSend={emojiSend}
                        typingMessage={typingMessage}
                    /> : 'Please select you friend'
                }

            </div>
        </div>


        </div>
    )
}

export default Messenger
