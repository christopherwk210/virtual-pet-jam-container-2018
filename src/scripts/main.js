// Initialize GM
window.onload = GameMaker_Init;

/**
 * Convenience script for calling GML callback scripts
 * @param {string} func GM function name (after gmcallback_)
 * @param {*} arg0 Argument to pass
 */
function gmlCallback(func, arg0) {
  window[`gml_Script_gmcallback_${func}`](null, null, arg0);
}

// Prevent drags on main doc
document.addEventListener('dragover', e => { e.preventDefault(); return false; }, false);
document.addEventListener('drop', e => { e.preventDefault(); return false; }, false);

// Listen for file drops on the game canvas
let gameCanvas = document.getElementById('canvas');
gameCanvas.addEventListener('dragover', e => { e.preventDefault(); return false; }, false);
gameCanvas.addEventListener('dragleave', e => { e.preventDefault(); return false; }, false);
gameCanvas.addEventListener('dragend', e => { e.preventDefault(); return false; }, false);
gameCanvas.addEventListener('drop', e => {
  e.preventDefault();

  if (e.dataTransfer.files > 1) {
    // Reject
  } else {
    let file = {
      name: e.dataTransfer.files[0].name,
      size: e.dataTransfer.files[0].size,
      type: e.dataTransfer.files[0].type
    };

    // Send file
  }

  return false;
});
