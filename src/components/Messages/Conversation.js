import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {findInboxMessagesThunk, findMessagesByConversationThunk} from '../../redux/messageThunks';
import {deleteConversation} from "../../services/messages-service";
import {AlertBox} from "../index";

/**
 * A component to render each individual conversation.
 * @param conversationconversation from a list of conversations
 */
const Conversation = ({conversation}) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.data.id);
    const [error, setError] = useState();
    const handleDeleteConversation = async (conversationId) => {
        let res = await deleteConversation(userId, conversationId);
        if (res.error) {
            return setError(
                'We ran into an issue deleting your conversation. Please try again later.'
            );
        } else {
            dispatch(findInboxMessagesThunk());
        }
    };
    return (
        <li className='p-2 ttr-tuit list-group-item d-flex rounded-0'>
            <div className='pe-2'>
                {conversation.recipients && conversation.recipients.length > 0 && (
                    <img
                        src={
                            conversation.recipients[0].profilePhoto
                                ? conversation.recipients[0].profilePhoto
                                : `../images/${conversation.recipients[0].username}.jpg`
                        }
                        className='ttr-tuit-avatar-logo rounded-circle'
                        alt='profile'
                    />
                )}
            </div>
            <div className='w-100'>
                <i
                    onClick={() => {
                        handleDeleteConversation(conversation.conversation);
                    }}
                    className='fas btn fa-remove fa-2x fa-pull-right'
                ></i>
                <Link
                    to={`/messages/${conversation.conversation}`}
                    id={conversation.id}
                    className='text-decoration-none text-white'
                    onClick={() =>
                        dispatch(findMessagesByConversationThunk(conversation.conversation))
                    }
                >
                    <p className='fs-6 fw-bold'>
                        {conversation && conversation.recipients.length === 1 && conversation.recipients[0].name}
                        {conversation && conversation.recipients.length > 1 && conversation.recipients[0].name + ", " + conversation.recipients[1].name + " ..."}
                    </p>
                    {conversation && conversation.message}
                </Link>
            </div>
            {error && <AlertBox message={error}/>}
        </li>
    );
};

export default Conversation;
