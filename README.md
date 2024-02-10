<!--
@since 2023.11.12, 00:38
@changed 2024.02.08, 18:42
-->

# sankey-graph-app

Sankey graph viewer and editor application.

- Version: 0.0.28
- Last changes timestamp: 2024.02.08 18:48 +0700

TODO: Add project description.

## See also

- [CHANGELOG](CHANGELOG.md)
- [TODO](TODO.md)

## Resources

Repository: https://github.com/lilliputten/sankey-graph-app

Deploy server (with recent build): http://sankey-graph-app.lilliputten.ru/

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

## Run application under python script

You can start the application from the command line with your own data using python script (since v.0.0.20).

To do it, download recent build (eg, for v.0.0.20) [from build page](https://github.com/lilliputten/sankey-graph-app/releases/tag/publish.0.0.20).

Or via [direct zip archive link](https://github.com/lilliputten/sankey-graph-app/archive/refs/tags/publish.0.0.20.zip).

Then unpack it, go to the build folder and start the script with command:

```
python start-app.py --demo-files-data-set-folder sweet-corn
```

It will load sample data from the folder `data/sweet-corn/` (but shared `nodes.json` will be loaded from `data/` folder).

You can use any other prepared folder inside the `data` folder or use your own files.

Also you can modify the script and pass your own data into the `writeTempAppData(appData, targetFileNames)` call.

Here `appData` and `targetFileNames` have `AppData` and `TargetFileNames` types respectively (both contain keys: 'edges', 'flows', 'graphs', 'nodes').

In dev mode (when python file is locatied in the project root) -- use `--dev` key:

```
python start-app.py --dev --demo-files-data-set-folder sweet-corn
```

In this case data will be taken and written from/to respective subfolders in `public/` folder.

Available script command line options could be obtained with `--help` parameter:

```
$ python start-app.py --help

Launch app from python script demo.

Options

  --web-port, -p                   Web server port (default: "8080")
  --demo-post                      Make demo POST request
  --demo-files                     Open the app with links to demo files
  --demo-files-data-folder         Data folder name (default: "data")
  --demo-files-data-set-folder     Data set folder name (default: "hardwood-
                                   forestry")
  --files-target-folder            Target folder name (default: "temp")
  --files-omit-date-tag            Omit date tag postfix for auto-generated
                                   target folder name (datetime module
                                   required)
  --dev, -d                        Use "public" folder prefix for demo data
                                   files and "build" for local web server (for
                                   non-built dev environment)
```

## Run application with nodejs server

It's possible to run the app with nodejs server (it doesn't have freezes).

```
node start-server.mjs
```

The help info is also available:

```
$ node start-server.mjs --help

Description

  Launch web server for the app.

Options

  --web-port, -p string   Web server port (default: "8080")
  --files-target-folder   Target folder name (default: "temp")
  --files-omit-date-tag   Omit date tag postfix for auto-generated
                          target folder name (datetime module required)
  --dev, -d string        Use "build" prefix for local web server (for non-
                          built dev environment)
  --help, -h string       Print this help and quit
```

Some demo options (`demo-post`, `demo-files`, `demo-files-data-folder`, `demo-files-data-set-folder`) hasn't been implemented in js server. But it's possible to use `start-app-demo-post.html` demo page (it's already included in the `build` folder).

## Transfer data to server and open the app with it

Both servers allow to send Sankey data to them and open an application with this transferred data.

The endpoint address to send data is `POST /cgi-bin/accept-post-data` (this particular name was choosen due to python embedded http server limitations for `CGIHTTPRequestHandler` POST requests).

It accpets both json (`application/json`) and multipart form (`application/x-www-form-urlencoded`) formats. Thus, it can be sent using an ajax request or published from a standard html form.

The expected data format should contain four fields: `edges`, `flows`, `graphs`, `nodes` (respectively for standard sankey files: `edges.json`, `flows.json`, `nodes-supply-chain.json`, `nodes.json`).

Those fields can be either data (for json-formatted objects) or a json-encoded string (for forms). The data is saved to a temporary folder (the name of which comes from the `files-target-folder` and `files-omit-date-tag` arguments).

Then (in the case of success) there will be generated =a link like this one (without any spaces):

```
<WEB-SERVER-ADDRESS>
?doAutoLoad=yes
&doAutoStart=yes
&autoLoadUrlEdges=temp-240202-220842/post-http-localhost-8080-start-app-demo-post-html-240202-220848-edges.json
&autoLoadUrlFlows=temp-240202-220842/post-http-localhost-8080-start-app-demo-post-html-240202-220848-flows.json
&autoLoadUrlGraphs=temp-240202-220842/post-http-localhost-8080-start-app-demo-post-html-240202-220848-graphs.json
&autoLoadUrlNodes=temp-240202-220842/post-http-localhost-8080-start-app-demo-post-html-240202-220848-nodes.json
```

By default this link will be returned in the application/json response object with a single field `url` (`{ url: <URL-VALUE> }`).

If there was passed a 'truthy' url query parameter `redirect` (eg, `<...>//cgi-bin/accept-post-data?redirect=yes`), then the immediate redircit to this link will be occured (it'll be useful in a case of regular form submit).

## Open a data post demo page:

1. Start web server with: `node start-server.mjs` (or `python start-app.py`; if starting form the project folder, with `build`subfolder, then use`--dev` comman line key).
2. Open demo html page in a browser: `http://localhost:8080/start-app-demo-post.html`.
3. Submit a form manually (with a 'Submit form...' button) or send ajax request (with a 'Send post request...' button). It'll be sent to data processing endpoint `POST /cgi-bin/accept-post-data`.
4. When/if data is successfully created it'll be redirected to main app page with corresponding parameters in the url query, or the url will be returned in response (then the highlighted button 'Follow received url' will appear and the url will be shown bellow).

File names here formed with request headers' origin string and current timestamp to prevent reuse the same names for different clients.

Remember to close the browser or release the page in order to stop the server.

If you want to made changes in server files (in a 'dev' mode), it's possible to start a dynamic updater with `sh start-app-demo-watch.sh`.
