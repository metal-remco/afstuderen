
$(document).ready(function(){
  //window.localStorage.setItem('arduino', null); 
});

/**
 * List of tab names.
 * @private
 */
var TABS_ = ['blocks', 'arduino', 'xml'];

var selected = 'blocks';

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} id ID of tab clicked.
 */
function tabClick(id) {
  // If the XML tab was open, save and render the content.
  // if (document.getElementById('tab_xml').className == 'tabon') {
  //   var xmlTextarea = document.getElementById('textarea_xml');
  //   var xmlText = xmlTextarea.value;
  //   var xmlDom = null;
  //   try {
  //     xmlDom = Blockly.Xml.textToDom(xmlText);
  //   } catch (e) {
  //     var q =
  //         window.confirm('Error parsing XML:\n' + e + '\n\nAbandon changes?');
  //     if (!q) {
  //       // Leave the user on the XML tab.
  //       return;
  //     }
  //   }
  //   if (xmlDom) {
  //     Blockly.mainWorkspace.clear();
  //     Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
  //   }
  // }

  // // Deselect all tabs and hide all panes.
  // for (var x in TABS_) {
  //   document.getElementById('tab_' + TABS_[x]).className = 'taboff';
  //   document.getElementById('content_' + TABS_[x]).style.display = 'none';
  // }

  // // Select the active tab.
  // selected = id.replace('tab_', '');
  // document.getElementById(id).className = 'tabon';
  // // Show the selected pane.
  // var content = document.getElementById('content_' + selected);
  // content.style.display = 'block';
  renderContent();
}

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
function renderContent() {
  var content = document.getElementById('content_' + selected);
  // Initialize the pane.
  if (content.id == 'content_blocks') {
    // If the workspace was changed by the XML tab, Firefox will have performed
    // an incomplete rendering due to Blockly being invisible.  Rerender.
    Blockly.mainWorkspace.render();
  } else if (content.id == 'content_xml') {
    var xmlTextarea = document.getElementById('textarea_xml');
    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    xmlTextarea.value = xmlText;
    xmlTextarea.focus();
  /*} else if (content.id == 'content_javascript') {
    content.innerHTML = Blockly.Generator.workspaceToCode('JavaScript');
  } else if (content.id == 'content_dart') {
    content.innerHTML = Blockly.Generator.workspaceToCode('Dart');
  } else if (content.id == 'content_python') {
    content.innerHTML = Blockly.Generator.workspaceToCode('Python');*/
  } else if (content.id == 'content_arduino') {
    //content.innerHTML = Blockly.Generator.workspaceToCode('Arduino');
    
  }

  var arduinoTextarea = document.getElementById('textarea_arduino');
  arduinoTextarea.value = Blockly.Generator.workspaceToCode('Arduino');
  var xmlTextarea = document.getElementById('textarea_xml');
  var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  xmlTextarea.value = xmlText;
    //arduinoTextarea.focus();
}

/**
 * Initialize Blockly.  Called on page load.
 * @param {!Blockly} blockly Instance of Blockly from iframe.
 */
function init(blockly) {
  window.onbeforeunload = function() {
   //return 'Leaving this page will result in the loss of your work.';
   //return 'Als je deze pagina verlaat, ben je al je werk kwijt en moet je weer opnieuw beginnen.';
  };

  window.Blockly = blockly;
  
  // var blockly_frame = document.getElementById("content_blocks");
  // Blockly.inject(blockly_frame, {path: '../../'});

  // Make the 'Blocks' tab line up with the toolbox.
  // if (Blockly.Toolbox) {
  //   window.setTimeout(function() {
  //       document.getElementById('tab_blocks').style.minWidth =
  //           (Blockly.Toolbox.width - 38) + 'px';
  //           // Account for the 19 pixel margin and on each side.
  //     }, 1);
  // }

  auto_save_and_restore_blocks();

  //load from url parameter (single param)
  //http://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
  var dest = unescape(location.search.replace(/^.*\=/, '')).replace(/\+/g, " ");
  if(dest){
    load_by_url(dest);
  }
}