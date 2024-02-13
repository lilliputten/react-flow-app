import {
  makeObservable,
  observable,
  action,
  computed,
  IReactionDisposer,
  reaction,
  runInAction,
} from 'mobx';
import bound from 'bind-decorator';

import {
  TMuiThemeMode,
  validMuiThemeModes,
  defaultMuiThemeMode,
  TUpdatableParameter,
  // TColor,
} from 'src/core/types';
import { autoLoadUrls } from 'src/core/constants/app';
import { getSavedOrQueryParameter } from 'src/core/helpers/generic';
import { AppDataStore } from 'src/store/AppDataStore';
// import { defaultNodesColorMode, TNodesColorMode, validNodesColorModes } from 'src/core/types/App';

export type TAppSessionStoreStatus = undefined | 'dataLoaded' | 'finished';

const storagePrefix = 'AppSessionStore:';

// TODO: Move default parameters to constants?
const defaultShowLeftPanel: boolean = false;
/* // TODO: Basic app options...
 * const defaultBaseColor: TColor = '#0f0';
 * const defaultSecondColor: TColor = '#f00';
 * const defaultAutoHideNodes: boolean = false;
 * const defaultAutoHideNodesThreshold: number = 50;
 * const defaultAutoHideNodesMaxOutputs: number = 1;
 */

/** Parameters what could be saved (via `saveParameter`) and restored from the
 * local storage (or from url query, via `restoreParameters`)
 * TODO: To derive it from `updatableParameters`?
 */
const queryParameters = [
  // prettier-ignore
  'showLeftPanel',
  'themeMode',
  'useDemo',
  'showDemo',

  // // Other basic app options...
  // 'verticalLayout',
  // 'nodesColorMode',
  // 'baseNodesColor',
  // 'secondNodesColor',
  // 'autoHideNodes',
  // 'autoHideNodesThreshold',
  // 'autoHideNodesMaxOutputs',

  // These parameters will be excluded from `saveableParameters` (only to initialize from url query)...
  'doAutoLoad',
  'doAutoStart',
  'autoLoadUrlTest',
  // // TODO: Real data slots...
  // 'autoLoadUrlEdges',
  // 'autoLoadUrlFlows',
  // 'autoLoadUrlGraphs',
  // 'autoLoadUrlNodes',
] as const;
export type TQueryParameter = (typeof queryParameters)[number];

/** Parameters not supposed to be saved -- not included into the `saveableParameters` list */
const nonSaveableParameters = [
  'useDemo',
  'showDemo',
  'doAutoLoad',
  'doAutoStart',
  // 'autoLoad*', // Applyed via special check (see below)
];

/** Parameters to save to the local storage */
const saveableParameters = queryParameters.filter(
  (id) =>
    // Exclude auto load urls...
    !id.startsWith('autoLoadUrl') && !nonSaveableParameters.includes(id), // id !== 'doAutoLoad' && id !== 'doAutoStart',
);

/** Updatable parameters descriptions */
const updatableParameters: TUpdatableParameter<TQueryParameter>[] = [
  { id: 'showLeftPanel', type: 'boolean' },
  { id: 'useDemo', type: 'boolean' },
  { id: 'showDemo', type: 'boolean' },
  { id: 'themeMode', type: 'string', validValues: validMuiThemeModes },
  // // Basic app options...
  // { id: 'verticalLayout', type: 'boolean' },
  // { id: 'nodesColorMode', type: 'string', validValues: validNodesColorModes },
  // { id: 'baseNodesColor', type: 'string' },
  // { id: 'secondNodesColor', type: 'string' },
  // { id: 'autoHideNodes', type: 'boolean' },
  // { id: 'autoHideNodesThreshold', type: 'number' },
  // { id: 'autoHideNodesMaxOutputs', type: 'number' },
  // Auto load...
  { id: 'doAutoLoad', type: 'boolean' },
  { id: 'doAutoStart', type: 'boolean' },
  { id: 'autoLoadUrlTest', type: 'string' },
  // // TODO: Real data slots...
  // { id: 'autoLoadUrlEdges', type: 'string' },
  // { id: 'autoLoadUrlFlows', type: 'string' },
  // { id: 'autoLoadUrlGraphs', type: 'string' },
  // { id: 'autoLoadUrlNodes', type: 'string' },
];

export class AppSessionStore {
  // NOTE: remember to clean/reset properties in `clearData` or in `clearSettings`

  // Session reaction disposers...
  staticDisposers?: IReactionDisposer[];

  /* Allow to use demo */
  @observable useDemo: boolean = false;

  @observable inited: boolean = false;
  @observable finished: boolean = false;
  @observable showHelp: boolean = false;
  @observable showDemo: boolean = false;
  @observable ready: boolean = false;
  @observable loading: boolean = false;
  @observable status: TAppSessionStoreStatus;
  @observable error?: Error = undefined;

  /** Callback to go to load new data page */
  @observable loadNewDataCb?: () => void | undefined;

