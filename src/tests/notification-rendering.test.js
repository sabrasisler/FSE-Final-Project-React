/* eslint-disable testing-library/no-unnecessary-act */
import { Provider } from 'react-redux';
import {
    render,
    fireEvent,
    screen,
    waitFor,
    within,
} from '@testing-library/react';
import Notification from '../components/Notifications/notification';
import Notifications from "../components/Notifications/index";
import configureStore from 'redux-mock-store';
import { MemoryRouter } from "react-router-dom";
import {act, create} from 'react-test-renderer';


describe('Notification types', () => {
    let notifications;
    let root;

    beforeAll(() => {
        // The LikeDislikeButton component nested in TuitStats uses redux, so first set up mock state.
        // const initialState = { user: { data: { id: '666' } } };
        // const mockStore = configureStore();
        // store = mockStore(initialState);


    });


    test('follows notification renders correctly', () => {
        let notification = {
            id: "123", type: "FOLLOWS", userNotified: { id: "623a18276cd5e5d3d27ee790", username: "bob" },
            userActing: { id: "624ca4a2417f103f5e08eaea", username: "alice" }, read: "false"
        };
        let followNotification
        act(() => {
            followNotification = create(
                <MemoryRouter>
                    <Notification key={notification.id} notificationFromList={notification} /> </MemoryRouter>
            );
        });
        const root = followNotification.root;
        const followsTextComponent = root.findByProps(
            { className: 'ttr-follows-notification-text' });
        const followsText = followsTextComponent.children[0];
        expect(followsText).toBe(" followed you.")
    });

    test('messages notification renders correctly', () => {
        let notification = {
            id: "123", type: "MESSAGES", userNotified: { id: "623a18276cd5e5d3d27ee790", username: "bob" },
            userActing: { id: "624ca4a2417f103f5e08eaea", username: "alice" }, read: "false"
        };
        let followNotification
        act(() => {
            followNotification = create(
                <MemoryRouter>
                    <Notification key={notification.id} notificationFromList={notification} /> </MemoryRouter>
            );
        });
        const root = followNotification.root;
        const followsTextComponent = root.findByProps(
            { className: 'ttr-messages-notification-text' });
        const followsText = followsTextComponent.children[0];
        expect(followsText).toBe(" messaged you.")
    });

    test('likes notification renders correctly', () => {
        let notification = {
            id: "123", type: "LIKES", userNotified: { id: "623a18276cd5e5d3d27ee790", username: "bob" },
            userActing: { id: "624ca4a2417f103f5e08eaea", username: "alice" }, read: "false"
        };
        let followNotification
        act(() => {
            followNotification = create(
                <MemoryRouter>
                    <Notification key={notification.id} notificationFromList={notification} /> </MemoryRouter>
            );
        });
        const root = followNotification.root;
        const followsTextComponent = root.findByProps(
            { className: 'ttr-likes-notification-text' });
        const followsText = followsTextComponent.children[0];
        expect(followsText).toBe(" liked your tuit.")
    });

// describe('Notification types', () => {
//   let notification;
//   let tuitStats;
//   let root;
//   let store;

//   beforeAll(() => {
//     // The LikeDislikeButton component nested in TuitStats uses redux, so first set up mock state.
//     // const initialState = { user: { data: { id: '666' } } };
//     // const mockStore = configureStore();
//     // store = mockStore(initialState);

//     notification = {id: "123", type: "FOLLOWS", userNotified: {id: "623a18276cd5e5d3d27ee790", username: "bob"}, 
//         userActing: {id: "624ca4a2417f103f5e08eaea", username: "alice"}, read: "false" };
//   });

// //   const setup = () =>
// //     render(
// //       // redux provider required by component
// //       <HashRouter>
// //         <Notification Notification={notification} />
// //       </HashRouter>
// //     );
//   const setup = () =>
//     TestRenderer.create(
//         <Notification Notification={notification} />);

//   test('follows notification renders correctly', async () => {
//     setup();
//     const notificationComponent = await screen.findByTestId('ttr-notification-component');
//     const followsText = within(notificationComponent).findByText('followed you.');
//     expect(followsText).toBeInTheDocument();
//   });
 });