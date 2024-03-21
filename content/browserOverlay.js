
var DMap = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 24: 24, 25: 25, 26: 26, 27: 27, 28: 28, 29: 29, 30: 30, 31: 31, 32: 32, 33: 33, 34: 34, 35: 35, 36: 36, 37: 37, 38: 38, 39: 39, 40: 40, 41: 41, 42: 42, 43: 43, 44: 44, 45: 45, 46: 46, 47: 47, 48: 48, 49: 49, 50: 50, 51: 51, 52: 52, 53: 53, 54: 54, 55: 55, 56: 56, 57: 57, 58: 58, 59: 59, 60: 60, 61: 61, 62: 62, 63: 63, 64: 64, 65: 65, 66: 66, 67: 67, 68: 68, 69: 69, 70: 70, 71: 71, 72: 72, 73: 73, 74: 74, 75: 75, 76: 76, 77: 77, 78: 78, 79: 79, 80: 80, 81: 81, 82: 82, 83: 83, 84: 84, 85: 85, 86: 86, 87: 87, 88: 88, 89: 89, 90: 90, 91: 91, 92: 92, 93: 93, 94: 94, 95: 95, 96: 96, 97: 97, 98: 98, 99: 99, 100: 100, 101: 101, 102: 102, 103: 103, 104: 104, 105: 105, 106: 106, 107: 107, 108: 108, 109: 109, 110: 110, 111: 111, 112: 112, 113: 113, 114: 114, 115: 115, 116: 116, 117: 117, 118: 118, 119: 119, 120: 120, 121: 121, 122: 122, 123: 123, 124: 124, 125: 125, 126: 126, 127: 127, 1027: 129, 8225: 135, 1046: 198, 8222: 132, 1047: 199, 1168: 165, 1048: 200, 1113: 154, 1049: 201, 1045: 197, 1050: 202, 1028: 170, 160: 160, 1040: 192, 1051: 203, 164: 164, 166: 166, 167: 167, 169: 169, 171: 171, 172: 172, 173: 173, 174: 174, 1053: 205, 176: 176, 177: 177, 1114: 156, 181: 181, 182: 182, 183: 183, 8221: 148, 187: 187, 1029: 189, 1056: 208, 1057: 209, 1058: 210, 8364: 136, 1112: 188, 1115: 158, 1059: 211, 1060: 212, 1030: 178, 1061: 213, 1062: 214, 1063: 215, 1116: 157, 1064: 216, 1065: 217, 1031: 175, 1066: 218, 1067: 219, 1068: 220, 1069: 221, 1070: 222, 1032: 163, 8226: 149, 1071: 223, 1072: 224, 8482: 153, 1073: 225, 8240: 137, 1118: 162, 1074: 226, 1110: 179, 8230: 133, 1075: 227, 1033: 138, 1076: 228, 1077: 229, 8211: 150, 1078: 230, 1119: 159, 1079: 231, 1042: 194, 1080: 232, 1034: 140, 1025: 168, 1081: 233, 1082: 234, 8212: 151, 1083: 235, 1169: 180, 1084: 236, 1052: 204, 1085: 237, 1035: 142, 1086: 238, 1087: 239, 1088: 240, 1089: 241, 1090: 242, 1036: 141, 1041: 193, 1091: 243, 1092: 244, 8224: 134, 1093: 245, 8470: 185, 1094: 246, 1054: 206, 1095: 247, 1096: 248, 8249: 139, 1097: 249, 1098: 250, 1044: 196, 1099: 251, 1111: 191, 1055: 207, 1100: 252, 1038: 161, 8220: 147, 1101: 253, 8250: 155, 1102: 254, 8216: 145, 1103: 255, 1043: 195, 1105: 184, 1039: 143, 1026: 128, 1106: 144, 8218: 130, 1107: 131, 8217: 146, 1108: 186, 1109: 190}

function unicodeToWin1251_UrlEncoded(s) {
    var L = []
    for (var i=0; i<s.length; i++) {
        var ord = s.charCodeAt(i)
        if (!(ord in DMap))
            throw "Character "+s.charAt(i)+" isn't supported by win1251!";
        L.push('%'+DMap[ord].toString(16));
    }
    return L.join('').toUpperCase();
}

var decodeMap = {};
var win1251 = new TextDecoder("windows-1251");
for (var i = 0x00; i <= 0xFF; i++) {
  var hex = (i <= 0x0F ? "0" : "") +      // zero-padded
            i.toString(16).toUpperCase();
  decodeMap[hex] = win1251.decode(Uint8Array.from([i]));
}
// console.log(decodeMap);
// {"10":"\u0010", ... "40":"@","41":"A","42":"B", ... "C0":"А","C1":"Б", ...


// Decodes a windows-1251 encoded string, additionally
// encoded as an ASCII string where each non-ASCII character of the original
// windows-1251 string is encoded as %XY where XY (uppercase!) is a
// hexadecimal representation of that character's code in windows-1251.
function percentEncodedWin1251ToDOMString(str) {
  return str.replace(/%([0-9A-F]{2})/g,
    (match, hex) => decodeMap[hex]);
}


