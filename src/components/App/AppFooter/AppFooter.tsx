import * as React from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

import { TDataFileUploadInfo, TPropsWithClassName } from 'src/core/types';
import {
  version,
  timestamp,
  // isDev,
  // demoPageUrl,
  // mainPageUrl,
  // // TODO: Show state depending on the current page
} from 'src/core/constants/config';
import { getAppDataInfo, useAppDataStore } from 'src/store/AppDataStore';

import styles from './AppFooter.module.scss';
import { getApproxSize } from 'src/core/helpers/basic';
import { makeTitleFromPropertyId } from 'src/core/helpers/data';

const FileInfoContent: React.FC<{ info: TDataFileUploadInfo }> = ({ info }) => {
  const appDataStore = useAppDataStore();
  const {
    fileId,
    fileName,
    // fileType,
    fileSize,
  } = info;
  const title = makeTitleFromPropertyId(fileId, { parseCamelCase: true });
  const size = getApproxSize(fileSize, { normalize: true }).join('');
  const dataInfo = getAppDataInfo(appDataStore[fileId]);
  return (
    <span className={styles.FileInfo} data-file-id={fileId}>
      {title}: <strong>{fileName}</strong> ({size}, {dataInfo})
    </span>
  );
};

const DataState: React.FC<TPropsWithClassName> = observer((props) => {
  const { className } = props;
  const appDataStore = useAppDataStore();
  const {
    // prettier-ignore
    hasSomeData,
    fileInfos,
  } = appDataStore;
  const content =
    hasSomeData &&
    !!fileInfos &&
    Object.values(fileInfos)
      .filter(Boolean)
      .map((info) => <FileInfoContent key={info.fileId} info={info} />);
  return <div className={classNames(className, styles.DataState)}>{content}</div>;
});

export const AppFooter: React.FC<TPropsWithClassName> = (props) => {
  const appInfo = `Version: ${version} @${timestamp}`;
  const { className } = props;
  return (
    <div className={classNames(className, styles.root)}>
      <DataState className={classNames(styles.leftInfo)} />
      <div className={classNames(styles.rightInfo)}>
        {/* Application info */}
        {appInfo}
      </div>
    </div>
  );
};
