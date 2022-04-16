import React from "react";
import Conversation from "../Messages/Conversation";

/**
 * A container component to display a list of comversations.
 * @param conversationFromList conversations list returned by an API
 * @returns {JSX.Element}
 */
const Conversations = ({conversations}) => {
    return (
        <div>
            <ul className='ttr-tuits list-group'>
                {conversations &&
                    conversations.map((conversation) => {
                        return conversation ?
                            <Conversation key={conversation.id} conversationFromList={conversation}/> : null;
                    })}
            </ul>
        </div>
    );
}

export default Conversations;
