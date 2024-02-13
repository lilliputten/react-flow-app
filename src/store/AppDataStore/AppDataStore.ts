import { makeObservable, observable, action, when, IReactionDisposer, computed } from 'mobx';
import bound from 'bind-decorator';

import {
  TAppDataKey,
  TDataFileUploadInfo,
  // TNodeId,
  TTestData,
  // TEdgesData,
  // TFlowsData,
  // TGraphsData,
  // TNodesData,
} from 'src/core/types';

// Unused fields regex: \<\(edgesData\|flowsData\|graphsData\|nodesData\|selectedGraphId\|changedNodes\|nodeNames\|nodeColors\|changedNodes\|nodesColorMode\|hiddenGraphNodes\|autoHiddenGraphNodes\|userHiddenGraphNodes\)\>

/* // UNUSED: Helper data...
 * const defaultNodeNames: Record<TNodeId, string> = {
 *   [-1]: 'Functional unit', // Default name for root node (TODO: Move default name to constants?)
 *   // [-1]: '$\\alpha \\, F_\\mathrm{test}$', // SvgLaTeX sample (requires MathJax)
 * };
 * const sortByNumberAsc = (a: number, b: number) => a - b;
 */

export class AppDataStore {
  // NOTE: remember to clean/reset properties in `clearData`

  // Session reaction disposers...
  staticDisposers?: IReactionDisposer[];

  // Used file infos...
  fileInfos: Partial<Record<TAppDataKey, TDataFileUploadInfo>> = {};

  // State...
  @observable inited: boolean = false;
  @observable finished: boolean = false;
  @observable ready: boolean = false;
  @observable loading: boolean = false;
  @observable error?: Error;

  // Data...
  @observable testData?: TTestData;
  // @observable edgesData?: TEdgesData;
  // @observable flowsData?: TFlowsData;
  // @observable graphsData?: TGraphsData;
  // @observable nodesData?: TNodesData;

  // // Selected (active) data...
  // [>* Currently selected graph id <]
  // @observable selectedGraphId?: TGraphId;
  // // Overridable data...
  // [>* Changed or overriding (changeable) node names <]
  // @observable nodeNames: Record<TNodeId, string> = { ...defaultNodeNames };
  // [>* Changed node colors <]
  // @observable nodeColors: Record<TNodeId, TColor> = {};
  // [>* TODO: (!) List of changed node ids (TNodeId[]) <]
  // @observable changedNodes: TNodeId[] = [];
  // [>* Automatically hidden nodes, by filters (TGraphId[]) <]
  // @observable autoHiddenGraphNodes: TGraphId[] = [];
  // [>* Nodes hidden by user in manual mode (TGraphId[]) <]
  // @observable userHiddenGraphNodes: TGraphId[] = [];
  // [>* Hidden nodes (TGraphId[]) <]
  // @observable hiddenGraphNodes: TGraphId[] = [];
  // // Colors data...
  // [>* Color mode (mirrored `AppSessionStore` value) <]
  // @observable nodesColorMode?: TNodesColorMode; // = defaultNodesColorMode;

  // Lifecycle...

  constructor() {
    makeObservable(this);
    // Automatically clear the error for final& successfull statuses (started, stopped)
    when(() => this.finished, this.clearError);
    this.setStaticReactions();
  }

  async destroy() {
    this.clearData();
    // TODO: Cleanup before exit?
    this.resetStaticReactions();
  }

  // Core getters...

  @computed get hasAllData() {
    return !!(
      this.testData /* && this.edgesData && this.flowsData && this.graphsData && this.nodesData */
    );
  }
  @computed get hasSomeData() {
    return !!(
      this.testData /* || this.edgesData || this.flowsData || this.graphsData || this.nodesData */
    );
  }

  @computed get hasData() {
    return this.hasAllData;
  }

  /* // UNUSED: External changes handlers...
   * @bound onNodesColorModeChanged(_nodesColorMode: TNodesColorMode) {
   *   [> // DEBUG
   *    * const isChanged = nodesColorMode !== this.nodesColorMode;
   *    * console.log('[AppSessionStore:onNodesColorModeChanged]', {
   *    *   isChanged,
   *    *   nodesColorMode,
   *    * });
   *    <]
   *   // Reset current custom colors...
   *   runInAction(() => {
   *     this.nodeColors = {};
   *     // TODO: Reset changedNodes data?
   *   });
   *   // TODO: Prepare aux data...
   *   // const nodeDepthsMap = createNodeDepthsMap();
   * }
   */

