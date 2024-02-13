import { observer } from 'mobx-react-lite';

import { TDemoComponent } from 'src/core/types';
import { getAppDataInfo, useAppDataStore } from 'src/store/AppDataStore';

export const DemoCheckDataStore: TDemoComponent = observer(() => {
  const appDataStore = useAppDataStore();
  const {
    // prettier-ignore
    inited,
    finished,
    ready,
    loading,
    error,
    testData,
  } = appDataStore;
  return (
    <div className="DemoCheckDataStore">
      {/* ... */}
      <h1>DemoCheckDataStore</h1>
      <p>inited: {String(inited)}</p>
      <p>finished: {String(finished)}</p>
      <p>ready: {String(ready)}</p>
      <p>loading: {String(loading)}</p>
      <p>error: {String(error)}</p>
      <p>testData: {getAppDataInfo(testData)}</p>
    </div>
  );
});

DemoCheckDataStore.__title = 'Basic data store check';
