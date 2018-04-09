// =============================================================================================
//                                                                                              
// File: home.ts                                                                               
//  Date: April 7, 2018                                                                           
//  Author: Susan G. Conger                                                                      
//                                                                                               
//  Description                                                                                  
//    This is the main javascript file for the home.thml page for the CrossComm Remote Programing 
//    Challenge -> Tablizer.  The javascript validates the data that was input and updates the 
//    results cards.           
//                                                                                               
//  Modification                                                                                 
//    04/07/2018 SGC V1.0.0.0 Initial Creation                                                   
//                                                                                               
//                                                                                               
//  =============================================================================================
//                      Copyright 2018, by Susan G. Conger All rights reserved                   
//  =============================================================================================
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { isUndefined, isBlank, isNumber } from 'ionic-angular/util/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  displayData : string = '[["1","2"],["3","4","5"]]'; // Holds the data to be displayed
  rowColunmData : string = '[{"1":[2,1]},{"2":[1,3]}]';  // Holds the row and column information

  results2D: string;      // Holds the resulting 2D array string
  resultsTable: string;   // Holds an HTML Table representing the data

  constructor(public navCtrl: NavController) { };

// 
// Method -- validate_input   Author: Susan G. Conger
//   Parameters In -- The field name to validate.  I would pass the data but if the user enters
//                  numbers separated by a ; then the data is not sent.  
//   Parameters Out -- None
//   Parameters In/Out -- None
//   Returns -- Nothing
//
// Description 
//   Switches off of the name of the data field to verify that its is a numeric comma separated
//   string.  
//
// Modifcation
//    04/07/2018 SGC V1.0.0.0 Initial Creation     
//                                              
  validate_input (userData) {

//    alert(userData + ": " + this.dataRow1);
//    var regularExpressionStr = "^((\d?)|(([-+]?\d+\.?\d*)|([-+]?\d*\.?\d+))|(([-+]?\d+\.?\d*\,\ ?)*([-+]?\d+\.?\d*))|(([-+]?\d*\.?\d+\,\ ?)*([-+]?\d*\.?\d+))|(([-+]?\d+\.?\d*\,\ ?)*([-+]?\d*\.?\d+))|(([-+]?\d*\.?\d+\,\ ?)*([-+]?\d+\.?\d*)))$";
  };

  validate_key_stroke(userData) {

    var dataToVerify = "";
    var dataType = "Numeric"

// We have different rules depending on the data row
    if (userData == "displayData") {
      dataToVerify = this.displayData;
      dataType = "Numeric";
    }
    else if (userData == "rowColunmData") {
      dataToVerify = this.rowColunmData;
      dataType = "PositiveInteger";
    }

// Only handle the event once for each key stroke. If the data is blank just return
    if (isUndefined(dataToVerify) || isBlank(dataToVerify)) {
      return false;
    }

// If we are verifying a number then we can allow for the following:
//   -number(.(number)), or any combination.
    if (dataType == "Numeric") {

      if (isNumber (dataToVerify)) {
          return true;
      }

      else {
        if (dataToVerify.length == 1) {
          if ((dataToVerify.charAt(0) == '-') || (isNumber(dataToVerify.charAt(0)))) {
            return true;
          }
          else {
            if (userData == "displayData") {
              this.displayData = "";
            }
            else {
              this.rowColunmData = "";
            }
            return false;        
          }
        }
        else {
          var charToVerify = dataToVerify.charAt(dataToVerify.length-1);
          var prevChar = dataToVerify.charAt(dataToVerify.length-2);
          if (prevChar == "-") {
            if (isNumber(charToVerify)) {
              return true;
            }
            else {
              if (userData == "displayData") {
                this.displayData = dataToVerify.substr(0, dataToVerify.length-1);
              }
              else {
                this.rowColunmData = dataToVerify.substr(0, dataToVerify.length-1);
              }
              return false;
            }
          }
          else {
            if (isNumber(prevChar)) {
              if ((charToVerify == '.') || (charToVerify == ",")) {
                 return true;
              }
            }
          }
        }
      }
    }    
  };

