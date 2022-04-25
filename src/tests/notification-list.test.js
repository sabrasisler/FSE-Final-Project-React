import Notifications from '../components/Notifications/index';
import { screen, render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { findNotificationsForUser, api} from '../services/notifications-service';

const MOCKED_USERS = ['alice', 'bob', 'charlie'];

// const MOCKED_TUITS = ["alice's tuit", "bob's tuit", "charlie's tuit"];

const MOCKED_NOTIFICATIONS = [
  { id: '1234', type: "FOLLOWS", userNotified: "623a18276cd5e5d3d27ee790", 
  userActing: "624ca4a2417f103f5e08eaea", read: "false" },
  { id: '567', tuit: "MESSAGES",userNotified: "623a18276cd5e5d3d27ee790", 
  userActing: "624ca4a2417f103f5e08eaea", read: "false"},
  { id: '890', tuit: "LIKES", userNotified: "623a18276cd5e5d3d27ee790", 
  userActing: "624ca4a2417f103f5e08eaea", read: "true"}
];

const expectActualNotifications = (notifications) => {
  for (const notification of notifications) {
    const DOMnotification = screen.getByText(tuit.tuit);
    expect(DOMnotification).toBeInTheDocument();
  }
};

test('tuit list renders static tuit array', () => {
  render(
    <HashRouter>
      <Notifications tuits={MOCKED_NOTIFICATIONS} deleteTuit={() => 0} />
    </HashRouter>
  );
  for (const notification of MOCKED_NOTIFICATIONS) {
    const DOMnotification = screen.getByText(tuit.tuit);
    expect(DOMnotification).toBeInTheDocument();
  }
});

test('tuit list renders mocked', async () => {
  const mock = jest.spyOn(api, 'get');

  api.get.mockImplementation(() =>
    Promise.resolve({ data: { notifications: MOCKED_NOTIFICATIONS } })
  );

  const res = await findNotificationsForUser();
  render(
    <HashRouter>
      <Notifications notifications={res.notifications} />
    </HashRouter>
  );
  expectActualTuits(res.tuits);
  mock.mockRestore();
});