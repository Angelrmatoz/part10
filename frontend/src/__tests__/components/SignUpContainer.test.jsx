import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignUpContainer from '../../components/SignUpContainer';

describe('SignUp', () => {
  describe('SignUpContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();

      const { getByPlaceholderText, getByText } = render(
        <SignUpContainer onSubmit={onSubmit} />
      );

      const usernameInput = getByPlaceholderText('Username');
      const passwordInput = getByPlaceholderText('Password');
      const passwordConfirmInput = getByPlaceholderText('Password confirmation');
      const submitButton = getByText('Sign up');

      fireEvent.changeText(usernameInput, 'newuser');
      fireEvent.changeText(passwordInput, 'dummypassword');
      fireEvent.changeText(passwordConfirmInput, 'dummypassword');

      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({ username: 'newuser', password: 'dummypassword', passwordConfirm: 'dummypassword' });
      });
    });
  });
});

