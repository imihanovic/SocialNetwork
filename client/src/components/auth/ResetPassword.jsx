import { useState } from 'react';
import { useParams } from 'react-router-dom';
import usePostResetPassword from '../../hooks/auth/usePostResetPassword';
import { Link } from 'react-router-dom';
import { TextInput, Label, Button } from 'flowbite-react';

const ResetPassword = () => {
  const { userId, token } = useParams();
  const { postResetPassword, error } = usePostResetPassword();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    postResetPassword(password, confirmPassword, userId, token);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-8 h-8 mr-2" src="/favicon.svg" alt="Logo" />
          Erasmus Portal
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset your password
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your new password and confirm it.
            </p>
            <form
              className="flex max-w-md flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="New password" />
                  <TextInput
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                </div>
                <div className="mb-2 block">
                  <Label htmlFor="confirmPassword" value="Confirm password" />
                  <TextInput
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Reset password
              </Button>
            </form>
            {error && (
              <div className="mt-4 text-red-600 dark:text-red-400">{error}</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