  // TODO: Linked app data store...
  @observable appDataStore?: AppDataStore;

  // Settings...

  /** TODO: Show left panel */
  @observable showLeftPanel: boolean = defaultShowLeftPanel;

  /** Application theme */
  @observable themeMode: TMuiThemeMode = defaultMuiThemeMode;

  /* // TODO: Basic app options...
   * [>* Vertical layout <]
   * @observable verticalLayout: boolean = false;
   * [>* Chart nodes color mode (could be overriden individually later) <]
   * @observable nodesColorMode: TNodesColorMode = defaultNodesColorMode;
   * [>* Base nodes color <]
   * @observable baseNodesColor: TColor = defaultBaseColor;
   * [>* Second nodes color <]
   * @observable secondNodesColor: TColor = defaultSecondColor;
   * [>* Auto hide nodes (see `THideNodesParams` and `updateHiddenGraphNodes` in `AppDataStore`) <]
   * @observable autoHideNodes: boolean = defaultAutoHideNodes;
   * [>* Auto hide nodes threshold value (percents, include children with values more than this treshold) <]
   * @observable autoHideNodesThreshold: number = defaultAutoHideNodesThreshold;
   * [>* Show the number of descendants no more than this value <]
   * @observable autoHideNodesMaxOutputs: number = defaultAutoHideNodesMaxOutputs;
   */

  // Default auto load values...

  @observable doAutoLoad: boolean = false;
  @observable doAutoStart: boolean = false;
  @observable autoLoadUrlTest: string = autoLoadUrls.test;
  // @observable autoLoadUrlEdges: string = autoLoadUrls.edges;
  // @observable autoLoadUrlFlows: string = autoLoadUrls.flows;
  // @observable autoLoadUrlGraphs: string = autoLoadUrls.graphs;
  // @observable autoLoadUrlNodes: string = autoLoadUrls.nodes;

  // Lifecycle...

  constructor() {
    makeObservable(this);
    this.setStaticReactions();
    this.restoreParameters();
  }

  async destroy() {
    this.clearData();
    this.resetStaticReactions();
  }

  // Core getters...

  /** The root state: what component show to the user */
  @computed get rootState() {
    const {
      // prettier-ignore
      inited,
      loading,
      ready,
      finished,
      showDemo,
      appDataStore,
    } = this;
    if (!inited || loading) {
      return 'waiting';
    } else if (showDemo) {
      return 'demo';
    } else if (finished) {
      return 'finished';
    } else if (appDataStore && !appDataStore.ready) {
      return 'loadData';
    } else if (ready) {
      return 'ready';
    } else {
      return 'waiting';
      // return 'welcome'; // UNUSED!
    }
  }

  /** Is current status final and successful (started, stopped)? */
  @computed get isFinished() {
    return this.finished;
  }

  // Init settings...

  /** Initialize default parameters */
  restoreParameters() {
    updatableParameters.forEach((paramItem) => {
      const { id } = paramItem;
      const val = getSavedOrQueryParameter(paramItem, { storagePrefix, showWarining: true });
      if (val != null) {
        runInAction(() => {
          // @ts-ignore
          this[id] = val;
        });
        // eslint-disable-next-line no-console
        console.info('[AppSessionStore:restoreParameters] Updated parameter', id, '=', val);
      }
    });
  }

  /** Save parameter into the storage */
  saveParameter(id: TQueryParameter) {
    const hasLocalStorage = typeof localStorage !== 'undefined';
    if (hasLocalStorage) {
      const storageId = [storagePrefix, id].filter(Boolean).join('');
      const val = this[id];
      /* console.log('[AppSessionStore:saveParameter]', {
       *   id,
       *   val,
       *   storageId,
       * });
       */
      localStorage.setItem(storageId, String(val));
    }
  }

  /** Initialize settings (reserved for future use */
  initSettings(): Promise<void> {
    // TODO?
    return Promise.resolve();
    // TODO: Update data store if provided?
  }

  // Core setters...

  @action.bound setShowLeftPanel(showLeftPanel: typeof AppSessionStore.prototype.showLeftPanel) {
    this.showLeftPanel = showLeftPanel;
  }

  @action setInited(inited: typeof AppSessionStore.prototype.inited) {
    this.inited = inited;
  }

  @action setFinished(finished: typeof AppSessionStore.prototype.finished) {
    this.finished = finished;
  }

  @action.bound setShowHelp(showHelp: typeof AppSessionStore.prototype.showHelp) {
    this.showHelp = showHelp;
  }

  @action.bound setShowDemo(showDemo: typeof AppSessionStore.prototype.showDemo) {
    this.showDemo = showDemo;
  }

  @action setReady(ready: typeof AppSessionStore.prototype.ready) {
    this.ready = ready;
  }

  @action setLoading(loading: typeof AppSessionStore.prototype.loading) {
    this.loading = loading;
  }

