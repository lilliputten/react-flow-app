import buildInfoModule from 'src/build-info.json';

import { TBuildInfo } from 'src/core/types/app/TBuildInfo';

const buildInfo: TBuildInfo = buildInfoModule;

const {
  currentTimeStr, // "2024.02.10 21:04 +0700"
  currentTimeTag, // "240210-2104"
  gitBranch, // "1-project-environment"
  gitCommitHash, // "ef31eab"
  projectName, // "react-flow-app"
  timestamp, // "2024.02.10 19:18 +0700"
  timetag, // "240210-1918"
  version, // "0.0.0"
} = buildInfo;

export {
  currentTimeStr,
  currentTimeTag,
  gitBranch,
  gitCommitHash,
  projectName,
  timestamp,
  timetag,
  version,
};
