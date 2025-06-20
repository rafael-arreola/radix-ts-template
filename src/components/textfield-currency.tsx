import { TextField } from '@radix-ui/themes';
import { ChangeEvent, forwardRef, useMemo, useState } from 'react';

const moneyFormatter = Intl.NumberFormat('es-MX', {
  currency: 'MXN',
  currencyDisplay: 'symbol',
  currencySign: 'standard',
  style: 'currency',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

type TextFieldRootProps = React.ComponentPropsWithoutRef<typeof TextField.Root>;

const TextFieldCurrency = forwardRef<HTMLInputElement, TextFieldRootProps>((props, ref) => {
  const [value, setValue] = useState(props.value || 0);

  function handleChange(
    realChangeFn: React.ChangeEventHandler<HTMLInputElement> | undefined,
    formattedValue: string,
  ) {
    const digits = formattedValue.replace(/\D/g, '');
    const realValue = Number(digits) / 100;
    setValue(realValue);

    if (realChangeFn) {
      const syntheticEvent = {
        target: { value: realValue },
      } as unknown as ChangeEvent<HTMLInputElement>;

      realChangeFn(syntheticEvent);
    }
  }

  const moneyValue = useMemo(() => {
    return moneyFormatter.format(Number(value));
  }, [value]);

  const { onChange, children, className, ...textFieldProps } = props;

  return (
    <TextField.Root
      {...textFieldProps}
      value={moneyValue}
      onChange={(ev: ChangeEvent<HTMLInputElement>) => {
        handleChange(onChange, ev.target.value);
      }}
      className={`currency-field ${className}`}
      ref={ref}
    >
      {children}
    </TextField.Root>
  );
});

export default TextFieldCurrency;
