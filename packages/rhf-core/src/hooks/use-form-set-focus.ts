import {
  type Control,
  type FieldValues,
  type UseFormSetFocus,
  useFormContext,
  get,
} from 'react-hook-form';

/**
 * Defines the properties for the `useFormSetFocus` hook.
 */
export type UseFormSetFocusProps<
  TFieldValues extends FieldValues = FieldValues,
> = {
  /** The control object from react-hook-form. */
  control?: Control<TFieldValues>;
};

/**
 * Defines the result type of the `useFormSetFocus` hook.
 */
export type UseFormSetFocusResult<
  TFieldValues extends FieldValues = FieldValues,
> = UseFormSetFocus<TFieldValues>;

/**
 * Hook to provide a function to focus the form field.
 *
 * @param {UseFormSetFocusProps<TFieldValues>} props - The properties for the form setFocus hook.
 * @param {Control<TFieldValues>} [props.control] - The control object from react-hook-form. If not provided, the control from the form context will be used.
 * @returns {UseFormSetFocusResult<TFieldValues>} The `setFocus` function to set the focus on field.
 */
export function useFormSetFocus<TFieldValues extends FieldValues = FieldValues>(
  props: UseFormSetFocusProps<TFieldValues>,
): UseFormSetFocusResult<TFieldValues> {
  const methods = useFormContext<TFieldValues>();

  const { control = methods.control } = props;

  const setFocus: UseFormSetFocus<TFieldValues> = (name, options = {}) => {
    const field = get(control._fields, name);
    const fieldReference = field && field._f;

    if (fieldReference) {
      const fieldRef = fieldReference.refs
        ? fieldReference.refs[0]
        : fieldReference.ref;

      if (fieldRef.focus) {
        fieldRef.focus();
        options.shouldSelect &&
          typeof fieldRef.select === 'function' &&
          fieldRef.select();
      }
    }
  };

  return setFocus;
}
