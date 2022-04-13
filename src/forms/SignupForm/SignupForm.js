import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerThunk, updateUserThunk } from '../../redux/userSlice';
import { PopupModal } from '../../components';
import SignupInputs from './SignupInputs';

/**
 * Signup form displayed in a pop modal when the user clicks to register.
 * Validates user input. Checks redux state to see if user has completed profile, and if not, prompts the user to complete it. This applies for users who sign up with google, which after registered on the backend, need to fill out their username and date of birth.
 */
const SignupForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const profileComplete = useSelector((state) => state.user.profileComplete);
  const [inputValues, setInputValues] = useState({});
  const [inputFields, setInputFields] = useState([]);

  const isFormValid = () => {
    for (const input in inputFields) {
      const pattern = inputFields[input].pattern;
      if (pattern) {
        const regex = new RegExp(pattern);
        const inputValue = inputValues[inputFields[input].name];
        //
        if (!regex.test(inputValue)) return false;
      }
    }
    return true;
  };

  const handleSignup = () => {
    if (isFormValid()) {
      dispatch(registerThunk(inputValues));
    }
  };
  const handleCompleteSignup = () => {
    dispatch(updateUserThunk({ id: user.id, ...inputValues }));
  };

  useEffect(() => {
    const defaultInputVales = {
      name: '',
      username: '',
      email: '',
      birthday: '',
      password: '',
      confirmPassword: '',
      headerImage: '',
      bio: '',
      accountType: 'Personal',
      profilePhoto:
        'https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg',
    };
    if (user) {
      setInputValues({
        ...defaultInputVales,
        ...user,
        // birthday: user.birthday.toISOString().split('T')[0],
      });
    } else {
      setInputValues({ ...defaultInputVales });
    }
  }, [user, profileComplete]);

  const signUpModalProps = {
    content: {
      size: 'md',
      title: 'Create account',
      body: (
        <SignupInputs
          inputValues={inputValues}
          setInputValues={setInputValues}
          setInputFields={setInputFields}
        />
      ),
      submitLabel: 'Submit',
      modalOpenerLabel: 'Sign up',
    },
    handleSubmit: handleSignup,
    show: false,
  };

  const completeSignupModalProps = {
    content: {
      size: 'md',
      title: 'Create account',
      body: (
        <SignupInputs
          inputValues={inputValues}
          setInputValues={setInputValues}
          setInputFields={setInputFields}
        />
      ),
      submitLabel: 'Submit',
    },
    handleSubmit: handleCompleteSignup,
    show: true,
  };

  return (
    <div>
      {/* {user && !profileComplete ? (
        <PopupModal props={completeSignupModalProps} />
      ) : (
        <PopupModal props={signUpModalProps} />
      )} */}
    </div>
  );
};

export default SignupForm;
