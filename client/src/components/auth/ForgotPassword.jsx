import { useState } from 'react';
import usePostForgotPassword from '../../hooks/auth/usePostForgotPassword';
import { Link } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { postForgotPassword, error } = usePostForgotPassword();

  const handleSubmit = (event) => {
    event.preventDefault();
    postForgotPassword(email);
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
              Request password reset link
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your email address and we will send you a link to reset your
              password.
            </p>
            <form
              className="flex max-w-md flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send password reset link
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

export default ForgotPassword;
