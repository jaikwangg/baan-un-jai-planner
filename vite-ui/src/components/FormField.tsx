import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { FormField as FormFieldType } from '../types/assessment';

interface FormFieldProps {
  field: FormFieldType;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const FormField = ({ field, value, onChange, error }: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={field.name} className="text-[#309899] text-sm font-medium">
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>

      {/* Select Field */}
      {field.type === 'select' ? (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder={`เลือก${field.label}`} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : field.type === 'radio' ? (
        <div className="space-y-2">
          {field.options?.map((option) => (
            <div key={option} className="flex items-start gap-2">
              <input
                type="radio"
                id={`${field.name}-${option}`}
                name={field.name}
                value={option}
                checked={value === option}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1"
              />
              <label htmlFor={`${field.name}-${option}`} className="text-sm">
                {option}
              </label>

              {/* Show subFields if this option is selected */}
              {value === option && field.subFields?.[option]?.map((subField) => (
                <div key={subField.name} className="ml-6 mt-2 w-full">
                  <Label htmlFor={subField.name} className="text-sm text-gray-600">
                    {subField.label}
                  </Label>
                  <Input
                    id={subField.name}
                    type={subField.type}
                    placeholder={subField.placeholder}
                    className="mt-1"
                    onChange={(e) => {
                      // Use JSON.stringify for multi-input state handling (optional enhancement)
                      onChange(`${option}|${subField.name}:${e.target.value}`);
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        // Default input
        <Input
          id={field.name}
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="w-full"
        />
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
