   let commonFieldsArray = [
            { Name: "UniqueEventId", Value: "UniqueIdPlaceholder" },
            { Name: "ProjectNameLbl", Value: "ProjectNamePlaceholder" },
            { Name: "Status", Value: "FormCurrentStatusPlaceholder" },
            { Name: "EventTitle", Value: "EventTitleDescription" },
            { Name: "FormNameReview", Value: "FormNamePlaceholder" },
            { Name: "Category", Value: "CategoriesAssignedToForm" },
            { Name: "Classification", Value: "ClassificationExecutedInForm" },
            { Name: "DateEvent", Value: "DateEventPlaceholder" },
            { Name: "DueDateEvent", Value: "DueDateEventPlaceholder" },
            { Name: "Reporter", Value: "ReporterDescriptionPlaceholder" },
            { Name: "ExpirationDate", Value: "ExpirationDatePlaceholder" },
            { Name: "RenewalDate", Value: "RenewalDatePlaceholder" },
            { Name: "...", Value: "..." }
        ];

        let li = '';

        let mapElements = commonFieldsArray.map(function(value, index){
             li +='<button type="button" class="list-group-item" onclick="selectedTag(this)">'+value.Name+'</button>';
             $("#tags").append(li);
             li='';
             return li;
         })

        var timeReset = 0;
        $('#txtarea').keydown(function (e) { 
            clearTimeout(timeReset);
            let charChk = e.key;          
            timeReset = setTimeout(function () {                     
                showSuggestionsDropdown(charChk, e);
            }, 500);           
        });

        $("#nameSearch").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $("#tags button").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });


        function selectedTag(element){
            let matchedWord = $("#txtarea").html();   
            let getSelection = document.getSelection();    
            let cursorPositionStart = getSelection.anchorOffset
            let cursorPositionEnd = getSelection.extentOffset; 
            let caretPosition = getCaretPosition();
            console.log('Caret Position=' + caretPosition)
            $("#txtarea").html(matchedWord.replace(/^@+/i, '').slice(0,-1).substring(0, caretPosition) +  element.textContent + matchedWord.substring(caretPosition, matchedWord.length));   
            $("#tagContainer").hide();    
            setCursorAtEnd(document.getElementById("txtarea"));
        }

        function showSuggestionsDropdown(charChk, el) {            
                let checkSymbol = charChk == '@'?true:false;                             
                if(checkSymbol){
                    console.log("@found")
                    $("#tagContainer").show();                
                }
                else{
                    $("#tagContainer").hide();
                }
        }

        function setCursorAtEnd(textelement) {
            textelement.focus();
            if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
                let range = document.createRange();
                range.selectNodeContents(textelement);
                range.collapse(false);
                let selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            } else if (typeof document.body.createTextRange != "undefined") {
                let textRange = document.body.createTextRange();
                textRange.moveToElementText(textelement);
                textRange.collapse(false);
                textRange.select();
            }
        }
 
    
  function getCaretPosition() {
    if (window.getSelection && window.getSelection().getRangeAt) {
      var range = window.getSelection().getRangeAt(0);
      var selectedObj = window.getSelection();
      var rangeCount = 0;
      var childNodes = selectedObj.anchorNode.parentNode.childNodes;
      for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i] == selectedObj.anchorNode) {
          break;
        }
        if (childNodes[i].outerHTML)
          rangeCount += childNodes[i].outerHTML.length;
        else if (childNodes[i].nodeType == 3) {
          rangeCount += childNodes[i].textContent.length;
        }
      }
      return range.startOffset + rangeCount;
    }
    return -1;
  }
