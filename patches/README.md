# Project patches

## Patching CRA modules:

- Disable console log cleanings (`react-dev-utils`, `react-scripts`).
- Remove extra deprecation warnings (`webpack-dev-server`).
- Issueas checking on webpack build (`fork-ts-checker-webpack-plugin`)

## To create patch for a package name 'NAME':

```
npx patch-package NAME
```

(Check for accidentally included swap files: eg, diffs for `.swp` files.)

## To apply all the patches:

Run npm script:

```
npm run patch-node-packages
```

or call it directly:

```
npx patch-package
```

## See:

- [patch-package](https://www.npmjs.com/package/patch-package)