// 
// Method -- display_results   Author: Susan G. Conger
//   Parameters In -- None 
//   Parameters Out -- None
//   Parameters In/Out -- None
//   Returns -- Nothing
//
// Description 
//   Calls the methods to calculate the 2D Array and HTML Table
//   string.  
//
// Modifcation
//    04/08/2018 SGC V1.0.0.0 Initial Creation     
//                                              
  display_results() {

// Values used for testing 
//    var rowColData = [{"1":[2,1]},{"2":[1,3]}];
    var rowColData = [{"1":[1,1]},{"2":[1,1]}];
    var rowColDataStr = '[{"1":[1,1]},{"2":[1,1]}]';
//    var rowColData = [{"1":[2,1]},{"2":[1,3]}];
//    var rowColData = [{"1":[2,1]},{"2":[1,3]}];
//    var rowColData = [{"1":[2,1]},{"2":[1,3]}];
//    var rowColData = [{"1":[2,1]},{"2":[1,3]}];
//    var rowColData = [{"1":[2,1]},{"2":[1,3]}];
//    var rowColData = [{"1":[2,1]},{"2":[1,3]}];
//    var rowColData = [{"1":[2,1]},{"2":[1,3]}];

    var dispData = [[1,2],[3,4,5]]
    var dispDataStr = '[["1","2"],["3","4","5"]]';
//var dispData = [[a,b],[c,d,e]]
//var dispData = [[@,$],[%,^,#]]

// Update the display variables on the value being used so the user knows
// what is going on
    this.displayData = dispDataStr;
    this.rowColunmData = rowColDataStr;

    this.generate_2D_Array_String(dispData, rowColData);
    this.generate_HTML_Table_String(dispData, rowColData);
  }

// 
// Method -- generate_2D_Array_String   Author: Susan G. Conger
//   Parameters In -- dispData -  Hlds the data to be displayed
//                    rowColData - Hols the row span and column span 
//   Parameters Out -- None
//   Parameters In/Out -- None
//   Returns -- String representing 2D array i.e. [[1,2,null,null],[null, 3,4,5]]
//
// Description 
//   Takes the displayData and rowColunmData and generates a 2D array
//   and display the results.
//
// Modifcation
//    04/08/2018 SGC V1.0.0.0 Initial Creation     
//                                              
  generate_2D_Array_String(dispData, rowColData) {

    var resultArray = new Array();
    
// Calculate the maximum items in the array    
    var maxItems = 0;
    for (var i = 0; i < dispData.length; i++) {
       if (maxItems < dispData[i].length) {
         maxItems = dispData[i].length;
       }
    }

    if (rowColData[0][1][0] === rowColData[1][2][0]) {
      if (rowColData[0][1][0] === 2) {
        maxItems = maxItems + 2;
      }
    }
    else {
      maxItems = maxItems + 1;
    }

// Set up the array so every is initiallized to NULL    
    for (var i = 0; i < rowColData.length; i++) {
      resultArray.push( [] );
    }

// Loop through the data and convert to a 2D array.
// **NOTE:  I feel there may be a better way to do this.  Maybe a pattern or
//          some type of recursion.  But I could not see it so I used the
//          brute force method.    
    for (var i = 0; i < dispData.length; i++) {
      for (var j = 0; j < dispData[i].length; j++) {
        if(!(typeof rowColData[i] === 'undefined')) {
          if(!(typeof rowColData[i][i+1] === 'undefined')) {
            if(!(typeof rowColData[i][i+1][j] === 'undefined')) {
              if (rowColData[i][i+1][j] === 2) {
                resultArray[i].push(dispData[i][j]);
                if(!(typeof resultArray[i+1] === 'undefined')) {
                  resultArray[i+1].push("NULL");
                }
              }
              else  {
                resultArray[i].push(dispData[i][j]);
              }
            }
            else {
              resultArray[i].push(dispData[i][j]);
            }
          }  
          else {
            resultArray[i].push(dispData[i][j]);
          }
        }  
        else {
          resultArray[i].push(dispData[i][j]);
        }
      }
      for (var k = resultArray[i].length; resultArray[i].length < maxItems; k++) {
        resultArray[i].push("NULL");
      }
    }

// Loop through the resultArray and generate a nice string.  
// I tried to String but it was not formatted nicely
    var resultString = "[";
    for (var i = 0; i < resultArray.length; i++) {
      resultString = resultString + "[";
      for (var j = 0; j < resultArray[i].length; j++) {
        resultString = resultString + resultArray[i][j] + ",";        
      }
      if (resultString.endsWith(",")) {
        resultString = resultString.substr(0,resultString.length-1);
      }
      resultString = resultString + "],";
    }
    if (resultString.endsWith(",")) {
      resultString = resultString.substr(0,resultString.length-1);
    }
    resultString = resultString +"]"

// Dynamically update the screen to display that data.  
    this.update_2DArray_String(resultString);
   
  }

