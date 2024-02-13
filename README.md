<!--
@since 2024.02.10, 21:29
@changed 2024.02.10, 21:55
-->

# react-flow-app

The react-flow data visualization application.

- Version: 0.0.3
- Last changes timestamp: 2024.02.14 01:19 +0700

TODO: Add the project description.

## See also

- [CHANGELOG](CHANGELOG.md)
- [TODO](TODO.md)

## Resources

Repository: https://github.com/lilliputten/react-flow-app

Demo deploy server (with a recent build): http://react-flow-app.lilliputten.ru/

Node-Based UIs in React – React Flow: braryhttps://reactflow.dev/

## Project workflow

Install all required node dependencies:

```
npm i
```

Start dev server (locate in browser with `http://localhost:3000`):

```
npm run start
```

Make build:

```
npm run build
```

Build and publish:

For successful publishing the build application the environment should be
propeply set up (see npm script command `postinstall-publish-submodule`).

```
npm run build-and-publish
```

To just publish previously created build:

```
npm run publish
```

Builds published into the `publish` branch. See utilities configuration in
`utils/config.sh`.
