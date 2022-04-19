import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

/**
 * A component to render each individual conversation.
 * @param conversationFromList conversation from a list of conversations
 * @returns {JSX.Element}
 */
const Conversation = ({conversationFromList}) => {
    const [conversation] = useState(conversationFromList);
    const userId = useSelector((state) => state.user.data.id);
    // const dispatch = useDispatch();
    const handleDeleteConversation = async (cid) => {
        // TODO
    };
    return (
        <li className='p-2 ttr-tuit list-group-item d-flex rounded-0'>
            <div className='pe-2'>
                {conversation.sender && (
                    <img
                        src={
                            conversation.sender.profilePhoto
                                ? conversation.sender.profilePhoto
                                : `../images/${conversation.sender.username}.jpg`
                        }
                        className='ttr-tuit-avatar-logo rounded-circle'
                        alt='profile'
                    />
                )}
            </div>
            <div className='w-100'>
                {userId === conversation.sender._id ? ( // only delete if tuit belongs to user
                    <i
                        onClick={() => handleDeleteConversation(conversation._id)}
                        className='fas btn fa-remove fa-2x fa-pull-right'
                    ></i>
                ) : null}
                <Link
                    key={conversation._id}
                    to={`/messages/${conversation.sender._id}/${conversation._id}`}
                >
                    <p className='fs-6 fw-bold'>
                        {conversation && conversation.sender.name}
                    </p>
                    {conversation && conversation.latestMessage}
                </Link>
            </div>
        </li>
    );
}

export default Conversation;
