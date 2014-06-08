/*
Copyright (c) 2013 by White Fir Design

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

//Send login page request to background page
chrome.extension.sendMessage({'login_page' : getURLParameter("URL")}, function(response) {});
close();

//Get URL paramater from URL
function getURLParameter(name) {
  return decodeURIComponent((new RegExp("[?|&]"+name+"="+"([^&;]+?)(&|#|;|$)").exec(location.search)||[,""])[1].replace(/\+/g, "%20"))||null
}

