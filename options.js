/*
Copyright (c) 2011-2013 by White Fir Design

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, only version 2 of the License is applicable.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// Saves options to localStorage.
function save_options() {
	
	localStorage["new_tab"] = document.getElementById("new_tab").checked;
	localStorage["bookmark"] = document.getElementById("bookmark_name").value;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

function load() {
	document.getElementById("title").innerText = chrome.i18n.getMessage("options_title");
	document.getElementById("header").innerText =chrome.i18n.getMessage("options_header");
	document.getElementById("new tab label").innerText = chrome.i18n.getMessage("new_tab_label");
	document.getElementById("bookmark label").innerText = chrome.i18n.getMessage("bookmark_label");
	document.getElementById("save button").innerText =chrome.i18n.getMessage("options_save_button");
	document.getElementById("defaults button").innerText =chrome.i18n.getMessage("options_defaults_button");
	
	if (!localStorage["new_tab"]) {
		document.getElementById("new_tab").checked = false;
	}
	else {
		document.getElementById("new_tab").checked = JSON.parse(localStorage["new_tab"]);
	}
	
	if( ! localStorage["bookmark"]){
		document.getElementById("bookmark_name").value = 'Adminer';
	}else{
		document.getElementById("bookmark_name").value = JSON.parse(localStorage["bookmark"]);
	}

}

function defaults() {
	document.getElementById("new_tab").checked = false;
	document.getElementById("bookmark_name").value = 'Adminer';
}

document.addEventListener('DOMContentLoaded', function () {
	load();
	document.getElementById("save button").addEventListener('click', save_options);
	document.getElementById("defaults button").addEventListener('click', defaults);
 }, false);