import React from 'react';
import { Box, Button, ButtonOwnProps, CircularProgress } from '@mui/material';
import { Check, DriveFolderUpload } from '@mui/icons-material';
import classNames from 'classnames';

import { TAppDataKey, TDataFileUploadInfo, TPropsWithClassName } from 'src/core/types';
import { loadDataFile, TLoadDataFileProgressParams } from 'src/core/helpers/data';
import * as toasts from 'src/ui/Basic/Toasts';

import styles from './DataFileUploadField.module.scss';

interface TDataFileUploadFieldProps<T = unknown> extends TPropsWithClassName {
  id: TAppDataKey;
  /** Text string to show in file upload button */
  text?: string;
  setFileInfo?: (info?: TDataFileUploadInfo) => void;
  setData?: (data?: T) => void;
  setError?: (error?: Error) => void;
  buttonProps?: ButtonOwnProps;
  /** Initial loaded flag */
  defaultLoaded?: boolean;
  /** File to automatic load */
  autoLoadUrl?: string;
}

const expectedDataTypes = [
  // prettier-ignore
  'application/json',
];
const defaultDataType = expectedDataTypes[0];

/* interface TMemo {
 *   inited?: boolean;
 *   loaded?: boolean;
 * }
 */

export const DataFileUploadField = <T extends unknown>(props: TDataFileUploadFieldProps<T>) => {
  const {
    // prettier-ignore
    id,
    text = 'Upload file',
    className,
    setFileInfo,
    setData,
    setError: setParentError,
    buttonProps,
    defaultLoaded,
    autoLoadUrl,
  } = props;
  // const memo = React.useMemo<TMemo>(() => ({}), []);
  const [error, setError] = React.useState<Error>();
  // Hoist the error to parent component
  React.useEffect(() => {
    if (setParentError) {
      setParentError(error);
    }
  }, [setParentError, error]);
  /** If data has already loaded then it's possible to go to core visualizer/editor */
  // const [isLoaded, setLoaded] = React.useState(!!defaultLoaded);
  const isLoaded = !!defaultLoaded;
  const [isLoading, setLoading] = React.useState(false);
  const [loadingProgress, setLoadingProgress] = React.useState<number | undefined>();
  /* React.useEffect(() => {
   *   memo.loaded = isLoaded;
   * }, [memo, isLoaded]);
   */
  // Data loading services...
  const handleLoadingProgress = React.useCallback((params: TLoadDataFileProgressParams) => {
    const {
      // prettier-ignore
      progress,
      // loaded,
      // total,
      // fileReader,
    } = params;
    /* console.log('[DataFileUploadField:handleLoadingProgress]', {
     *   progress,
     *   loaded,
     *   total,
     *   fileReader,
     * });
     */
    // TODO:
    setLoadingProgress(progress);
  }, []);
  const processError = React.useCallback(
    (error: Error) => {
      // TODO: Extend basic error with some extra info (file id, explanatory text, etc?)
      // eslint-disable-next-line no-console
      console.error('[DataFileUploadField:processError]', {
        error,
      });
      debugger; // eslint-disable-line no-debugger
      // Set error to parent component or show the toast
      if (setError) {
        setError(error);
      } else {
        toasts.showError(error);
      }
      if (setData) {
        setData(undefined);
      }
      if (setFileInfo) {
        setFileInfo(undefined);
      }
    },
    [setFileInfo, setData, setError],
  );
  const loadDataFromFile = React.useCallback(
    (file: File) => {
      const { name: fileName, type: fileType, size: fileSize } = file;
      const fileInfo = { fileId: id, fileName, fileType, fileSize };
      // setLoaded(false);
      setLoading(true);
      loadDataFile(file, {
        timeout: 5000,
        onProgress: handleLoadingProgress,
      })
        .then((data) => {
          /* console.log('[DataFileUploadField:loadDataFromFile] loadDataFile success', {
           *   id,
           *   fileName,
           *   data,
           *   fileInfo,
           * });
           */
          toasts.showSuccess('File "' + fileName + '" successfully loaded in slot "' + id + '"!');
          // setLoaded(true);
          if (setData) {
            setData(data as T);
          }
          if (setFileInfo) {
            setFileInfo(fileInfo);
          }
          if (setError) {
            setError(undefined);
          }
        })
        .catch(processError)
        .finally(() => {
          setLoading(false);
          setLoadingProgress(undefined);
        });
    },
    [handleLoadingProgress, processError, id, setData, setFileInfo],
  );
  const loadDataFromUrl = React.useCallback(
    (url: string) => {
      /* console.log('[DataFileUploadField:loadDataFromUrl] start', {
       *   url,
       * });
       */
      // setLoaded(false);
      setLoading(true);
      fetch(url)
        .then((res) => {
          /* console.log('[DataFileUploadField:loadDataFromUrl] response', {
           *   res,
           *   url,
           * });
           */
          return res.blob();
        })
        .then((data) => {
          const fileName = url.replace(/^.*\//, '');
          const {
            type,
            // size,
          } = data;
          const cmpType = type.replace(/;.*$/, '');
          /* console.log('[DataFileUploadField:loadDataFromUrl] data`', {
           *   cmpType,
           *   type,
           *   data,
           *   // size,
           *   fileName,
           *   url,
           * });
           */
          if (!expectedDataTypes.includes(cmpType)) {
            throw new Error(
              'Invalid data type for url "' +
                url +
                '": "' +
                type +
                '" (probably this data file is absent or wrong name has specified)',
            );
          }
          const metadata = {
            type: defaultDataType,
          };
          const file = new File([data], fileName, metadata);
          loadDataFromFile(file);
        })
        .catch(processError)
        .finally(() => {
          setLoading(false);
        });
    },
    [loadDataFromFile, processError],
  );
  const handleSelectedFile: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    (ev) => {
      const files = ev.target.files;
      const file = files && files[0];
      if (!file) {
        // Error...
        toasts.showError('No file selected!');
        return;
      }
      const {
        name: fileName,
        type: fileType,
        // size: fileSize,
      } = file;
      // const fileInfo = { fileName, fileType, fileSize };
      if (!/\.json$/.test(fileName) || fileType !== 'application/json') {
        // Error...
        toasts.showWarn('Expected json data file!');
        return;
      }
      /* console.log('[DataFileUploadField:handleSelectedFile]', {
       *   fileInfo,
       *   files,
       *   file,
       *   ev,
       * });
       */
      loadDataFromFile(file);
    },
    [loadDataFromFile],
  );
  /** Effect: Handle auto-load url */
  React.useEffect(() => {
    // if (!memo.inited) {
    // Prevent double calling in strict mode (to use memoized `inited` status)
    if (autoLoadUrl && !defaultLoaded) {
      // memo.inited = true;
      /* console.log('[DataFileUploadField:Effect: Handle auto-load url]', {
       *   inited: memo.inited,
       *   autoLoadUrl,
       * });
       */
      loadDataFromUrl(autoLoadUrl);
    }
    // }
  }, [defaultLoaded, autoLoadUrl, loadDataFromUrl]);
  /** Button icon depending to current component state */
  const IconNode = React.useMemo<JSX.Element>(() => {
    if (isLoaded) {
      return <Check />;
    } else if (isLoading) {
      return (
        <CircularProgress
          // prettier-ignore
          size={20} // Icon-size
          color="inherit" // Default color
          variant={loadingProgress ? 'determinate' : 'indeterminate'}
          value={loadingProgress}
        />
      );
    } else {
      return <DriveFolderUpload />;
    }
  }, [isLoading, isLoaded, loadingProgress]);
  return (
    <Box className={classNames(className, styles.root)} id={'DataFileUploadField-' + id}>
      <Button
        {...buttonProps}
        className={styles.button}
        component="label"
        variant="contained"
        startIcon={IconNode} // Show icon depending on state...
        disabled={isLoading}
        color={!!error ? 'error' : isLoaded ? 'success' : 'primary'}
      >
        {text}
        <input
          className={styles.input}
          onChange={handleSelectedFile}
          type="file"
          accept=".json"
          hidden
          disabled={isLoading}
        />
      </Button>
    </Box>
  );
};