  @action setError(error: typeof AppSessionStore.prototype.error) {
    this.error = error;
  }

  @bound clearError() {
    this.setError(undefined);
  }

  @action setStatus(status: typeof AppSessionStore.prototype.status) {
    this.status = status;
  }

  // Session/Data relations...

  /* // TODO: Update linked data store on basic options change...
   * // TODO: Call this on hide settings change.
   * updateHiddenGraphNodes() {
   *   const {
   *     // prettier-ignore
   *     autoHideNodes,
   *     autoHideNodesThreshold,
   *     autoHideNodesMaxOutputs,
   *     appDataStore,
   *   } = this;
   *   if (appDataStore) {
   *     appDataStore.updateAutoHiddenGraphNodes({
   *       autoHideNodes,
   *       autoHideNodesThreshold,
   *       autoHideNodesMaxOutputs,
   *     });
   *   }
   * }
   */

  // Reactions...

  /* // TODO: Basic app options...
   * @bound onAutoHideNodesChanged() {
   *   this.updateHiddenGraphNodes();
   * }
   * @bound onAutoHideNodesParamsChanged() {
   *   const { autoHideNodes } = this;
   *   if (autoHideNodes) {
   *     this.updateHiddenGraphNodes();
   *   }
   * }
   * @bound onNodesColorModeChanged(nodesColorMode: TNodesColorMode) {
   *   const { appDataStore } = this;
   *   if (appDataStore) {
   *     appDataStore.onNodesColorModeChanged(nodesColorMode);
   *   }
   * }
   */

  /** Make some initalization/cleanup things for a data store */
  @bound onAppDataStore(appDataStore?: AppDataStore) {
    // const { nodesColorMode } = this;
    if (appDataStore) {
      // TODO: Invoke some syncs for data store...
      // appDataStore.onNodesColorModeChanged(nodesColorMode);
    }
  }

  // Misc setters...

  @action setThemeMode(themeMode: typeof AppSessionStore.prototype.themeMode) {
    this.themeMode = themeMode;
  }

  // Other setters...

  /** Set linked data store */
  @action setAppDataStore(appDataStore?: AppDataStore) {
    this.appDataStore = appDataStore;
  }

  @action setLoadNewDataCb(loadNewDataCb: typeof AppSessionStore.prototype.loadNewDataCb) {
    this.loadNewDataCb = loadNewDataCb;
  }

  // Generic utilities...

  @action clearData() {
    // this.inited = false;
    // this.finished = false;
    // this.ready = false;
    // this.loading = false;
    this.status = undefined;
    this.error = undefined;

    this.showHelp = false;
    this.showDemo = false;

    // Reset settings?
    this.clearSettings();
  }

  // Settings...

  @action clearSettings() {
    // TODO: Use saved on initialization default values and list of resetable parameters...
    this.showLeftPanel = defaultShowLeftPanel;
    this.themeMode = defaultMuiThemeMode;
    // // TODO: Basic app options...
    // this.verticalLayout = false;
    // this.nodesColorMode = defaultNodesColorMode;
    // this.baseNodesColor = defaultBaseColor;
    // this.secondNodesColor = defaultSecondColor;
    // this.autoHideNodes = defaultAutoHideNodes;
    // this.autoHideNodesThreshold = defaultAutoHideNodesThreshold;
    // this.autoHideNodesMaxOutputs = defaultAutoHideNodesMaxOutputs;
    this.doAutoLoad = false;
    this.doAutoStart = false;
    this.autoLoadUrlTest = autoLoadUrls.test;
    // this.autoLoadUrlEdges = autoLoadUrls.edges;
    // this.autoLoadUrlFlows = autoLoadUrls.flows;
    // this.autoLoadUrlGraphs = autoLoadUrls.graphs;
    // this.autoLoadUrlNodes = autoLoadUrls.nodes;
  }

  // Reactions...

  setStaticReactions() {
    this.staticDisposers = [
      // prettier-ignore
      /* // TODO: Basic options reactions...
       * reaction(() => this.autoHideNodes, this.onAutoHideNodesChanged),
       * reaction(() => this.autoHideNodesThreshold, this.onAutoHideNodesParamsChanged),
       * reaction(() => this.autoHideNodesMaxOutputs, this.onAutoHideNodesParamsChanged),
       * reaction(() => this.nodesColorMode, this.onNodesColorModeChanged),
       */
      // TODO: Linked app data store...
      reaction(() => this.appDataStore, this.onAppDataStore),
      // Add reactions to save all the saveable parameters to the local storage...
      ...saveableParameters.map((id) =>
        reaction(() => this[id], this.saveParameter.bind(this, id)),
      ),
    ];
  }
  resetStaticReactions() {
    const { staticDisposers } = this;
    // Reset all disposers...
    if (Array.isArray(staticDisposers) && staticDisposers.length) {
      staticDisposers.forEach((disposer) => disposer());
    }
    this.staticDisposers = undefined;
  }
}
