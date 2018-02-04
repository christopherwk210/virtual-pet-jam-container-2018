// Imports
let webFrame = require('electron').webFrame;

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

// Proxy console usage
const originalConsoleLog = console.log.bind(console);
console.log = (...args) => {
  originalConsoleLog(...args);

  // Listen for game start
  if (args[0] && typeof args[0] === 'string' && ~args[0].indexOf('Application Surface created')) {
    gameReady();
  }
}

// Volume elements
let volOn = document.getElementById('vol-up');
let volOff = document.getElementById('vol-down');

/**
 * Called when GM has created the main application surface
 */
function gameReady() {
  document.body.style.opacity = 1;

  setTimeout(() => {
    volOn.style.opacity = 0;
    volOff.style.opacity = 0;
  }, 1000);
}

// Listen for volume adjustments
volOn.addEventListener('click', e => gmlCallback('enable_audio', true));
volOff.addEventListener('click', e => gmlCallback('disable_audio', true));

// Prevent drags on main doc
document.addEventListener('dragover', e => { e.preventDefault(); return false; }, false);
document.addEventListener('drop', e => { e.preventDefault(); return false; }, false);

// Listen for file drops on the game canvas
let dropZone = document.getElementById('drag-region');
dropZone.addEventListener('dragover', e => { e.preventDefault(); gmlCallback('dragover', true); return false; }, false);
dropZone.addEventListener('dragleave', e => { e.preventDefault(); gmlCallback('dragleave', true); return false; }, false);
dropZone.addEventListener('dragend', e => { e.preventDefault(); return false; }, false);
dropZone.addEventListener('drop', e => {
  e.preventDefault();

  if (e.dataTransfer.files > 1) {
    gmlCallback('filedrop', false);
  } else {
    let file = {
      name: e.dataTransfer.files[0].name,
      size: e.dataTransfer.files[0].size,
      type: e.dataTransfer.files[0].type,
      createdToday: new Date(e.dataTransfer.files[0].lastModifiedDate).getDay() === new Date().getDay()
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
