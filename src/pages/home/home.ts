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
//import { isUndefined, isBlank, isNumber } from 'ionic-angular/util/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


/************************************************************ 
 * Method -- validate_input   Author: Susan G. Conger
 *   Parameters In -- The field name to validate.  I would pass the data but if the user enters
 *                  numbers separated by a ; then the data is not sent.  
 *   Parameters Out -- None
 *   Parameters In/Out -- None
 *   Returns -- Nothing
 *
 * Description 
 *   Switches off of the name of the data field assign the input array.  If there is an error
 *   the user is informed.  This could be better.  It is just rudamentary.
 *
 * Modifcation
 *    04/07/2018 SGC V1.0.0.0 Initial Creation     
 *************************************************************/                                              
export class HomePage {
 
  displayData : string = '[["1","2"],["3","4","5"]]'; // Holds the data to be displayed
  rowColunmData : string = '[{"1":[2,1]},{"2":[1,3]}]';  // Holds the row and column information
  dispData: any;          // Array for display data
  rowColData: any;        // Array for row column data

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
//   Switches off of the name of the data field assign the input array.  If there is an error
//   the user is informed.  This could be better.  It is just rudamentary.
//
// Modifcation
//    04/07/2018 SGC V1.0.0.0 Initial Creation     
//                                              
  validate_input (userData) {
    try {
      if (userData==="rowColunmData") {
        this.rowColData = eval(this.rowColunmData);
      }
      else {
        this.dispData = eval(this.displayData);
      }
      return true;
    } 
    catch(e) {
      if (userData==="rowColunmData") {
        alert("Format Error in Row Column Data field.  Please check the field and try again");
      }
      else {
        alert("Format Error in Diplay Data field.  Please check the field and try again");
      }
      console.log(e);
      return false;
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
//    var rowColData = [{"1":[1,1]},{"2":[1,1]}];
//    var rowColDataStr = '[{"1":[1,1]},{"2":[1,1]}]';
//    var rowColData = [{"1":[2,1]},{"2":[1,3]}];
//    var rowColData = [{"1":[2,1]},{"2":[1,3]}];
//    var rowColData = [{"1":[2,1]},{"2":[1,3]}];
//    var rowColData = [{"1":[2,1]},{"2":[1,3]}];
//    var rowColData = [{"1":[2,1]},{"2":[1,3]}];
//    var rowColData = [{"1":[2,1]},{"2":[1,3]}];
//    var rowColData = [{"1":[2,1]},{"2":[1,3]}];

//    var dispData = [[1,2],[3,4,5]]
//    var dispDataStr = '[["1","2"],["3","4","5"]]';
//    var dispData = [[a,b],[c,d,e]]
//    var dispData = [[@,$],[%,^,#]]

// Update the display variables on the value being used so the user knows
// what is going on... make sure the data is correct before we begin.
    if ((this.validate_input('displayData')) && ( this.validate_input('rowColunmData'))) {
      this.generate_2D_Array_String(this.dispData, this.rowColData);
      this.generate_HTML_Table_String(this.dispData, this.rowColData);
    }
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
    var rowPosition = 0;
    var columnPosition = 0;
    var nullArray = new Array();
    
// Calculate the maximum items in the array    
    var maxItems = 0;
    for (var m = 0; m < dispData.length; m++) {
       if (maxItems < dispData[m].length) {
         maxItems = dispData[m].length;
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
    for (var a = 0; a < rowColData.length; a++) {
      resultArray.push( [] );
    }

// Loop through the data and convert to a 2D array.
// **NOTE:  I feel there may be a better way to do this.  Maybe a pattern or
//          some type of recursion.  But I could not see it so I used the
//          brute force method. 
    for (var i = 0; i < dispData.length; i++) {
      rowPosition++;
      columnPosition = 0;

// Skip over any leading nulls
      if(!(typeof resultArray[i] === 'undefined')) {
        columnPosition = resultArray[i].length;
      }

      for (var j = 0; j < dispData[i].length; j++) {

// We multiple i by 2 when getting the data because there are 2 rows of data
// for each one row of display data.        
        var rowSpan = this.getRowSpan(rowColData,i*2,j,0);
        var colSpan = this.getColSpan(rowColData,i*2,j,1);
  
// Now that we have the rowSpan and colSpan handle it for the given item
// First do the row then do the column
        var n = 0;
        while (n < nullArray.length) {
          if ((nullArray[n] === rowPosition) && (nullArray[n+1] === columnPosition)) {
            resultArray[i].push("NULL");
            columnPosition++
            nullArray[n] === "NULL";            
            nullArray[n+1] === "NULL";
            break;            
          }
          n = n + 2;
        }
        resultArray[i].push(dispData[i][j]);
        columnPosition++
// Offset the Loop so we add to the correct location.  In order for the looping
// to happen correctly we have to start at 1 but we have already increamented
// the rowPostion.  Therefore we have to subtract 1 from so it is correct.        
        for (var r = 1, rPos = (rowPosition-1); r < rowSpan; r++) {
          if(!(typeof resultArray[r+rPos] === 'undefined')) {

// Store that we need to add some nulls before we can put the numbers in            
            if (columnPosition > 1) {
              nullArray.push(r+rPos+1);
              nullArray.push(columnPosition-1);
            }
// We can add the null right now             
            else {
              resultArray[r+rPos].push("NULL");
            }
          }        
        }

// Now move across the columns        
        for (var c = 1; ((c < colSpan) && (c < maxItems-1)); c++) {
            resultArray[i].push("NULL");
            columnPosition++;
          }        
      }

// Make sure that all items have NULL      
      for (var k = resultArray[i].length; resultArray[i].length < maxItems; k++) {
        resultArray[i].push("NULL");
      } 

    }
    
// Loop through the resultArray and generate a nice string.  
// I tried to String but it was not formatted nicely
    var resultString = "[";
    for (var s = 0; s < resultArray.length; s++) {
      resultString = resultString + "[";
      for (var t = 0; t < resultArray[s].length; t++) {
        resultString = resultString + resultArray[s][t] + ",";        
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
// Method -- getRowSpan   Author: Susan G. Conger
//   Parameters In -- rowColData - Holds the row span and column span 
//                    rElement - Array position
//                    rElement - item in array
//   Parameters Out -- None
//   Parameters In/Out -- None
//   Returns -- number that has rowSpan.
//
// Description 
//   Takes the rowColunmData and determine the rowSpan for the given Element,Item
//   and returns
//
// Modifcation
//    04/08/2018 SGC V1.0.0.0 Initial Creation     
//                                              
  getRowSpan(rowColunmData, rIndex, rElement, rItem) {

// Check if the Row Span data is avialable for this item.  If it is not then assume 1
    if(!(typeof this.rowColData[rIndex+rElement] === 'undefined')) {
      var spanInfo = this.rowColData[rIndex+rElement];
      if (spanInfo.hasOwnProperty(rElement+1)) {
        return (spanInfo[rElement+1][rItem]);
      }
    }
    
// If the Element does not have a colSpan then return the default 1
    return 1;
  }
  

// 
// Method -- getColSpan   Author: Susan G. Conger
//   Parameters In -- rowColData - Holds the row span and column span 
//                    rElement - Array position
//                    rElement - item in array
//   Parameters Out -- None
//   Parameters In/Out -- None
//   Returns -- number that has colSpan.
//
// Description 
//   Takes the rowColunmData and determine the colSpan for the given Element,Item
//   and returns
//
// Modifcation
//    04/08/2018 SGC V1.0.0.0 Initial Creation     
//                                              
  getColSpan(rowColunmData, rIndex, rElement, rItem) {

// Check if the Row Span data is avialable for this item.  If it is not then assume 1
    if(!(typeof this.rowColData[rIndex+rElement] === 'undefined')) {
      var spanInfo = this.rowColData[rIndex+rElement];
      if (spanInfo.hasOwnProperty(rElement+1)) {
        return (spanInfo[rElement+1][rItem]);
      }
    }
  
// If the Element does not have a colSpan then return the default 1
    return 1;
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
      var results2DDisplayNode = res2DElement.item(0);
      if (results2DDisplayNode != null) {
        results2DDisplayNode.innerHTML = "Display Data: " + this.displayData;
      }
    }

// Dynamically update the HTML so it display the Row Column data with the result  
    res2DElement = document.body.getElementsByClassName("results2DRowColumn");
    if (res2DElement != null) {
      var results2DRowColNode = res2DElement.item(0);
      if (results2DRowColNode != null) {
        results2DRowColNode.innerHTML = "Row Column Data: " + this.rowColunmData;
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
/************************************************************ 
 *  End of Class HopePage                   
 ************************************************************/

//  =============================================================================================
//                      Copyright 2018, by Susan G. Conger All rights reserved                   
//  =============================================================================================