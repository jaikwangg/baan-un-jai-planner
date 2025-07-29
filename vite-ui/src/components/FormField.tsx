import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
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
      ) : (
        <Input
          id={field.name}
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="w-full"
        />
      )}
      
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};