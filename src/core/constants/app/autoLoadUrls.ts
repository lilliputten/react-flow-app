/** Default file names for specific data types */
export const defaultDataFiles = {
  test: 'fake-data-1.json',
  // edges: 'edges.json',
  // flows: 'flows.json',
  // graphs: 'nodes-supply-chain.json', // 'graphs.json',
  // nodes: 'nodes.json',
};

export const dataUrlPrefix = '/data/';
const defaultDataPath = 'fake-data/';
// const nodesNodesPath = '';

/** Create demo urls list */
export const autoLoadUrls = Object.keys(defaultDataFiles).reduce<Partial<typeof defaultDataFiles>>(
  (urls, id) => {
    urls[id as keyof typeof defaultDataFiles] = [
      dataUrlPrefix,
      /* id === 'nodes' ? nodesNodesPath : */ defaultDataPath,
      defaultDataFiles[id as keyof typeof defaultDataFiles],
    ]
      .filter(Boolean)
      .join('');
    return urls;
  },
  {},
) as typeof defaultDataFiles;
