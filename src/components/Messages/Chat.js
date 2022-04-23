import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {
    findMessagesByConversationThunk,
    sendMessageThunk,
} from '../../redux/messageThunks';
import {Link} from 'react-router-dom';
import {FormInput} from '../../forms';
import {socket} from '../../services/socket-config';
import {AlertBox} from "../index";
import Feed from "./Feed";

/**
 * Displays the active chat window with all its messages and send message textbox.
 * @param {string} conversationId the id of the conversation
 *
 */
const Chat = ({conversationId}) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.data.id);
    const participants = useSelector(
        (state) => state.messages.activeChat.participants
    );
    let messages = useSelector((state) => state.messages.activeChat.messages);
    const [newMessageBody, setNewMessageBody] = useState({
        sender: userId,
        conversationId,
        message: '',
    });


    const listenForNewMessagesOnSocket = useCallback(
        (conversationId) => {
            socket.emit('JOIN_ROOM');
            socket.on('NEW_MESSAGE', () => {
                // Make a REST post request to update inbox and active chat.
                dispatch(findMessagesByConversationThunk(conversationId));
            })
        }, 
        [dispatch]);

    useEffect(() => {
        listenForNewMessagesOnSocket();
        dispatch(findMessagesByConversationThunk(conversationId));
    }, [dispatch, listenForNewMessagesOnSocket, conversationId]);

    const sendMessage = (e) => {
        e.preventDefault();
        dispatch(sendMessageThunk(newMessageBody));
    };

    return (
        <div>
            <Link
                to={`/messages`}
                className='mt-2 me-2 btn btn-large btn-primary border border-secondary fw-bolder rounded-pill'
            >
                <i className='fa-solid fa-circle-arrow-left text-white fs-6'></i>
                <span>Back to Inbox</span>
            </Link>
            <p className={"mt-4 mb-4"}>
                Participants:
                {participants.map((participant) => (
                    <span className='badge rounded-pill bg-light' key={participant.id}>
            {participant.name || participant.firstName}
          </span>
                ))}
            </p>
            {messages.length < 1 && <AlertBox message={'No messages.'}/>}
            {messages.length > 0 && <Feed messages={messages}/>} {/*list of message objects*/}
            <form onSubmit={(e) => sendMessage(e)}>
                <FormInput
                    label='Send'
                    placeholder='Enter Message'
                    className='mt-4 w-100 border-0'
                    value={newMessageBody.message}
                    onChange={(e) =>
                        setNewMessageBody({...newMessageBody, message: e.target.value})
                    }
                />
                <button
                    type='submit'
                    className={`mt-3 btn btn-primary rounded-pill fa-pull-right fw-bold ps-4 pe-4`}
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;
