import buildInfoModule from 'src/build-info.json';

import { TBuildInfo } from 'src/core/types/app/TBuildInfo';

const buildInfo: TBuildInfo = buildInfoModule;

const {
  buildInfoText, // "Project: react-flow-app\nVersion: 0.0.0\nBranch: 1-project-environment\nCommit: ef31eab\nFixed: 2024.02.10 19:18 +0700\nBuilt: 2024.02.10 21:04 +0700"
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
  buildInfoText, // "Project: react-flow-app\nVersion: 0.0.0\nBranch: 1-project-environment\nCommit: ef31eab\nFixed: 2024.02.10 19:18 +0700\nBuilt: 2024.02.10 21:04 +0700"
  currentTimeStr, // "2024.02.10 21:04 +0700"
  currentTimeTag, // "240210-2104"
  gitBranch, // "1-project-environment"
  gitCommitHash, // "ef31eab"
  projectName, // "react-flow-app"
  timestamp, // "2024.02.10 19:18 +0700"
  timetag, // "240210-1918"
  version, // "0.0.0"
};
