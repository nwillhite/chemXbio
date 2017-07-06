/*
window.onload = function()
{
  document.getElementById('operationsMenu').style.visibility = 'hidden';
};
*/

function download(text, name, type) {
    var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}


function showDiv(id)
{
  document.getElementById(id).style.display = 'block';
}


function hideDiv(id)
{
  document.getElementById(id).style.display = 'none';
}



function showhidetoggle(id)
{
  var tmp = document.getElementById(id);
  if (tmp.style.display === 'none')
  {
    tmp.style.display = 'block';
  }
  else
  {
    tmp.style.display = 'none';
  }

}


// updates JSON output to the 'whereToPrint' which is the right side
function toJson(input)
{
  document.getElementById('whereToPrint').innerHTML = JSON.stringify(input, null, 2);
}


// randomly generates number for operation id
function createID()
{
    return Math.floor((Math.random() * 1000000000) + 1);
}



function resetForm(formId)
{
    document.getElementById(formId).reset();
}


// allows to remove substance once they've been added
function removeSubstance() {

    var toRemove = document.getElementById('removesubstanceList').value;
    //var index = substances.indexOf(toRemove);

    for(var i = 0; i < substancelist.length; i++)
    {
        if(substancelist[i].VARIABLE_DECLARATION.NAME === toRemove)
        {
            substancelist.splice(i, 1);
            substances.splice(i, 1);
        }
    }

    update();
}


// allows to remove operation once they've been added
function removeOperation() {

    var toRemove = document.getElementById('').value;

    for(var i = 0; i < operationList.length; i++)
    {
        if(operationList[i].OPERATION.NAME === toRemove)
        {
            operationList.splice(i, 1);
        }
    }

}


/**************************************************************************************

                    Functions to help make forms dynamic

 **************************************************************************************/


// function controls the number of inputs for setting inputs into operations
function formInput()
{
    var container = document.getElementById('mixInputAmount');

    // handles if the number is changed to a lower number than was previously selected
    while (container.hasChildNodes()) {

        container.removeChild(container.lastChild);
    }

    var tmp = substancelist.length; //+ operationList.length;
    tmp += 1;

    var option = document.createElement('option');
    option.setAttribute('selected', 'selected');
    option.setAttribute('disabled', 'disabled');
    option.setAttribute('hidden', 'hidden');
    option.setAttribute('style', 'display: none');
    container.appendChild(option);

    for(var i = 0; i < tmp; i++) {

        var option = document.createElement('option');
        option.innerHTML = i;
        option.value = i;
        container.appendChild(option);
    }
}


// function controls the number of outputs for setting outputs of split
function formSplit() {

    var container = document.getElementById('splitAmount');

    var option = document.createElement('option');
    option.setAttribute('selected', 'selected');
    option.setAttribute('disabled', 'disabled');
    option.setAttribute('hidden', 'hidden');
    option.setAttribute('style', 'display: none');
    container.appendChild(option);

    for(var i = 0; i <= 10; i++) {

        var option = document.createElement('option');
        option.innerHTML = i;
        option.value = i;
        container.appendChild(option);
    }

}


function operationOutputInput() {

    var container = document.getElementById('inputOutput');

    while (container.hasChildNodes()) {

        container.removeChild(container.lastChild);
    }

    var tmp = operationList.length;
    var sublength = substancelist.length;

    var option = document.createElement('option');
    option.setAttribute('selected', 'selected');
    option.setAttribute('disabled', 'disabled');
    option.setAttribute('hidden', 'hidden');
    option.setAttribute('style', 'display: none');
    container.appendChild(option);

    // creates the input entries based on number selected with # of inputs
    // adds the output of operations to input drop down list
    for (i = 0; i < tmp; i++) {

        var innerlist = operationList[i].OPERATION.OUTPUTS.length;

        if(operationList[i].OPERATION.OUTPUTS[i] != null) {

            var varTest = operationList[i].OPERATION.OUTPUTS[i];
            var isVariable = Object.keys(varTest);

            if(isVariable[0] === 'VARIABLE_DECLARATION') {

                if (operationList[i].OPERATION.OUTPUTS.length === 1) {

                    var option = document.createElement('option');
                    option.innerHTML = option.value = operationList[i].OPERATION.OUTPUTS[i].VARIABLE_DECLARATION.NAME;
                    container.appendChild(option);
                }
                else {

                    for (j = 0; j < innerlist; j++) {

                        var option = document.createElement('option');
                        option.innerHTML = option.value = operationList[i].OPERATION.OUTPUTS[j].VARIABLE_DECLARATION.NAME;
                        container.appendChild(option);
                    }
                }
            }
            else {
                console.log('was sensor');
            }
        }
    }

    for (i = 0; i < sublength; i ++) {

        var option = document.createElement('option');
        option.innerHTML = substancelist[i].VARIABLE_DECLARATION.NAME;
        option.value = substancelist[i].VARIABLE_DECLARATION.NAME;
        option.className = 'substance';
        container.appendChild(option);
        console.log(container);

    }
}


