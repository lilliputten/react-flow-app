<!--
@since 2023.11.12, 01:37
@changed 2023.11.28, 04:23
-->

# TODO

- 2023.11.28, 04:22 -- Fix `WithSidePanels` side panels behavior on resize. Ideally to use library to support panels resizing.
- 2023.11.28, 03:20 -- Color selector: Remove second slider (transparency?), fix entering the color by text (it's conflicting with immediatley updates).
- 2023.11.27, 16:53 -- Check bundle size. See info at [cra-template/readme](https://github.com/facebook/create-react-app/blob/main/packages/cra-template/template/README.md).
- 2023.11.27, 01:23 -- Clean changed data (names, colors) in `SankeyAppDataStore` on a new data set load.
- 2023.11.24, 02:09 -- To initialize the settings (`SankeySettingsPanel`, `SankeyAppSessionStore`) from the url query.
- 2023.11.24, 02:07 -- To load chart libraries dynamically? (Needs to be ensured that it works in the embedding browser. And to preserve the way to use old approach with static loading.) See `useChartComponent`, `SankeyAppSessionStore`.
