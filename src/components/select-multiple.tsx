import { Button, Checkbox, Popover, ScrollArea, TextField } from '@radix-ui/themes';
import _ from 'lodash';
import { ChevronDown, SearchIcon } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectMultipleProps {
  value: string[];
  disabled?: boolean;
  placeholder?: string;
  options: Option[];
  onChange: (values: string[]) => void;
  placeholderSearch?: string;
}

const SelectMultiple = (props: SelectMultipleProps) => {
  const [search, setSearch] = useState('');

  const onChgSearch = useCallback(
    _.debounce((value: string) => {
      setSearch(value);
    }, 300),
    [],
  );

  const toggleValue = useCallback(
    (val: string) => {
      if (props.value.includes(val)) {
        props.onChange(props.value.filter((v) => v !== val));
      } else {
        props.onChange([...props.value, val]);
      }
    },
    [props.value],
  );

  const selectedLabels = useMemo(() => {
    return props.options
      .filter((o) => props.value.includes(o.value))
      .map((o) => o.label)
      .join(', ');
  }, [props.options, props.value]);

  return (
    <Popover.Root>
      <Popover.Trigger disabled={props.disabled}>
        <Button type="button" variant="outline" color="gray" className="!w-full !justify-between">
          <span className={selectedLabels ? '' : 'text-muted-foreground'}>
            {selectedLabels || props.placeholder || 'Seleccione al menos una opción'}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </Popover.Trigger>

      <Popover.Content className="!p-0">
        <div className="p-2">
          <TextField.Root
            placeholder={props.placeholderSearch || 'Buscar..'}
            defaultValue={search}
            onChange={(e) => onChgSearch(e.target.value)}
          >
            <TextField.Slot>
              <SearchIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </div>
        <ScrollArea type="auto" scrollbars="vertical" className="max-h-[256px]">
          {props.options
            .filter((option) => option.label.toLowerCase().includes(search.toLowerCase()))
            .map((option) => (
              <div key={option.value}>
                <label className="cursor-pointer select-none flex items-center gap-2 rounded-sm px-2 mb-1">
                  <Checkbox
                    disabled={option.disabled}
                    checked={props.value.includes(option.value)}
                    onCheckedChange={() => toggleValue(option.value)}
                  />
                  <span>{option.label}</span>
                </label>
              </div>
            ))}
        </ScrollArea>
      </Popover.Content>
    </Popover.Root>
  );
};

export default SelectMultiple;
