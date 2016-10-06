const electron = require('electron')
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path =require('path');
const nativeImage =electron.nativeImage;
var virtualbox = require('virtualbox');


virtualbox.start("NovoWorx", false, function start_callback(error) 

{
  if (error) throw error;
  console.log("Virtual Machine has started WITH A GUI!");
  
});


let mainWindow


function createWindow () 
{

  mainWindow = new BrowserWindow({
      width: 1920, 
      height: 1080,
      autoHideMenuBar:true,
      transparent:true,
      webPreferences:
      {
	nodeIntegration: false
      }   
})
  
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  //mainWindow.reload();
  //mainWindow.loadURL(`http://localhost:2224/NovoWORX/`)  
  
  //mainWindow.loadURL(`http://dev.novocraft.com/framework/fetch/NovoWorx/NovoWORX/`) //demosite
  
  //mainWindow.webContents.openDevTools()


  mainWindow.on('closed', function () 
  {    
    virtualbox.poweroff("NovoWorx", function poweroff_callback(error) 
    {
      
      if (error) throw error;
      console.log("Virtual Machine has been powered off!");
      
    });
  mainWindow = null
  })
  
}


app.on('ready', createWindow)



app.on('window-all-closed', function () {

  if (process.platform !== 'darwin') {
    app.quit()
    
  }
})

app.on('activate', function () {
 
  if (mainWindow === null) {
    createWindow()
  }
})
