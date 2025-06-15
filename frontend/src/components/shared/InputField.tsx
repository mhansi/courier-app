import { Field, ErrorMessage } from 'formik';

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
}

export default function InputField({
  label,
  name,
  type = 'text',
  placeholder,
  value = '',
  disabled = false,
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        className={`
          w-full px-4 py-2 border border-gray-300 rounded-md
          focus:outline-none focus:ring-2 focus:ring-blue-500
          disabled:bg-gray-100 disabled:text-gray-400
        `}
        disabled={disabled}
      />
      <ErrorMessage name={name} component="p" className="text-sm text-red-500 mt-1" />
    </div>
  );
}
