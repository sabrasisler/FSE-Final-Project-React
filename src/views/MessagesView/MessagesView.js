import React, {useEffect, useState} from 'react';
import * as service from '../../services/messages-service';
import {AlertBox} from "../../components";
import Conversations from "../../components/Messages/Conversations";
import {useSelector} from "react-redux";

const MessagesView = () => {
    const [conversations, setConversations] = useState([]);
    const [error, setError] = useState();
    const authUser = useSelector((state) => state.user.data);

    useEffect(() => {
        const findMyConversations = async () => {
            const res = await service.findLatestMessagesByUser(authUser.id);
            if (res.error) {
                return setError(
                    'We ran into an issue showing your conversations. Please try again later.'
                );
            }
            setConversations(res);
        };
        findMyConversations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <h1>Messages</h1>
            {error && <AlertBox message={error}/>}
            {conversations && <Conversations conversations={conversations}/>}
        </div>
    );
};
export default MessagesView;
