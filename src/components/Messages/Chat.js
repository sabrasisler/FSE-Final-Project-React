import React, {useEffect, useState} from "react";
import * as service from '../../services/messages-service';
import {ChatFeed} from "react-chat-ui";
import {AlertBox} from "../../components";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const Chat = () => {
    const {uid, cid} = useParams();
    const [message, setMessage] = useState([]);
    const [sentMessage, setSentMessage] = useState([]);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState();
    const authUser = useSelector((state) => state.user.data);

    const createMessage = async (message) => {
        if (!message) return;
        const res = await service.createMessage(authUser.id, cid, message);
        if (res.error) {
            return setError(
                'We ran into an issue sending your message. Please try again later.'
            );
        }
        setSentMessage(true);
        setMessage('');
    };

    useEffect(() => {
        const findMyMessages = async () => {
            const res = await service.findAllMessagesByConversation(uid, cid);
            if (res.error) {
                return setError(
                    'We ran into an issue showing your messages. Please try again later.'
                );
            }
            // Mark sender and receiver bubbles
            res.forEach((message) => {
                message._id = message.id;
                message.id = authUser.id === message.sender ? 0 : 1;
            });
            setMessages(res);
        };
        findMyMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sentMessage]);

    return (
        <div>
            <h1>Messages</h1>
            {error && <AlertBox message={error}/>}
            {messages &&
                <ChatFeed
                    messages={messages} // Boolean: list of message objects
                    maxHeight="500px"
                    hasInputField={false} // Boolean: use our input, or use your own
                    showSenderName // show the name of the user who sent the message
                    bubblesCentered={true} //Boolean should the bubbles be centered in the feed?
                    // JSON: Custom bubble styles
                    bubbleStyles={{
                        text: {
                            fontSize: 16
                        },
                        chatbubble: {
                            borderRadius: 30,
                            padding: 20
                        }
                    }}
                />}
            <textarea
                onChangeCapture={(e) => {
                    setMessage(e.target.value);
                    setSentMessage(false);
                }}
                placeholder="Enter message"
                className='w-100 border-0'
                value={message}
            ></textarea>
            <div className="col-2">
                <button
                    onClick={() => createMessage(message)}
                    className={`btn btn-primary rounded-pill fa-pull-right fw-bold ps-4 pe-4`}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chat;
