import type * as React from 'react';
import {
  useFormStateAdapter,
  type UseFormStateAdapterProps,
  useFormReset,
} from '@piplup/rhf-core';
import { useEventCallback } from '@piplup/utils';
import { type FieldValues } from 'react-hook-form';

export interface UseHtmlButtonAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
> extends UseFormStateAdapterProps<TFieldValues> {
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => void;
  type?: 'button' | 'reset' | 'submit';
}

export function useHtmlButtonAdapter<
  TFieldValues extends FieldValues = FieldValues,
  RefType = unknown,
>(props: UseHtmlButtonAdapterProps<TFieldValues>, ref?: React.Ref<RefType>) {
  const { control, onClick, type } = props;

  const { name: buttonName, ...adapter } = useFormStateAdapter(props, ref);

  const reset = useFormReset<TFieldValues>({
    control,
  });

  const handleClick: React.MouseEventHandler<HTMLButtonElement> =
    useEventCallback((event, ...args) => {
      if (typeof onClick === 'function') {
        onClick(event, ...args);
      }

      if (type === 'reset' && !event.defaultPrevented) {
        reset();
      }
    });

  return {
    ...adapter,
    onClick: handleClick,
    type,
    ...(typeof buttonName === 'string' && {
      name: buttonName,
    }),
  };
}