function operationHeatInput() {

    var container = document.getElementById('inputHeat');
    console.log(container);

    while (container.hasChildNodes()) {

        container.removeChild(container.lastChild);
    }

    var tmp = operationList.length;
    var sublength = substancelist.length;

    var option = document.createElement('option');
    option.setAttribute('selected', 'selected');
    option.setAttribute('disabled', 'disabled');
    option.setAttribute('hidden', 'hidden');
    option.setAttribute('style', 'display: none');
    container.appendChild(option);

    // creates the input entries based on number selected with # of inputs
    // adds the output of operations to input drop down list
    for (i = 0; i < tmp; i++) {

        var innerlist = operationList[i].OPERATION.OUTPUTS.length;

        if(operationList[i].OPERATION.OUTPUTS[i] != null) {

            var varTest = operationList[i].OPERATION.OUTPUTS[i];
            var isVariable = Object.keys(varTest);

            if(isVariable[0] === 'VARIABLE_DECLARATION') {

                if (operationList[i].OPERATION.OUTPUTS.length === 1) {

                    var option = document.createElement('option');
                    option.innerHTML = option.value = operationList[i].OPERATION.OUTPUTS[i].VARIABLE_DECLARATION.NAME;
                    container.appendChild(option);
                }
                else {

                    for (j = 0; j < innerlist; j++) {

                        var option = document.createElement('option');
                        option.innerHTML = option.value = operationList[i].OPERATION.OUTPUTS[j].VARIABLE_DECLARATION.NAME;
                        container.appendChild(option);
                    }
                }
            }
            else {
                console.log('was sensor');
            }
        }
    }

    for (i = 0; i < sublength; i ++) {

        var option = document.createElement('option');
        option.innerHTML = substancelist[i].VARIABLE_DECLARATION.NAME;
        option.value = substancelist[i].VARIABLE_DECLARATION.NAME;
        option.className = 'substance';
        container.appendChild(option);

    }
}


function operationDetectInput() {

    var container = document.getElementById('inputDetect');

    while (container.hasChildNodes()) {

        container.removeChild(container.lastChild);
    }

    var tmp = operationList.length;
    var sublength = substancelist.length;

    var option = document.createElement('option');
    option.setAttribute('selected', 'selected');
    option.setAttribute('disabled', 'disabled');
    option.setAttribute('hidden', 'hidden');
    option.setAttribute('style', 'display: none');
    container.appendChild(option);

    // creates the input entries based on number selected with # of inputs
    // adds the output of operations to input drop down list
    for (i = 0; i < tmp; i++) {

        var innerlist = operationList[i].OPERATION.OUTPUTS.length;

        if(operationList[i].OPERATION.OUTPUTS[i] != null) {

            var varTest = operationList[i].OPERATION.OUTPUTS[i];
            var isVariable = Object.keys(varTest);

            if(isVariable[0] === 'VARIABLE_DECLARATION') {

                if (operationList[i].OPERATION.OUTPUTS.length === 1) {

                    var option = document.createElement('option');
                    option.innerHTML = option.value = operationList[i].OPERATION.OUTPUTS[i].VARIABLE_DECLARATION.NAME;
                    container.appendChild(option);
                }
                else {

                    for (j = 0; j < innerlist; j++) {

                        var option = document.createElement('option');
                        option.innerHTML = option.value = operationList[i].OPERATION.OUTPUTS[j].VARIABLE_DECLARATION.NAME;
                        container.appendChild(option);
                    }
                }
            }
            else {
                console.log('was sensor');
            }
        }
    }

    for (i = 0; i < sublength; i ++) {

        var option = document.createElement('option');
        option.innerHTML = substancelist[i].VARIABLE_DECLARATION.NAME;
        option.value = substancelist[i].VARIABLE_DECLARATION.NAME;
        option.className = 'substance';
        container.appendChild(option);
        console.log(container);

    }
}


function operationStoreInput() {

    var container = document.getElementById('inputStore');

    while (container.hasChildNodes()) {

        container.removeChild(container.lastChild);
    }

    var tmp = operationList.length;
    var sublength = substancelist.length;

    var option = document.createElement('option');
    option.setAttribute('selected', 'selected');
    option.setAttribute('disabled', 'disabled');
    option.setAttribute('hidden', 'hidden');
    option.setAttribute('style', 'display: none');
    container.appendChild(option);

    // creates the input entries based on number selected with # of inputs
    // adds the output of operations to input drop down list
    for (i = 0; i < tmp; i++) {

        var innerlist = operationList[i].OPERATION.OUTPUTS.length;

        if(operationList[i].OPERATION.OUTPUTS[i] != null) {

            var varTest = operationList[i].OPERATION.OUTPUTS[i];
            var isVariable = Object.keys(varTest);

            if(isVariable[0] === 'VARIABLE_DECLARATION') {

                if (operationList[i].OPERATION.OUTPUTS.length === 1) {

                    var option = document.createElement('option');
                    option.innerHTML = option.value = operationList[i].OPERATION.OUTPUTS[i].VARIABLE_DECLARATION.NAME;
                    container.appendChild(option);
                }
                else {

                    for (j = 0; j < innerlist; j++) {

                        var option = document.createElement('option');
                        option.innerHTML = option.value = operationList[i].OPERATION.OUTPUTS[j].VARIABLE_DECLARATION.NAME;
                        container.appendChild(option);
                    }
                }
            }
            else {
                console.log('was sensor');
            }
        }
    }

    for (i = 0; i < sublength; i ++) {

        var option = document.createElement('option');
        option.innerHTML = substancelist[i].VARIABLE_DECLARATION.NAME;
        option.value = substancelist[i].VARIABLE_DECLARATION.NAME;
        option.className = 'substance';
        container.appendChild(option);
        console.log(container);

    }
}


