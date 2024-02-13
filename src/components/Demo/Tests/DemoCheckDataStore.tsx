import { observer } from 'mobx-react-lite';

import { TDemoComponent } from 'src/core/types';
// import { useAppSessionStore } from 'src/store/AppSessionStore';
import { useAppDataStore } from 'src/store/AppDataStore';

export const DemoCheckDataStore: TDemoComponent = observer(() => {
  // const appSessionStore = useAppSessionStore();
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
  /* console.log('[DemoCheckDataStore]', {
   *   'appSessionStore.inited': appSessionStore.inited,
   *   'appSessionStore.ready': appSessionStore.ready,
   *   'appDataStore.inited': appDataStore.inited,
   *   'appDataStore.ready': appDataStore.ready,
   * });
   */
  return (
    <div className="DemoCheckDataStore">
      {/* ... */}
      <h1>DemoCheckDataStore</h1>
      <p>inited: {String(inited)}</p>
      <p>finished: {String(finished)}</p>
      <p>ready: {String(ready)}</p>
      <p>loading: {String(loading)}</p>
      <p>error: {String(error)}</p>
      <p>testData: {String(testData)}</p>
    </div>
  );
});

DemoCheckDataStore.__title = 'Basic data store check';
