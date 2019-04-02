var sourceDataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Réponses au formulaire 1');
var resDataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Feuille 2');
var last_column = sourceDataSheet.getLastColumn();
var last_row  = sourceDataSheet.getLastRow();

//==============Create menu
function onOpen()
{
  var menuEntries = [{name: "GenTimeTable", functionName: "main"}];
  SpreadsheetApp.getActiveSpreadsheet().addMenu("MyMarcos", menuEntries);
}

function main() {
  clearContentFmResSheet();
  var dataAll = getData();
  var datesArr = getAllDates(dataAll);
  var namesArr = getAllNames(dataAll);
  var timeArr = getTimeAndParse(dataAll);
  printData(timeArr, namesArr, datesArr);
  //Logger.log(namesArr);
}

// Clear old Content
function clearContentFmResSheet(){
  var last_column = resDataSheet.getLastColumn();
  var last_row  = resDataSheet.getLastRow();
  resDataSheet.getRange(2, 1, last_row, last_column).clearContent();
}

// Get All Data from Source sheet
function getData(){
  var allData = sourceDataSheet.getRange(1, 1, last_row, last_column).getValues();
  //Logger.log(allData);
  return allData;  
}

// ==========Get Dates in Array 
function getAllDates(allData){   
  var datesArray = [];// init Array for Dates
  // iterate data 
  for(var i = 0; i<allData[0].length; i++){ 
    if(i>2){
      datesArray.push(allData[0][i]);
    }
  }
  //Logger.log(datesArray); 
  return datesArray;
}

// ============Get all names in Array
function getAllNames(allData){  
  // iterate data  
  var namesArray = [];// init Array for Names
  for(var i = 0; i<allData[0].length; i++){    
    
    for(var j =0;j<allData.length;j++){      
      
      if(i==1 && j>0){
       var res = allData[j][i] +" "+ allData[j][i+1];
        namesArray.push(res);        
      }      
    }    
  }
  //Logger.log(namesArray); 
  return namesArray;
}

//=====================Get time string and parse it
//=================Jour[08:00,16:00], Soir[16:00,23:00], Nuit[23:00,08:00]
function getTimeAndParse(allData){
  // iterate data  
  var dayIndex = 1;
  var timeArray = [];// init Array for Time
  for(var i = 3; i<allData[0].length; i++){    
    
    for(var j =0;j<allData.length;j++){      
      
      if(i>2 && j>0){
       var t1 ='';
       var t2 ='';
       var t3 ='';
       var resArr = allData[j][i].split(", ");
        //var searchRes = res.search(/,/);
        if(resArr[0]=='Jour'){        
          t1 = "08:00";          
        }else if(resArr[0]=='Soir'){
          t1 = "16:00";
        }else if(resArr[0]=='Nuit'){
          t1 = "23:00";
        }
        if(resArr[1] && resArr[1]=='Jour'){        
          t2 = "08:00";          
        }else if(resArr[1] && resArr[1]=='Soir'){
          t2 = "16:00";
        }else if(resArr[1] && resArr[1]=='Nuit'){
          t2 = "23:00";
        }
        if(resArr[2] && resArr[2]=='Jour'){        
          t3 = "08:00";          
        }else if(resArr[2] && resArr[2]=='Soir'){
          t3 = "16:00";
        }else if(resArr[2] && resArr[2]=='Nuit'){
          t3 = "23:00";
        }
        timeArray.push([resArr,[t1,t2,t3], dayIndex]);         
      }            
    }
    dayIndex++;    
  }
  //Logger.log(timeArray); 
  return timeArray;
}
//===========================Print data on sheet
function printData(timeArr, namesArr, datesArr){
  var numOfPeople = namesArr.length;
  var numOfDays = datesArr.length;
   Logger.log(namesArr.length);
  
  // ----------------- print timing
  var timeArrIndex = 0;
  var rowNumber = 2;
  for(var i=0;i<numOfDays; i++){//iterate for each day
    for(var n=0;n<numOfPeople; n++){//iterate for each person
      
      var subject=namesArr[n];
      var temp = datesArr[i];
      var startDate = convertMonth(temp);
      //Logger.log(temp);
      var timeDesc = timeArr[timeArrIndex][0];// value exemple -[Jour, Soir]
      var startTime =timeArr[timeArrIndex][1];// value exemple -['08:00', '16:00']
      
      //Logger.log(startDate+"->"+startTime);
      
      for(var j=0;j<timeDesc.length;j++){
        resDataSheet.getRange(rowNumber, 1).setValue(subject);
        resDataSheet.getRange(rowNumber, 2).setValue(startDate[0]);
        resDataSheet.getRange(rowNumber, 3).setValue(startTime[j]);
        var endTime = countEndTime(startTime[j]);
        resDataSheet.getRange(rowNumber, 5).setValue(endTime);//End time
        resDataSheet.getRange(rowNumber, 7).setValue(timeDesc[j]);
        // end Date statement
        if(startTime[j]=="23:00"){
           resDataSheet.getRange(rowNumber, 4).setValue(startDate[1]);
        }else if (startTime[j]==""){
          //empty
        }else{
          resDataSheet.getRange(rowNumber, 4).setValue(startDate[0]);
        }
        
        rowNumber++;
      }
      timeArrIndex++;
    }
  } 
}

// =====================Convert Fr months names to En and return arr with date + next date
function convertMonth(date){
  //Logger.log(date);
  var year = 2019;
  var monthNamesFr = ['janvier','fèvrier', 'mars',
                    'avril','mai','juin',
                    'juillet','aout','septembre',
                    'octobre','novembre','decembre'];
  
  var monthNamesEn = ['January','February', 'March',
                    'April','May','June',
                    'July','August','September',
                    'October','November','December'];
  
  //var dateN = date.substring(1,7);
  var day = +date.substring(2,4);
  
  var monthTemp = date.substring(5,8);
  //Logger.log(monthTemp);
  for(var i=0; i<12;i++){
    if(monthTemp==monthNamesFr[i]){
      var month=i+1;
    }
  }
  var date=day+"/"+month+"/"+year;
  var nextDay = (day+1)+"/"+month+"/"+year;
  var dateArr=[date,nextDay];
  return dateArr;  
}

//=============Count End Time
function countEndTime(startTime){  
  //Logger.log(startTime);
  var endTime = '';
  if(startTime=="08:00"){
    endTime = "16:00";
  }else if(startTime=="16:00"){
    endTime = "23:00";
  }else if(startTime=="23:00"){
    endTime = "08:00";
  }
  
//  var timeArr = startTime.split(':');
//  var dateFormatted = new Date(2019, 01, 01,timeArr[0]+8, timeArr[1]);//2019,month, day );
//  var endTime = Utilities.formatDate(new Date(dateFormatted), "GMT+2", "HH:mm")
  return endTime;
}

// ============get tab name for if run from menu
function getTabName(){
  var sheetName = SpreadsheetApp.getActiveSheet().getSheetName();
  //Browser.msgBox(sheetName);
  return sheetName;
}