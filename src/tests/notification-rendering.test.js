/* eslint-disable testing-library/no-unnecessary-act */
import { Provider } from 'react-redux';
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
  within,
} from '@testing-library/react';
import Notification from '../components/Notifications/notification';
import Notifications from "../components/Notifications/index";
import configureStore from 'redux-mock-store';
import { HashRouter } from "react-router-dom";


describe('Notification types', () => {
  let notification;
  let tuitStats;
  let root;
  let store;

  beforeAll(() => {
    // The LikeDislikeButton component nested in TuitStats uses redux, so first set up mock state.
    // const initialState = { user: { data: { id: '666' } } };
    // const mockStore = configureStore();
    // store = mockStore(initialState);

    notification = {id: "123", type: "FOLLOWS", userNotified: "623a18276cd5e5d3d27ee790", 
        userActing: "624ca4a2417f103f5e08eaea", read: "false" };
  });

  const setup = () =>
    render(
      // redux provider required by component
      <HashRouter>
        <Notification Notification={notification} />
      </HashRouter>
    );

  test('follows notification renders correctly', async () => {
    setup();
    const notificationComponent = await screen.findByTestId('ttr-follows-notification-text');
    const followsText = within(notificationComponent).findByText('followed you.');
    expect(followsText).toBeInTheDocument();
  });


});