// 
// Method -- generate_HTML_Table_String   Author: Susan G. Conger
//   Parameters In -- dispData -  Hlds the data to be displayed
//                    rowColData - Hols the row span and column span 
//   Parameters Out -- None
//   Parameters In/Out -- None
//   Returns -- None.
//
// Description 
//   Takes the displayData and rowColunmData and generates a HTML representation
//   and display the results.
//
// Modifcation
//    04/08/2018 SGC V1.0.0.0 Initial Creation     
//                                              
  generate_HTML_Table_String(displData, rowColData) {

    var htmlStr = "<table border=1>";

// Loop through all of the data to be displayed    
    for (var i = 0; i < displData.length; i++) {
      htmlStr = htmlStr + "<tr>";
      for (var j = 0; j < displData[i].length; j++) {
        var rSpan = 1;
        var cSpan = 1;
        if (j <= 1) {
          rSpan = rowColData[j][j+1][0];
          cSpan = rowColData[j][j+1][1];
        }
        if (i === 0) {
          htmlStr=htmlStr + '<td rowspan="' + rSpan + '"' + ' colspan="' + cSpan + '">' + displData[i][j];
        }
        else {
          htmlStr=htmlStr + '<td>' + displData[i][j];
        }

        htmlStr= htmlStr + "</td>"
      }
      htmlStr = htmlStr + "</tr>";
    } 
    htmlStr = htmlStr + "</table>";
    this.update_html_results_table(htmlStr);
  }

// 
// Method -- update_html_results_table   Author: Susan G. Conger
//   Parameters In -- htmlStr to be displayed 
//   Parameters Out -- None
//   Parameters In/Out -- None
//   Returns -- None
//
// Description 
//   Takes teh HML table string and displays it in the form by finding the DOM element
//   and updating the innerHTML  
//
// Modifcation
//    04/08/2018 SGC V1.0.0.0 Initial Creation     
//                                              
  update_html_results_table(htmlStr) {

    var resTableElement = document.body.getElementsByClassName("resultsTable");

    if (resTableElement != null) {
      var resultsTableNode = resTableElement.item(0);
      if (resultsTableNode != null) {
        resultsTableNode.innerHTML = htmlStr;
      }
    }
  }

// 
// Method -- update_html_results_table   Author: Susan G. Conger
//   Parameters In -- resultStr to be displayed 
//   Parameters Out -- None
//   Parameters In/Out -- None
//   Returns -- None
//
// Description 
//   Takes 2D Array resultStr and displays it in the form by finding the DOM element
//   and updating the innerHTML  
//
// Modifcation
//    04/08/2018 SGC V1.0.0.0 Initial Creation     
//                                              
update_2DArray_String(resultStr) {

// Dynamically update the HTML so it display the Display data with the result  
  var res2DElement = document.body.getElementsByClassName("results2DDispayData");
  if (res2DElement != null) {
    var results2DNode = res2DElement.item(0);
    if (results2DNode != null) {
      results2DNode.innerHTML = "Display Data: " + this.displayData;
    }
  }

// Dynamically update the HTML so it display the Row Column data with the result  
  res2DElement = document.body.getElementsByClassName("results2DRowColumn");
  if (res2DElement != null) {
    var results2DNode = res2DElement.item(0);
    if (results2DNode != null) {
      results2DNode.innerHTML = "Row Column Data: " + this.rowColunmData;
    }
  }

// Dynamically update the data so it displays the resulting 2D Array String  
  res2DElement = document.body.getElementsByClassName("results2DString");

  if (res2DElement != null) {
    var results2DNode = res2DElement.item(0);
    if (results2DNode != null) {
      results2DNode.innerHTML = resultStr;
    }
  }
}


}
