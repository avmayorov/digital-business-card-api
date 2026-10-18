import { Transform } from 'class-transformer';

export function ToBoolean(): PropertyDecorator {
  return Transform(({ value }: { value: unknown }) => {
    if (typeof value === 'string') {
      const formattedValue = value.trim().toLowerCase();
      return formattedValue === 'true' || formattedValue === '1';
    }
    return value === true || value === 1;
  });
}
