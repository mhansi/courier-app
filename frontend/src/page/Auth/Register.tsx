import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/auth';
import { Role, type User } from '../../types/Auth';
import InputField from '../../components/shared/InputField';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/shared/Button';
import logo from '../../assets/react.svg';

interface RegisterData extends Omit<User, 'id'> {
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const validate = (values: RegisterData) => {
    const errors: Record<string, string> = {};
    if (!values.name) errors.name = 'Name is required';
    if (!values.email) errors.email = 'Email is required';
    if (!values.password) errors.password = 'Password is required';
    if (values.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (values.password !== values.confirmPassword) errors.confirmPassword = 'Password confirmation failed';
    if (!values.address) errors.address = 'Address is required';
    if (!values.phone) errors.phone = 'Phone is required';
    if (!values.role) errors.role = 'Role is required';
    return errors;
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="bg-gray-50 flex mt-12 justify-center px-4">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 p-10">
          <div className="text-center">
            <img src={logo} alt="Logo" className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-3xl text-white font-bold">Welcome to Courier App</h2>
            <p className="text-blue-100 mt-2">
              Manage your shipments with ease and speed.
            </p>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Create Your Account
          </h2>

          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
              address: '',
              phone: '',
              role: Role.CLIENT,
            }}
            validate={validate}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await register({
                  name: values.name,
                  email: values.email,
                  phone: values.phone,
                  address: values.address,
                  role: values.role,
                  password: values.password
                });

                alert('Registered successfully!');
                navigate('/login');
              } catch (err) {
                alert('Registration failed');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, values }) => (
              <Form className="space-y-4">
                <InputField name="name" value={values.name} label="Full Name" placeholder="Enter your full name" />
                <InputField name="email" value={values.email} label="Email Address" type="email" placeholder="Enter your email" />
                <InputField name="address" value={values.address} label="Address" placeholder="Enter your address" />
                <InputField name="phone" value={values.phone} label="Phone Number" placeholder="Enter your phone number" />
                <InputField name="password" value={values.password} label="Password" type="password" placeholder="Create a password" />
                <InputField name="confirmPassword" value={values.confirmPassword} label="Confirm Password" type="password" placeholder="Re-enter the password" />

                <div className="pt-2">
                  <Button type="submit" loading={isSubmitting} className="w-full">
                    Register
                  </Button>
                </div>

                <p className="text-sm text-center text-gray-600">
                  Already have an account?{' '}
                  <a href="/login" className="text-blue-600 hover:underline">
                    Login here
                  </a>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
