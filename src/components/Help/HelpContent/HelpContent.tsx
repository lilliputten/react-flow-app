import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
import classNames from 'classnames';
import Markdown from 'react-markdown';

import { TPropsWithClassName } from 'src/core/types';
// import { useAppSessionStore } from 'src/store/AppSessionStore';
// import { dataUrlPrefix, defaultDataFiles } from 'src/core/constants/app';

import styles from './HelpContent.module.scss';

type THelpContentProps = TPropsWithClassName;

function useHelpContent() {
  // const appSessionStore = useAppSessionStore();
  // const {
  //   // prettier-ignore
  //   autoLoadUrlTest,
  //   // autoLoadUrlEdges,
  //   // autoLoadUrlFlows,
  //   // autoLoadUrlGraphs,
  //   // autoLoadUrlNodes,
  // } = appSessionStore;
  // TODO: To memoize help content?
  return `

## Main navigation menu

![Application navigation menu](/images/help/topAppMenu.png "Application navigation menu")

At the top of the application window (or inside the hamburger button controlled side bar menu) is the main application menu with the following buttons:

- **Load data**: go to the data loading page.
- **Dark mode**: switch to the dark ui theme.
- **Help**: show this help reference.

TODO: Create all help & readme contents.
`;
}

export const HelpContent: React.FC<THelpContentProps> = observer((props) => {
  const { className } = props;
  const content = useHelpContent();
  return (
    <Box
      className={classNames(className, styles.root)}
      maxWidth="md" // NOTE: This modifier has specified in wrapping `HelpModal`
    >
      <Markdown
        // prettier-ignore
        className={classNames(styles.content)}
      >
        {content}
      </Markdown>
    </Box>
  );
});