  // Updaters...

  /* // UNUSED: Sample sankey data processing methods...
   * @action updateAutoHiddenGraphNodes(autoHideNodesParams: TAutoHideNodesParams) {
   *   const {
   *     // prettier-ignore
   *     autoHideNodes,
   *     autoHideNodesThreshold,
   *     autoHideNodesMaxOutputs,
   *   } = autoHideNodesParams;
   *   const {
   *     // prettier-ignore
   *     testData,
   *     // edgesData,
   *     // flowsData,
   *     // graphsData,
   *     // nodesData,
   *   } = this;
   *   // Check if we have data to construct tree...
   *   const hasData = !!(
   *     testData // TODO: To test it as a list?
   *     // edgesData &&
   *     // edgesData.length &&
   *     // graphsData &&
   *     // graphsData.length &&
   *     // flowsData &&
   *     // nodesData
   *   );
   *   const notEmptyConditions =
   *     [> autoHideNodesThreshold < 100 && <] autoHideNodesThreshold > 0 ||
   *     autoHideNodesMaxOutputs > 0;
   *   // NOTE: Clear auto hidden nodes if this feature is disabled or no data has set or got empty conditions...
   *   if (!autoHideNodes || !hasData || !notEmptyConditions) {
   *     this.autoHiddenGraphNodes = [];
   *     return;
   *   }
   *   // Prepare tree data...
   *   // Get graphs map...
   *   const graphsMap = getGraphsMap(graphsData);
   *   // Chidren nodes data ([parentNodeId]: [chidrenNodeIds...])...
   *   const children = getGraphChildren(edgesData);
   *   // Root ids to start process...
   *   const rootIds = children && getGraphRootIdsByChildren(children, graphsData);
   *   // The future list of hidden nodes...
   *   const autoHiddenGraphNodes: TGraphId[] = [];
   *   const checkedNodes: TGraphId[] = [];
   *   [> console.log('[AppDataStore:updateAutoHiddenGraphNodes]: start', {
   *    *   children,
   *    *   rootIds,
   *    *   // autoHiddenGraphNodes,
   *    *   // 'this.autoHiddenGraphNodes': [...this.autoHiddenGraphNodes],
   *    *   // demoHideNodes,
   *    *   edgesData,
   *    *   flowsData,
   *    *   graphsData,
   *    *   nodesData,
   *    *   autoHideNodes,
   *    *   autoHideNodesThreshold,
   *    *   autoHideNodesMaxOutputs,
   *    * });
   *    <]
   *   // Go through nodes and construct visiblility states...
   *   const checkNode = (graphId: TGraphId) => {
   *     // Avoid cyclic loops...
   *     if (checkedNodes.includes(graphId)) {
   *       return;
   *     }
   *     checkedNodes.push(graphId);
   *     const graphChildren = children[graphId];
   *     const nodesToHide = getNodesToHideList({
   *       autoHideNodesParams,
   *       graphsMap,
   *       graphChildren,
   *       graphId,
   *       graphsData,
   *       edgesData,
   *     });
   *     if (nodesToHide && nodesToHide.length) {
   *       nodesToHide.forEach((graphId) => {
   *         if (!autoHiddenGraphNodes.includes(graphId)) {
   *           autoHiddenGraphNodes.push(graphId);
   *         }
   *       });
   *     }
   *     // Process children...
   *     if (Array.isArray(graphChildren) && graphChildren.length) {
   *       graphChildren.forEach(checkNode);
   *     }
   *   };
   *   // Start the process from root nodes...
   *   rootIds.forEach(checkNode);
   *   autoHiddenGraphNodes.sort(sortByNumberAsc);
   *   const hasDiffers = !areTwoSortedArraysEqual(this.autoHiddenGraphNodes, autoHiddenGraphNodes);
   *   [> console.log('[AppDataStore:updateAutoHiddenGraphNodes]: done', {
   *    *   hasDiffers,
   *    *   autoHiddenGraphNodes,
   *    * });
   *    <]
   *   // Compare new and current arrays and update if they're differ
   *   if (hasDiffers) {
   *     this.autoHiddenGraphNodes = autoHiddenGraphNodes;
   *   }
   * }
   * @action.bound updateHiddenGraphNodes() {
   *   const { autoHiddenGraphNodes, userHiddenGraphNodes } = this;
   *   const hiddenGraphNodes: TGraphId[] = [];
   *   const combinedList = [...autoHiddenGraphNodes, ...userHiddenGraphNodes];
   *   combinedList.sort(sortByNumberAsc);
   *   combinedList.forEach((graphId) => {
   *     if (!hiddenGraphNodes.includes(graphId)) {
   *       hiddenGraphNodes.push(graphId);
   *     }
   *   });
   *   // Compare new and current arrays and update if they're differ
   *   const hasDiffers = !areTwoSortedArraysEqual(this.hiddenGraphNodes, combinedList);
   *   [> console.log('[AppDataStore:updateHiddenGraphNodes]', {
   *    *   hasDiffers,
   *    *   combinedList,
   *    *   'this.hiddenGraphNodes': { ...this.hiddenGraphNodes },
   *    *   autoHiddenGraphNodes,
   *    *   userHiddenGraphNodes,
   *    * });
   *    <]
   *   if (hasDiffers) {
   *     this.hiddenGraphNodes = combinedList;
   *   }
   * }
   */

