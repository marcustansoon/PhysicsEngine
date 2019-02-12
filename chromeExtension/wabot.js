// Returns promise that resolves to all installed modules
function getAllModules() {
  return new Promise((resolve) => {
    const id = _.uniqueId('fakeModule_');
    window['webpackJsonp'](
      [],
      {[id]: function(module, exports, __webpack_require__) {
        resolve(__webpack_require__.c);
      }},
      [id]
    );
  });
}

// Get module by ID found from the function above
function _requireById(id) {
	return webpackJsonp([], null, [id]);
}



// Module IDs
let createFromData_id = 0;
let prepareRawMedia_id = 0;
let store_id = 0;
let Store = {};



let modules = getAllModules()._value;

// Automatically locate modules
for (var key in modules) {
	if (modules[key].exports) {
		if (modules[key].exports.createFromData) {
			createFromData_id = modules[key].id.replace(/"/g, '"');
		}
		if (modules[key].exports.prepRawMedia) {
			prepareRawMedia_id = modules[key].id.replace(/"/g, '"');
		}
		if (modules[key].exports.default) {
			if (modules[key].exports.default.Wap) {
				store_id = modules[key].id.replace(/"/g, '"');
			}
		}
	}
}

//define store once IDs are found
function defineStore(){
  Store = _requireById(store_id).default;
  console.log(Store);
  initHandler();
}

setTimeout(defineStore,2000);

function initHandler(){


  //Listening for incoming messages
  Store.Msg.models.push = function(message) {
      Array.prototype.push.call(this, message);
      this.onPush(message);
  };
  Store.Msg.models.onPush = function(message) {
      //console.log(message);
  }
  /*
  Modify the Store.Msg.models.push() function and add a call to the onPush function, while keeping Array.prototype.push.call(). 
  This will call the onPush() function each time a new message arrives.
  */


  Store.Chat.Send={};
  
  //Send Text message
  Store.Chat.Send.Text=function(jid,chat){
     Store.Chat.find(jid).then(function(chat) {
        chat.markComposing();
        chat.sendMessage(body);
    });
  }
  //send media
  Store.Chat.Send.Media=function(jid, link, caption, msg_id, content_type) {
    var file = "";
    var createFromDataClass = _requireById(createFromData_id)["default"];
    var prepareRawMediaClass = _requireById(prepareRawMedia_id).prepRawMedia;
    window.Store.Chat.find(jid).then((chat) => {
      chat.markComposing();
      var img_b64 = link;
      var base64 = img_b64.split(',')[1];
      var type = img_b64.split(',')[0];
      type = type.split(';')[0];
      type = type.split(':')[1];
      var binary = fixBinary(atob(base64));
      var blob = new Blob([binary], {type: type});
      var random_name = Math.random().toString(36).substr(2, 5);
      file = new File([blob], random_name, {
        type: type,
        lastModified: Date.now()
      });

      var temp = createFromDataClass.createFromData(file, file.type);
      var rawMedia = prepareRawMediaClass(temp, {});
      var target = _.filter(window.Store.Msg.models, (msg) => {
        return msg.id.id === msg_id;
      })[0];
      var textPortion = {
        caption: caption,
        mentionedJidList: [],
        quotedMsg: target
      };
      rawMedia.sendToChat(chat, textPortion);


    });
  
  }
  
  
  
  
}