function operationSplitInput() {

    var container = document.getElementById('inputSplit');

    while (container.hasChildNodes()) {

        container.removeChild(container.lastChild);
    }

    var tmp = operationList.length;
    var sublength = substancelist.length;

    var option = document.createElement('option');
    option.setAttribute('selected', 'selected');
    option.setAttribute('disabled', 'disabled');
    option.setAttribute('hidden', 'hidden');
    option.setAttribute('style', 'display: none');
    container.appendChild(option);

    // creates the input entries based on number selected with # of inputs
    // adds the output of operations to input drop down list
    for (i = 0; i < tmp; i++) {

        var innerlist = operationList[i].OPERATION.OUTPUTS.length;

        //operationList[i].OPERATION.OUTPUTS[i].hasOwnProperty('VARIABLE_DECLARATION')

        if(operationList[i].OPERATION.OUTPUTS[i] != null) {

            var varTest = operationList[i].OPERATION.OUTPUTS[i];
            var isVariable = Object.keys(varTest);

            if (isVariable[0] === 'VARIABLE_DECLARATION') {

                if (operationList[i].OPERATION.OUTPUTS.length === 1) {

                    var option = document.createElement('option');
                    option.innerHTML = option.value = operationList[i].OPERATION.OUTPUTS[i].VARIABLE_DECLARATION.NAME;
                    container.appendChild(option);
                }
                else {

                    for (j = 0; j < innerlist; j++) {

                        var option = document.createElement('option');
                        option.innerHTML = option.value = operationList[i].OPERATION.OUTPUTS[j].VARIABLE_DECLARATION.NAME;
                        container.appendChild(option);
                    }
                }

            }
            else {
                console.log('was sensor');
            }
        }
    }

    // adds the user inputted substances to input drop down list
    for (i = 0; i < sublength; i ++) {

        var option = document.createElement('option');
        option.innerHTML = substancelist[i].VARIABLE_DECLARATION.NAME;
        option.value = substancelist[i].VARIABLE_DECLARATION.NAME;
        option.className = 'substance';
        container.appendChild(option);
        //console.log(container);
    }
}


// populates the temperature for operations for forms
function formTemperature(formId)
{
    var sign = ['\u2103', '\u2109', '\u212A'];
    var signValue = ['CELSIUS', 'FAHRENHEIT', 'KELVIN'];

    var select = document.getElementById(formId);

    var option = document.createElement('option');
    option.setAttribute('selected', 'selected');
    option.setAttribute('disabled', 'disabled');
    option.setAttribute('hidden', 'hidden');
    option.setAttribute('style', 'display: none');
    select.appendChild(option);


    for(var i = 0; i < sign.length; i++) {

        var option = document.createElement('option');
        option.innerHTML = sign[i];
        option.value = signValue[i];
        select.appendChild(option);
    }
}


// populates the timing for time operations for forms
function formTime(formId)
{
    var display = ['Second(s)', 'Minute(s)', 'Hour(s)', 'Day(s)'];
    var displayValue = ['SECOND', 'MINUTE', 'HOUR', 'DAY'];

    var select = document.getElementById(formId);

    var option = document.createElement('option');
    option.setAttribute('selected', 'selected');
    option.setAttribute('disabled', 'disabled');
    option.setAttribute('hidden', 'hidden');
    option.setAttribute('style', 'display: none');
    select.appendChild(option);


    for(var i = 0; i < display.length; i++)
    {
        var option = document.createElement('option');
        option.innerHTML = display[i];
        option.value = displayValue[i];
        select.appendChild(option);
    }
}


// populates the Substance removal drop down
function substanceRemove() {

    var tmp = substancelist.length;//substances.length;

    var container = document.getElementById('removesubstanceList');

    // handles if the number is changed to a lower number than was previously selected
    while (container.hasChildNodes())
    {
        container.removeChild(container.lastChild);
    }

    for (var i = 0; i < tmp; i++)
    {
        var option = document.createElement('option');
        option.innerHTML = substances[i];
        option.value = substances[i];
        //option.innerHTML = substances[i];
        //option.value = substances[i];
        container.appendChild(option);
    }

}


function updateList() {

    substanceRemove();
    document.getElementById('substanceDisplay').innerHTML = JSON.stringify(substances, null, 2);
    toJson(experimentHolder);
    update();
    //document.getElementById('substanceDisplay').innerHTML = " ";
    //document.getElementById('substanceDisplay').innerHTML = " " + substances;
}


function update() {

    formInput();
    operationSplitInput();
    operationOutputInput();
    operationDetectInput();
    operationStoreInput();
    operationHeatInput();
}