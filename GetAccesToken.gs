// koala: CovivaId
// username: login to mycoviva
// password: password for mycoviva

// device_hardware_id : mac address of your id

// function used to get the acces token and the other datas of your Hub Coviva
function getCovivaAccesToken(username, password, koala, device_hardware_id) {

  // var user_agent = "Mozilla/5.0 (compatible; GoogleDocs; script; +http://docs.google.com)";

  // #############################
  // # Generating auth string    #
  // #############################

  var username_encoded = quoteUrl(username, "~()*!.\'");
  // Logger.log(username_encoded);

  var password_sha512 = sha512(password);
  // Logger.log(password_sha512);

  var new_decoded = username_encoded + ":" + password_sha512;
  // Logger.log(new_decoded);

  var new_encoded_bytes = strToUTF8Arr(new_decoded);
  // Logger.log (new_encoded_bytes);

  var new_encoded = base64EncArr(new_encoded_bytes);
  // Logger.log(new_encoded);

  var basic_auth = "Basic " + new_encoded;
  // Logger.log(basic_auth);

  // #############################
  // # Get token                 #
  // #############################

  Logger.log("Getting access token");

  var url = "https://" + koala + ".koalabox.net/access_token";

  var headers = {
    "Origin": "http://mycoviva.net",
    "Accept-Language": "en-au",
    "Accept": "application/json, text/plain, */*",
    // "User-Agent": user_agent,
    "Authorization": basic_auth,
    "Referer": "http://mycoviva.net"
  };

  var payload = {
    "device_hardware_id": convertToHex(device_hardware_id),
    "device_name": "Web%20App%20%7C%20Safari",
    "device_type": "4",
    "device_os": "6",
    "device_app": "4"
  };

  var options = {
    "method": "post",
    "muteHttpExceptions": true,
    "headers": headers,
    "payload": payload
  };

  var responseGetToken = UrlFetchApp.fetch(url, options);
  // Logger.log("responseGetToken: " + responseGetToken.getResponseCode());

  if (responseGetToken.getResponseCode() == 200) {
    var ascii_content = responseGetToken.getContentText();
    // Logger.log(ascii_content);

    var fields_and_values = ascii_content.split("&");
    // Logger.log(fields_and_values);

    var access_token = "";

    var myhagerid = "";
    var user_id = "";
    var device_id = "";
    var expires = "";

    var key = '';

    for (var item = 0; item < fields_and_values.length; item++) {
      key = fields_and_values[item].split("=");
      for (var i = 0; i < key.length; i++) {
        if (key[i] == "access_token") { access_token = key[i + 1]; }
        if (key[i] == "myhagerid") { myhagerid = key[i + 1]; }
        if (key[i] == "user_id") { user_id = key[i + 1]; }
        if (key[i] == "device_id") { device_id = key[i + 1]; }
        if (key[i] == "expires") { expires = key[i + 1]; }
      }
    }

    Logger.log("Getting access token Ok");

    Logger.log("access_token: " + access_token);

    // Logger.log("myhagerid: " + myhagerid);
    // Logger.log("user_id: " + user_id);
    /// Logger.log("device_id: " + device_id);
    // Logger.log("expires: " + expires);

    return access_token;

  }
  else {
    Logger.log("Error getting access token");
  }
}
