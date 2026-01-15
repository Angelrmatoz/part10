import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignInContainer from '../../components/SignInContainer';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();

      const { getByPlaceholderText, getByText } = render(
        <SignInContainer onSubmit={onSubmit} />
      );

      const usernameInput = getByPlaceholderText('Username');
      const passwordInput = getByPlaceholderText('Password');
      const submitButton = getByText('Sign in');

      fireEvent.changeText(usernameInput, 'testuser');
      fireEvent.changeText(passwordInput, 'dummypassword');

      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({ username: 'testuser', password: 'dummypassword' });
      });
    });
  });
});