function LOG(text)
{
	/*if (typeof(Components) != 'undefined')
	{
		var consoleService = Components.classes["@mozilla.org/consoleservice;1"].
			 getService(Components.interfaces.nsIConsoleService);
        consoleService.logStringMessage(text);
    }*/
}

function sleep(ms)
{
    return new Promise(ok => {
        setTimeout(ok, ms)
    })
}

  

/**
* Listen for messages from the background script.
* Call "insertBeast()" or "removeExistingBeasts()".
*/
browser.runtime.onMessage.addListener((message) => {
    if (message.command === "StartRemove") {
		StartRemove(message.authorName, message.forumID);
    }
});

function StartRemove(authorName, forumID)
{
	const redirect = `https://www.e1.ru/talk/forum/search.php?extra=1&fid%5B%5D=${forumID}&search=&searchsubj=&author=${unicodeToWin1251_UrlEncoded(authorName)}&date=all&perpage=200`
	
	location.href = redirect
}

async function StartRemovingOnCurrentPage(doc, fid, page=0)
{
	const links = doc.getElementsByTagName('A');
	let posts = []
	for (let i=0; i<links.length; i++)
	{
		if (links[i].href.indexOf(`/talk/forum/go_to_message.php?f=${fid}`) == -1)
			continue;

		const urlParams = new URLSearchParams(links[i].href);
		posts.push({f: fid, i: urlParams.get("i")})
	}

	const needAlert = doc.getElementById("checkbox").checked

	let deleted = 0;
	for (let j=0; j<posts.length; j++)
	{
		if (!g_continue)
			break;
		
		await sleep(500)

		const ret = await DeleteMessage(doc, posts[j], deleted)
		if (ret != 0 && needAlert)
		{
			var strconfirm = confirm(`Остановить процесс удаления?`)
			if (strconfirm == false)
				continue;

			g_continue = false;
			doc.getElementById("continue").textContent ='Продолжить';
			break;
		}
		deleted++;
	}

	await sleep(1000)
	const currentHREF = window.location.href
	const index = currentHREF.indexOf("&p=") != -1 ? currentHREF.indexOf("&p=") : currentHREF.length; 
	if (g_continue)
		window.location.href = currentHREF.substring(0, index)+"&p="+(page*1+1);
	else
		window.location.href = currentHREF.substring(0, index)+"&p=0";

}

function DeleteMessage(doc, post, j)
{
	return new Promise(async ok => {

		const needAlert = doc.getElementById("checkbox").checked;

		if (needAlert)
		{
			var strconfirm = confirm(`Будем удалять сообщение ${post.i}?`)

			if (strconfirm == false)
				return ok(1)
		}

		await fetch(`https://www.e1.ru/talk/forum/delete_message.php?f=${post.f}&i=${post.i}`, {
				method: 'POST',
				headers:{
				  'Content-Type': 'application/x-www-form-urlencoded'
				},    
				body: new URLSearchParams({
					'i': post.i,
					'f': post.f
				})
		});	

		doc.getElementById("progress").setAttribute("value", `Удалено ${j+1} сообщений`);
		
		return ok(0)
	})
}

var gPlugin = {
	onPageLoad: function(event)
	{
		LOG("onPageLoad");
		var doc = event.originalTarget;
		
		const urlParams = new URLSearchParams(window.location.search);
		const fid = urlParams.get('fid[]') || urlParams.get('fid[0]');
		if (!fid)
			return;

		const p = urlParams.get('p')

		StartRemovingOnCurrentPage(doc, fid, p)

	},
}

let g_continue = true;
const interval = setInterval(() => {
	if (!document || !document.body)
		return;

	if ((document.URL.indexOf('www.e1.ru/talk/forum/search.php') == -1))
		return;		

	let divTop = document.createElement('div');
	let button = document.createElement('button');
	let strong = document.createElement("strong");
	strong.textContent = 'Продолжить';
	strong.setAttribute("id", "continue")

	button.appendChild(strong);
	button.onclick = function(e) {
		if (strong.textContent == 'Продолжить')
		{
			strong.textContent = 'Остановить';
			g_continue = true;
		}
		else
		{
			strong.textContent = 'Продолжить'
			g_continue = false;
			return;
		}

		gPlugin.onPageLoad({originalTarget: document})
	}
	
	const urlParams = new URLSearchParams(window.location.search);
	const page = urlParams.get('p') || 0

	let input = document.createElement('input');
	input.setAttribute("readonly", "true")
	input.setAttribute("id", "progress")
	input.setAttribute("value", "0")

	let divTop2 = document.createElement('div');
	let input2 = document.createElement('input');
	input2.setAttribute("id", "checkbox")
	input2.setAttribute("type", "checkbox")
	input2.checked = page*1 == 0 ? true : false;

	let label2 = document.createElement('label');
	label2.setAttribute("for", "checkbox")
	label2.textContent = "Спрашивать каждый раз"

	divTop2.appendChild(input2)
	divTop2.appendChild(label2)

	divTop.appendChild(input);
	divTop.appendChild(button);
	document.body.insertBefore(divTop, document.body.firstChild)	
	document.body.insertBefore(divTop2, document.body.firstChild)	

	clearInterval(interval)

	if (page != 0)
		button.onclick();
}, 1000)
