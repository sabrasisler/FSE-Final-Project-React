import {
  createConversation,
  api,
  sendMessage,
} from '../services/messages-service';

describe('MESSAGE API SERVICE', () => {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const MESSAGES_API = `${BASE_URL}/users`;

  const mockGroupConversationPromise = {
    createdAt: '04/19/22, 06:42 PM',
    createdBy: {
      email: 'batman@email.com',
      name: 'Bruce Wayne',
      profilePhoto:
        'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
      updatedAt: '2022-04-17T21:02:35.653Z',
      username: 'batman',
      id: '623a18276cd5e5d3d27ee790',
    },
    participants: [
      {
        email: 'batman@email.com',
        name: 'Bruce Wayne',
        profilePhoto:
          'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
        updatedAt: '2022-04-17T21:02:35.653Z',
        username: 'batman',
        id: '623a18276cd5e5d3d27ee790',
      },
      {
        email: 'ironmannnn@ironman.com',
        name: 'Tony Stark',
        profilePhoto:
          'https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg',
        username: 'ironman',
        id: '6254cd7b89b74408547a3eff',
      },
      {
        email: 'clark@superman.com',
        name: 'Clark Kent',
        profilePhoto:
          'https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg',

        username: 'superman',
        id: '6254d53089b7440854862f7b',
      },
    ],
    removeFor: [],
    type: 'GROUP',
    updatedAt: '2022-04-19',
    id: '625f3af2e0084f5f093ed10b',
  };

  const mockMessagePromise = {
    sender: {
      name: 'Bruce Wayne',
      profilePhoto:
        'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
      username: 'batman',
      id: '623a18276cd5e5d3d27ee790',
    },
    conversation: '6254d5c5c7c6a5e06a32e60b',
    message: 'Hello, group. I am Bruce',
    removeFor: [],
    createdAt: '04/11/22, 09:29 PM',
    updatedAt: '2022-04-12',
    id: '6254d5e9c7c6a5e06a32e60f',
  };

  it('can create a group conversation', async () => {
    const mockPost = jest.spyOn(api, 'post');
    api.post.mockImplementation(() =>
      Promise.resolve({ data: mockGroupConversationPromise })
    );
    const groupConversationParameter = {
      createdBy: '623a18276cd5e5d3d27ee790',
      participants: [
        '623a18276cd5e5d3d27ee790',
        '6254cd7b89b74408547a3eff',
        '6254d53089b7440854862f7b',
      ],
    };
    const userId = '123456';
    const groupConversationResponse = await createConversation(
      userId,
      groupConversationParameter
    );
    expect(mockPost).toHaveBeenCalledWith(
      `${MESSAGES_API}/${userId}/conversations`,
      groupConversationParameter
    );
    expect(groupConversationResponse).toStrictEqual(
      mockGroupConversationPromise
    );
    mockPost.mockRestore();
  });

  it('can send a message', async () => {
    const mockAxiosPost = jest.spyOn(api, 'post');
    api.post.mockImplementation(() =>
      Promise.resolve({ data: mockMessagePromise })
    );
    const userId = '623a18276cd5e5d3d27ee790';
    const conversationId = '6254d5c5c7c6a5e06a32e60b';
    const message = 'Hello, group. I am Bruce';

    const newMessage = await sendMessage(userId, conversationId, message);

    expect(mockAxiosPost).toHaveBeenCalledWith(
      `${MESSAGES_API}/${userId}/conversations/${conversationId}/messages`,
      { message }
    );
    expect(newMessage).toStrictEqual(mockMessagePromise);
    mockAxiosPost.mockRestore();
  });
});
