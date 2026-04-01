const { BrowserWindow , app , ipcMain , nativeTheme} = require("electron")
const path = require("node:path")

const createWindow = ()=>{
    const win = new BrowserWindow({
        width : 800 ,
        height : 600,
        webPreferences : {
            preload : path.basename(__dirname , 'preload.js')
        }
    })
    win.loadFile('index.html')

    win.on('closed', ()=>{
        win = null
    })
}

ipcMain.handle("dark-mode:toggle", ()=>{
    if(nativeTheme.shouldUseDarkColors){
        nativeTheme.themeSource = 'light'

    } else {
        nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:system', ()=>{
    nativeTheme.themeSource = 'system'
})

app.on('ready', ()=>{
    app.whenReady().then(()=>{
        createWindow()
    })

    app.on('activate' , ()=>{
        if(BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed' , ()=>{
    if(process.platform !== 'darwin') app.quit()
})