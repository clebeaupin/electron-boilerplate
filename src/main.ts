import { tmpNameSync } from "tmp";
import * as path from "path";
import * as url from "url";
import { app, BrowserWindow, protocol } from "electron";

const levelup = require('levelup')

let db = levelup(path.join(__dirname, "test-db"))


db.put('foo', 'world', (err) => {
  if (err) throw err

  // a file containing the json `{ hello: 'world' }` was
  // written to the location `<__dirname>/foo/bar.json`.

  db.get('foo', (err, value) => {
    if (err) throw err
    console.log(value)
  })
})

// Global reference to the main window,
// so the garbage collector doesn't close it.
let mainWindow: Electron.BrowserWindow = null;

console.log("####1", tmpNameSync());

function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600})

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null
    })
  }

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// Call 'createWindow()' on startup.
app.on("ready", () => {
    createWindow();
    //registerProtocol();

    // Load catalog
    /*const store: Store<AppState> = container.get("store") as Store<AppState>;
    store.dispatch(catalogActions.init());*/
});

// On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other
// windows open.
app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
