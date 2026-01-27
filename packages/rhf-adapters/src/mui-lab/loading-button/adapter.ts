/**
 * Deprecated: importing from "@piplup/rhf-adapters/mui-lab/loading-button" is deprecated.
 * Please import from "@piplup/rhf-adapters/mui-material" instead:
 *
 * import { useMuiButtonAdapter } from "@piplup/rhf-adapters/mui-material"
 */

if (process.env.NODE_ENV !== 'production') {
  console.warn(
    '[deprecated] Importing from "@piplup/rhf-adapters/mui-lab/loading-button" is deprecated. Use "@piplup/rhf-adapters/mui-material" instead: import { useMuiButtonAdapter } from "@piplup/rhf-adapters/mui-material"',
  );
}

export {
  useMuiButtonAdapter as useMuiLoadingButtonAdapter,
  type UseMuiButtonAdapterProps as UseMuiLoadingButtonAdapterProps,
} from '../../mui-material/button';
