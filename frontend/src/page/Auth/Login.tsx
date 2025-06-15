import { Formik, Form } from 'formik';
import { login } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import Button from '../../components/shared/Button';
import InputField from '../../components/shared/InputField';

export default function Login() {
  const navigate = useNavigate();
  const { user, onLogin } = useAuth();

  const validate = (values: { email: string; password: string }) => {
    const errors: Record<string, string> = {};
    if (!values.email) errors.email = 'Email is required';
    if (!values.password) errors.password = 'Password is required';
    return errors;
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="flex mt-12 justify-center p-4">
      <div className="w-full max-w-md bg-gray-50 shadow-xl rounded-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
          <p className="text-sm text-gray-500">Access your dashboard</p>
        </div>

        <Formik
          initialValues={{ email: '', password: '' }}
          validate={validate}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const loginData = await login(values);
              onLogin(loginData.token);
              navigate('/dashboard');
            } catch (err) {
              alert('Login failed. Please check your credentials.');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, values }) => (
            <Form className="space-y-5">
              <InputField
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={values.email}
              />
              <InputField
                name="password"
                type="password"
                label="Password"
                value={values.password}
                placeholder="Enter your password"
              />
              <div className="pt-2">
                <Button type="submit" loading={isSubmitting} className="w-full">
                  Login
                </Button>
              </div>
              <p className="text-sm text-center text-gray-600">
                Don't have an account?{' '}
                <a href="/register" className="text-blue-600 hover:underline">
                  Register here
                </a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
