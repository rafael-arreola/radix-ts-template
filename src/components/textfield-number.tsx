import { TextField } from '@radix-ui/themes';
import { ChangeEvent, forwardRef, useMemo, useState } from 'react';

export enum DataType {
  INT = 'int',
  FLOAT = 'float',
}

type TextFieldRootProps = React.ComponentPropsWithoutRef<typeof TextField.Root> & {
  datatype?: DataType;
};

const TextFieldNumber = forwardRef<HTMLInputElement, TextFieldRootProps>((props, ref) => {
  const { datatype = DataType.FLOAT } = props;
  const [value, setValue] = useState(props.value || 0);

  const numberFormatter = useMemo(
    () =>
      Intl.NumberFormat('es-MX', {
        minimumFractionDigits: datatype === DataType.INT ? 0 : 2,
        maximumFractionDigits: datatype === DataType.INT ? 0 : 2,
      }),
    [datatype],
  );

  function handleChange(
    realChangeFn: React.ChangeEventHandler<HTMLInputElement> | undefined,
    formattedValue: string,
  ) {
    const digits = formattedValue.replace(/\D/g, '');
    const divisor = datatype === DataType.INT ? 1 : 100;
    const realValue = Number(digits) / divisor;
    setValue(realValue);

    if (realChangeFn) {
      const syntheticEvent = {
        target: { value: realValue },
      } as unknown as ChangeEvent<HTMLInputElement>;

      realChangeFn(syntheticEvent);
    }
  }

  const formattedValue = useMemo(() => {
    return numberFormatter.format(Number(value));
  }, [value, numberFormatter]);

  const { onChange, children, className, ...textFieldProps } = props;

  return (
    <TextField.Root
      {...textFieldProps}
      ref={ref}
      value={formattedValue}
      onChange={(ev: ChangeEvent<HTMLInputElement>) => {
        handleChange(onChange, ev.target.value);
      }}
      className={`currency-field ${className || ''}`}
    >
      {children}
    </TextField.Root>
  );
});

export default TextFieldNumber;
