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
