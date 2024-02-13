import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from 'src/reportWebVitals';
import { AppPage } from 'src/pages/AppPage';

import 'src/core/global/global-includes';
import 'src/core/global/global-styles.scss';

const rootNode = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootNode);

const __debugUseStrictMode = false;

let RootNode = <AppPage />;

if (__debugUseStrictMode) {
  RootNode = (
    <React.StrictMode>
      {/* Execute main content with strict mode */}
      {RootNode}
    </React.StrictMode>
  );
}

root.render(RootNode);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