  // Status setters...

  @action setInited(inited: typeof AppDataStore.prototype.inited) {
    this.inited = inited;
  }

  @action setFinished(finished: typeof AppDataStore.prototype.finished) {
    this.finished = finished;
  }

  @action setReady(ready: typeof AppDataStore.prototype.ready) {
    this.ready = ready;
  }

  @action setLoading(loading: typeof AppDataStore.prototype.loading) {
    this.loading = loading;
  }

  @action setError(error: typeof AppDataStore.prototype.error) {
    this.error = error;
  }

  @bound clearError() {
    this.setError(undefined);
  }

  // Data setters...

  @action setTestData(testData: typeof AppDataStore.prototype.testData) {
    this.testData = testData;
  }

  /* // UNUSED: Setters...
   * @action setEdgesData(edgesData: typeof AppDataStore.prototype.edgesData) {
   *   this.edgesData = edgesData;
   * }
   * @action setFlowsData(flowsData: typeof AppDataStore.prototype.flowsData) {
   *   this.flowsData = flowsData;
   * }
   * @action setGraphsData(graphsData: typeof AppDataStore.prototype.graphsData) {
   *   this.graphsData = graphsData;
   * }
   * @action setNodesData(nodesData: typeof AppDataStore.prototype.nodesData) {
   *   this.nodesData = nodesData;
   * }
   * // Current setters...
   * @action setSelectedGraphId(selectedGraphId: typeof AppDataStore.prototype.selectedGraphId) {
   *   this.selectedGraphId = selectedGraphId;
   * }
   * @computed get hasHiddenGraphNodes() {
   *   return !!(Array.isArray(this.hiddenGraphNodes) && this.hiddenGraphNodes.length);
   * }
   */

  // File infos...

  @action setFileInfo(id: TAppDataKey, info?: TDataFileUploadInfo) {
    this.fileInfos = {
      ...this.fileInfos,
      [id]: info,
    };
  }

  @action clearFileInfos() {
    this.fileInfos = {};
  }

  // Generic utilities...

  @action clearData() {
    // NOTE: Don't just clear the data. It's a place to set them to default values.
    // Status...
    this.inited = false;
    this.finished = false;
    this.ready = false;
    this.loading = false;
    this.error = undefined;
    // Data...
    this.testData = undefined;
    // // Other data...
    // this.edgesData = undefined;
    // this.flowsData = undefined;
    // this.graphsData = undefined;
    // this.nodesData = undefined;
    // // Current...
    // this.selectedGraphId = undefined;
    // // Overrided data...
    // this.changedNodes = [];
    // this.nodeNames = { ...defaultNodeNames };
    // this.nodeColors = {};
    // this.changedNodes = [];
    // this.nodesColorMode = undefined;
    // this.hiddenGraphNodes = [];
  }

  // Reactions...

  setStaticReactions() {
    this.staticDisposers = [
      // reaction(() => this.autoHiddenGraphNodes, this.updateHiddenGraphNodes),
      // reaction(() => this.userHiddenGraphNodes, this.updateHiddenGraphNodes),
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
