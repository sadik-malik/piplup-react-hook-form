import { type UseComposeModifierStateResult } from './use-compose-modifier-state';

/**
 * Props for the `useComposeClassName` hook.
 */
export type UseComposeClassNameProps<
  ModifierState extends UseComposeModifierStateResult = UseComposeModifierStateResult
> = {
  /**
   * Custom classes mapped by keys such as 'root' or modifier state keys.
   * Each value can be a string representing a class name.
   */
  classes?: Partial<Record<'root' | keyof ModifierState, string>>;
  /**
   * className string to append to the composed classes.
   */
  className?: string;
  /**
   * Flag to determine whether to compose the class name based on the state and provided classes.
   * Defaults to `true`.
   */
  composeClassName?: boolean;
  /**
   * The state of modifiers that determine which classes to include.
   */
  modifierState: ModifierState;
};

/**
 * Hook to compose a className based on modifier states and additional classes.
 *
 * @param options - Options object containing modifier states and class definitions.
 * @returns Composed className string based on the provided options.
 */
export function useUnstableComposeClassName<
  ModifierState extends UseComposeModifierStateResult = UseComposeModifierStateResult
>(options: UseComposeClassNameProps<ModifierState>): string | undefined {
  const { classes, className, composeClassName = true, modifierState } = options;

  if (!composeClassName) {
    return className;
  }
  const output: Array<false | null | string | undefined> = [classes?.root];

  (Object.keys(modifierState) as Array<keyof ModifierState>).forEach((key) => {
    if (!modifierState[key]) {
      return;
    }
    output.push(classes?.[key]);
  });

  output.push(className);

  return output.filter(Boolean).join(' ');
}
