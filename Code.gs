// Inpired from Mike Steelson alias Mikhail Staliyevich
// https://www.sheets-pratique.com/
// https://stackoverflow.com/questions/69378549/running-websocket-in-google-sheet/69382528#69382528

var CovivaSheetName = "MyCoviva";

var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CovivaSheetName);
var data = sheet.getDataRange().getValues();

// koala: CovivaId
var koala = data[1][1];

// username: login to mycoviva
var username = data[1][2];

// password: password for mycoviva
var password = data[1][3];

// device_hardware_id : mac address of your id
var device_hardware_id = data[1][4];

var node_number = data[1][5];
var value_number = data[1][6];
var attribute_number = data[1][7];

function getwsUriFromSheet(){
  var acces_token = getCovivaAccesToken(username, password, koala, device_hardware_id);
  var getwsUriFromSheet = "wss://" + koala + ".koalabox.net/connection?access_token=" + acces_token;
  return getwsUriFromSheet;
}

function onOpen(e) {
  SpreadsheetApp.getUi()
     .createMenu('* GAS-Coviva-Hager V2 *')
    .addItem('Manage MyCoviva', 'showSidebar')
    .addToUi();
  }

function showSidebar(){
  var html = HtmlService
    .createTemplateFromFile("Koala")
    .evaluate()
    .setTitle("Web Socket Coviva");
  var ui = SpreadsheetApp.getUi();
  ui.showSidebar(html);
} 

function param(){
  var myparams = [
    node_number,
    value_number,
    attribute_number,
  ];
  return JSON.stringify(myparams)
}

function getJSON(jsonstring){
  Logger.log(JSON.parse(jsonstring));
}
