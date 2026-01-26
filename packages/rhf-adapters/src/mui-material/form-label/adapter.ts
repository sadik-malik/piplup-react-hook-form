import { useFormControl } from '@mui/material';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  useHtmlFormLabelAdapter,
  type UseHtmlFormLabelProps,
} from '../../html/form-label/adapter';

export interface UseMuiFormLabelAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseHtmlFormLabelProps<TFieldValues, TName> {}

export function useMuiFormLabelAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiFormLabelAdapterProps<TFieldValues, TName>,
  ref?: React.Ref<RefType>,
) {
  const { disabled: disabledProp, ...rest } = props;

  const muiFormControl = useFormControl();

  let disabled = disabledProp;
  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
  }

  const adapter = useHtmlFormLabelAdapter(
    {
      ...rest,
      disabled,
    },
    ref,
  );

  return {
    ...adapter,
    classes: props.classes,
  };
}
