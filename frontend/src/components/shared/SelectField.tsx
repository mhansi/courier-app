import { Field, ErrorMessage } from 'formik';

interface SelectFieldProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value?: string | number;
  disabled?: boolean;
}

export default function SelectField({ label, name, options, value, disabled }: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <Field
        as="select"
        id={name}
        name={name}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        disabled={disabled}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component="p" className="text-sm text-red-500 mt-1" />
    </div>
  );
}
