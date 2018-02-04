// Proxy console usage
const originalConsoleLog = console.log.bind(console);
console.log = (...args) => {
  originalConsoleLog(...args);

  // Listen for game start
  if (~args[0].indexOf('Application Surface created')) {
    document.body.style.opacity = 1;
  }
}

// Imports
let webFrame = require('electron').webFrame;

let { remote } = require('electron');
let win = remote.getCurrentWindow();

let scale = 1;
let width = 684;
let height = 596;

// Prevent zooming on some devices
webFrame.setVisualZoomLevelLimits(1, 1)
webFrame.setLayoutZoomLevelLimits(0, 0);

// Initialize GM
window.onload = GameMaker_Init;

/**
 * Convenience script for calling GML callback scripts
 * @param {string} func GM function name (after gmcallback_)
 * @param {*} arg0 Argument to pass
 */
function gmlCallback(func, arg0) {
  !!(window[`gml_Script_gmcallback_${func}`]) ? window[`gml_Script_gmcallback_${func}`](null, null, arg0) : void 0;
}

// Prevent drags on main doc
document.addEventListener('dragover', e => { e.preventDefault(); return false; }, false);
document.addEventListener('drop', e => { e.preventDefault(); return false; }, false);

// Listen for file drops on the game canvas
let dropZone = document.getElementById('drag-region');
dropZone.addEventListener('contextmenu', e => {
  // scale -= 0.5;
  // document.documentElement.style.transform = `scale(${scale})`;
  // win.setSize(width * scale, height * scale);
  // win.center();
});
dropZone.addEventListener('dragover', e => { e.preventDefault(); return false; }, false);
dropZone.addEventListener('dragleave', e => { e.preventDefault(); return false; }, false);
dropZone.addEventListener('dragend', e => { e.preventDefault(); return false; }, false);
dropZone.addEventListener('drop', e => {
  e.preventDefault();

  if (e.dataTransfer.files > 1) {
    gmlCallback('filedrop', false);
  } else {
    let file = {
      name: e.dataTransfer.files[0].name,
      size: e.dataTransfer.files[0].size,
      type: e.dataTransfer.files[0].type
    };

    // Send file
    gmlCallback('filedrop', JSON.stringify(file));
  }

  return false;
});

// Listen to button presses
let roundButton = document.getElementById('round');
let resetButton = document.getElementById('reset');
let topLongButton = document.getElementById('top');
let bottomLongButton = document.getElementById('bottom');

roundButton.addEventListener('click', e => gmlCallback('select', true));
resetButton.addEventListener('click', e => gmlCallback('reset_button', true));
topLongButton.addEventListener('click', e => gmlCallback('up', true));
bottomLongButton.addEventListener('click', e => gmlCallback('down', true));

// Hue shift
let randDegrees = Math.random() * 360;
document.getElementById('bg').style.filter = `hue-rotate(${randDegrees}deg)`;
roundButton.style.filter = `hue-rotate(${randDegrees}deg)`;
resetButton.style.filter = `hue-rotate(${randDegrees}deg)`;
topLongButton.style.filter = `hue-rotate(${randDegrees}deg)`;
bottomLongButton.style.filter = `hue-rotate(${randDegrees}deg)`;
