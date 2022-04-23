import {
  createConversation,
  api,
  sendMessage,
  findInboxMessages,
  findConversation,
  deleteConversation,
  deleteMessage,
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

  const mockInboxPromise = [
    {
      id: '62573c47972e03c27f8dc52f',
      message: "hey what's up",
      sender: {
        name: 'Bruce Wayne',
        profilePhoto:
          'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
        id: '623a18276cd5e5d3d27ee790',
      },
      conversation: '62570f06e0084f5f095333a2',
      recipients: [
        {
          _id: '623a18276cd5e5d3d27ee790',
          name: 'Bruce Wayne',
          profilePhoto:
            'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
        },
        {
          _id: '6254d53089b7440854862f7b',
          name: 'Clark Kent',
          profilePhoto:
            'https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg',
        },
      ],
      createdAt: '2022-04-13T21:10:31.623Z',
    },
    {
      id: '6254d5e9c7c6a5e06a32e60f',
      message: 'Hello superman and ironman. I am batman',
      sender: {
        name: 'Bruce Wayne',
        profilePhoto:
          'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
        id: '623a18276cd5e5d3d27ee790',
      },
      conversation: '6254d5c5c7c6a5e06a32e60b',
      recipients: [
        {
          _id: '623a18276cd5e5d3d27ee790',
          name: 'Bruce Wayne',
          profilePhoto:
            'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
        },
        {
          _id: '6254cd7b89b74408547a3eff',
          name: 'Tony Stark',
          profilePhoto:
            'https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg',
        },
        {
          _id: '6254d53089b7440854862f7b',
          name: 'Clark Kent',
          profilePhoto:
            'https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg',
        },
      ],
      createdAt: '2022-04-12T01:29:13.775Z',
    },
  ];

  const mockDeletedConversationPromise = {
    id: '625f3af2e0084f5f093ed10b',
    type: 'GROUP',
    createdBy: '623a18276cd5e5d3d27ee790',
    participants: [
      '623a18276cd5e5d3d27ee790',
      '6254cd7b89b74408547a3eff',
      '6254d53089b7440854862f7b',
    ],
    removeFor: ['623a18276cd5e5d3d27ee790'],
  };

  const mockDeletedMessagePromise = {
    id: '6254d5e9c7c6a5e06a32e60f',
    message: 'Hello superman and ironman. I am batman',
    sender: {
      name: 'Bruce Wayne',
      profilePhoto:
        'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
      id: '623a18276cd5e5d3d27ee790',
    },
    conversation: '6254d5c5c7c6a5e06a32e60b',
    removeFor: ['623a18276cd5e5d3d27ee790'],
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
    const mockAxios = jest.spyOn(api, 'post');
    api.post.mockImplementation(() =>
      Promise.resolve({ data: mockMessagePromise })
    );
    const userId = '623a18276cd5e5d3d27ee790';
    const conversationId = '6254d5c5c7c6a5e06a32e60b';
    const message = 'Hello, group. I am Bruce';

    const newMessage = await sendMessage(userId, conversationId, message);

    expect(mockAxios).toHaveBeenCalledWith(
      `${MESSAGES_API}/${userId}/conversations/${conversationId}/messages`,
      { message }
    );
    expect(newMessage).toStrictEqual(mockMessagePromise);
    mockAxios.mockRestore();
  });

  it('find latest inbox messages', async () => {
    const mockAxios = jest.spyOn(api, 'get');
    api.get.mockImplementation(() =>
      Promise.resolve({ data: mockInboxPromise })
    );
    const userId = '623a18276cd5e5d3d27ee790';
    const inbox = await findInboxMessages(userId);

    expect(mockAxios).toHaveBeenCalledWith(
      `${MESSAGES_API}/${userId}/messages/`
    );
    expect(inbox).toStrictEqual(mockInboxPromise);
    mockAxios.mockRestore();
  });

  it('find a specific conversation', async () => {
    const mockAxios = jest.spyOn(api, 'get');
    api.get.mockImplementation(() =>
      Promise.resolve({ data: mockGroupConversationPromise })
    );
    const userId = '623a18276cd5e5d3d27ee790';
    const conversationId = '6254d5c5c7c6a5e06a32e60b';
    const conversationToBeFound = await findConversation(
      userId,
      conversationId
    );

    expect(mockAxios).toHaveBeenCalledWith(
      `${MESSAGES_API}/${userId}/conversations/${conversationId}`
    );
    expect(conversationToBeFound).toStrictEqual(mockGroupConversationPromise);
    mockAxios.mockRestore();
  });

  it('delete a conversation for a user', async () => {
    const mockAxios = jest.spyOn(api, 'delete');
    api.delete.mockImplementation(() =>
      Promise.resolve({ data: mockDeletedConversationPromise })
    );
    const userId = '623a18276cd5e5d3d27ee790';
    const conversationId = '6254d5c5c7c6a5e06a32e60b';
    const conversationToBeDeleted = await deleteConversation(
      userId,
      conversationId
    );

    expect(mockAxios).toHaveBeenCalledWith(
      `${MESSAGES_API}/${userId}/conversations/${conversationId}`
    );
    expect(conversationToBeDeleted).toStrictEqual(
      mockDeletedConversationPromise
    );
    mockAxios.mockRestore();
  });

  it('delete a message for a user', async () => {
    const mockAxios = jest.spyOn(api, 'delete');
    api.delete.mockImplementation(() =>
      Promise.resolve({ data: mockDeletedMessagePromise })
    );
    const userId = '623a18276cd5e5d3d27ee790';
    const messageId = '6254d5e9c7c6a5e06a32e60f';
    const messageToBeDeleted = await deleteMessage(userId, messageId);

    expect(mockAxios).toHaveBeenCalledWith(
      `${MESSAGES_API}/${userId}/messages/${messageId}`
    );
    expect(messageToBeDeleted).toStrictEqual(mockDeletedMessagePromise);
    mockAxios.mockRestore();
  });
});
