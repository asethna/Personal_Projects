// Utility javascript functions and classes

/***
 * A string wrapper class that represents xmlhttpsrequest parameters
 * with string manipulation functions (format: action + other parameters)
 * Example output: action=register&arg1=value1
 */
function Request(){
	this.str = "";
};
Request.prototype.addAction = function(action){
	this.str += "action=" + encodeURIComponent(action);
};
Request.prototype.addParam = function(param, arg){
	this.str += "&" + param + "=" + encodeURIComponent(arg);
};
Request.prototype.toString = function(){
	return this.str;
};

function convertLevelToGameMode(level){
	var gameMode = "";
	if (level<=0)
		gameMode = "X";
	else if (level>0 && level <=10)
		gameMode = "Novice";
	else if (level >10 && level <=20)
		gameMode = "Intermediate";
	else if (level >20){
		gameMode = "Expert";
	}
	return gameMode;
}

function createXmlHttpRequest(){
	try { //create a request for netscape, mozilla, opera, etc.
		xmlHttpRequest = new XMLHttpRequest();
	} 
	catch (e) {
		try { //create a request for internet explorer
			xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
		} 
		catch (e) { //do some error-handling
			alert("XMLHttpRequest error: " + e);
		}
	}
}

function linebreakToBR(text){
	text = text.replace(/\n\r?/g, '<br />');
	return text;
}

// removes table rows that do not start with the given filter's value
function applyFilter(tableID, filterID){
	$("#" + tableID + " tbody tr").show();
	var filterValue = $("#"+filterID).val();
	if(!filterValue || filterValue == "")
		return false;	
	$("#" + tableID + " tbody tr:not([title^='" + filterValue + "'])").hide();
}
/***
 * Displays the amount of available character spaces left in a text area.
 * @param textid Id of the text area.
 * @param limit Maximum chars allowed in the text area.
 * @param infodiv Id of tag displaying text limit info.
 */
function limitChars(textId, limit, infoTag){
	var text = $('#'+textId).val(); 
	var textLength = text.length;
	if(textLength > limit) {
		$('#' + infoTag).text('Cannot write more than '+limit+' characters!');
		$('#'+textId).val(text.substr(0,limit));
	}
	else 
		$('#' + infoTag).text('You have '+ (limit - textLength) +' characters left.');
}

/***
 * Trims the given string, removing white spaces at the front and end.
 * @param stringToTrim String to trim.
 * @returns String after trim.
 */
function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

/***********************************************
* Drop Down Date select script- by JavaScriptKit.com
* This notice MUST stay intact for use
* Visit JavaScript Kit at http://www.javascriptkit.com/ for this script and more
***********************************************/

var monthtext=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];

function populatedropdown(dayfield, monthfield, yearfield){
	var today=new Date();
	var dayfield=document.getElementById(dayfield);
	var monthfield=document.getElementById(monthfield);
	var yearfield=document.getElementById(yearfield);
	
	for (var i=0; i<32; i++)
		dayfield.options[i]=new Option(i, i+1);
	
	dayfield.options[today.getDate()]=new Option(today.getDate(), today.getDate(), true, true); //select today's day
	
	for (var m=0; m<12; m++)
		monthfield.options[m]=new Option(monthtext[m], monthtext[m]);
	
	monthfield.options[today.getMonth()]=new Option(monthtext[today.getMonth()], monthtext[today.getMonth()], true, true); //select today's month
	
	var thisyear=today.getFullYear();
	
	for (var y=0; y<20; y++){
		yearfield.options[y]=new Option(thisyear, thisyear);
		thisyear+=1;
	}
	yearfield.options[0]=new Option(today.getFullYear(), today.getFullYear(), true, true); //select today's year
}


/***********************************************************************************************
						AJAX OBJECT Functions
*************************************************************************************************/
function createXHR() {
    var xhrObj;
    if (window.XMLHttpRequest) {
        // branch for native XMLHttpRequest object - Mozilla, IE7
        try {
            xhrObj = new XMLHttpRequest();
        } catch (e) {
            xhrObj = null;
        }
    } else if (window.createRequest) {
        /* For ICEbrowser -- untested.
         * per their site 
         * http://support.icesoft.com/jive/entry.jspa?entryID=471&categoryID=21
         */
        try {
            xhrObj = window.createRequest();
        }
        catch (e) {
            xhrObj = null;
        }
    } else if (window.ActiveXObject) {
        // branch for IE/Windows ActiveX version
        try {
            xhrObj = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
            try{
                xhrObj = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(e) {
                xhrObj = null;
            }
        }//catch
    } //if-else
    return xhrObj;
}//eof createXHR

function domObjById(divId){
	return $("#"+divId);
}
/*****************************************************************************************
 * 								jQuery.fn.allData
 * - Loop through all data the object has
 * 
 *****************************************************************************************/
jQuery.fn.allData = function() {
    var intID = jQuery.data(this.get(0));
    return(jQuery.cache[intID]);
};
jQuery.fn.DataSize = function() { //get the data stored in the cache
    var intID = jQuery.data(this.get(0));
    return(jQuery.cache[intID].length);
};