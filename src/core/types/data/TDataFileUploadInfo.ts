import { TAppDataKey } from './TAppDataKey';

export interface TDataFileUploadInfo {
  fileId: TAppDataKey;
  fileName: string;
  fileType: string;
  fileSize: number;
}
