/**************************************************************************************

                    All functions to populate operation INPUT/OUTPUT information

 **************************************************************************************/

//not sure if needed yet... might be able to delete this
function inputExperiment() {

    var experiment = JSON.parse(JSON.stringify(experimentStructure));

    experiment.BENCHTOP.EXPERIMENTS.push(experimentHolder);
}


// Functions for injecting inputs, volume, temperature in
function inputSubstance(name) {

    if (name != '') {

        //creates an instance of the substance structure while keeping its JSON structure
        var tmpSub = JSON.parse(JSON.stringify(variableStructure));

        tmpSub.VARIABLE_DECLARATION.ID = tmpSub.VARIABLE_DECLARATION.NAME = name;

        //populates substance list for pushing into Experiment
        substancelist.push(tmpSub);

        //populates substance with names of user inputted substance for allowing user to pick from defined substances
        substances.push(name);

        resetForm('subAddForm'); // resets the substance entry form after each substance entered
    }
}


// allows to remove substance once they've been added
function removeSubstance() {

    var toRemove = document.getElementById('removesubstanceList').value;
    var tmpOp = [];
    var inputRemove = [];

    // tracks length of array that holds object of inputs
    var inputLength = inputs.length;

    for(var i = 0; i < substancelist.length; i++) {

        if(substancelist[i].VARIABLE_DECLARATION.NAME === toRemove) {
            substancelist.splice(i, 1);
            substances.splice(i, 1);
        }
    }

    if (operationList.length != 0) {

        for (j = 0; j < inputLength; j++) {

            // tracks length of operations in use
            var opLength = operationList.length;

            // checks if the input name and substance to be removed match
            if (inputs[j].NAME.indexOf(toRemove) != -1) {

                // grabs the id of the input to be removed
                var tmpId = inputs[j].ID;

                for (k = 0; k < opLength; k++) {

                    // check if the operation ID and the input to be removed id match
                    if (operationList[k].OPERATION.ID === tmpId) {

                        //inputRemove.push(j);
                        inputRemove = getAllIndexes(inputs, tmpId);

                        if (inputs[j].OUTPUT != null) {
                            var output = inputs[j].OUTPUT;
                            var tmpOut = checkOutputs(k, output, opLength);
                        }
                        tmpOp.push(k);
                    }
                }
            }
        }

        // combines and filters out doubles of indices
        var opRemove = tmpOp.concat(tmpOut.filter(function (item) {return tmpOp.indexOf(item) < 0}));


        // removes in reverse order the indices of the operations using the substance to be removed
        for (var j = opRemove.length - 1; j >= 0; j--) {

            operationList.splice(opRemove[j], 1);
        }

        // removes in reverse order the indices of the inputs tied to operations using the substance to be removed
        for (j = inputRemove.length - 1; j >= 0; j--) {

            inputs.splice(inputRemove[j], 1);
        }
    }

    console.log(inputRemove);
    alert(JSON.stringify(inputRemove));
    console.log(inputs);
}


// helper function to removeSubstance function
function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i].ID === val)
            indexes.push(i);
    return indexes;
}


// helper function to removeSubstance function
function checkOutputs(index, output, opLength) {

    var tmpArray = [];

    for (i = index + 1; i < opLength; i++) {

        if (operationList[i].OPERATION.INPUTS[0] != null) {

            // used to make sure only variable outputs are populated
            var varTest = operationList[i].OPERATION.INPUTS[0];
            var isVariable = Object.keys(varTest);

            if (operationList[i].OPERATION.INPUTS.length === 1) {

                if (isVariable[1] === 'CHEMICAL') {
                    if (operationList[i].OPERATION.INPUTS[0].CHEMICAL.VARIABLE.NAME === output) {

                        tmpArray.push(i);
                    }
                }
                else if (isVariable[1] === 'VARIABLE') {

                    if (operationList[i].OPERATION.INPUTS[0].VARIABLE.NAME === output) {

                        tmpArray.push(i);
                    }
                }
            }
        }
    }
    return tmpArray;
}


// populates substance or sensor structure for outputs of operations
function operationOutput(obj, type, tmpName) {

    if (tmpName === '') {

    }
    else if (type === 'substance') {

        var varOutput = JSON.parse(JSON.stringify(variableStructure));

        varOutput.VARIABLE_DECLARATION.NAME = varOutput.VARIABLE_DECLARATION.ID = tmpName;

        varOutput.VARIABLE_DECLARATION.TYPE = 'VARIABLE';

        obj.OPERATION.OUTPUTS.push(varOutput);
    }
    else if (type === 'sensor') {

        var sensor = JSON.parse(JSON.stringify(sensorOutput));

        sensor.SENSOR_DECLARATION.NAME = sensor.SENSOR_DECLARATION.ID = tmpName;

        obj.OPERATION.OUTPUTS.push(sensor);
    }
}


// populates the variable or substance structure for inputs of operations based on input parameters
function inputVariable (obj, tmpName, tmpVal, tmpUnit) {

    //creates an instance of the variable structure while keeping its JSON structure
    //var input = JSON.parse(JSON.stringify(substanceStructure));
    //input.CHEMICAL.VARIABLE.NAME = tmpName;

    if (tmpVal === '' && tmpUnit === '') {

        //creates an instance of the variable structure while keeping its JSON structure
        var input = JSON.parse(JSON.stringify(variableInput));

        input.VARIABLE.NAME = tmpName;
        obj.OPERATION.INPUTS.push(input);

        //delete input.CHEMICAL.VOLUME;
        //obj.OPERATION.INPUTS.push(input);
    }
    else {

        //creates an instance of the variable structure while keeping its JSON structure
        var input = JSON.parse(JSON.stringify(substanceStructure));

        input.CHEMICAL.VARIABLE.NAME = tmpName;
        input.CHEMICAL.VOLUME.VALUE = tmpVal;
        input.CHEMICAL.VOLUME.UNITS = tmpUnit;

        //populates the INPUT array of operation structure with inputs with volumes and units
        //operation obj being passed into function
        obj.OPERATION.INPUTS.push(input);
    }
}


// populates substance structure temperature for inputs of operations
function inputTemperature (obj, tmpVal, tmpUnit) {

    //creates an instance of the temperature structure while keeping its JSON structure
    var tmp = JSON.parse(JSON.stringify(propertyTemp));

    if(tmpVal === '' && tmpUnit === '') {
        delete tmp.INPUT_TYPE;
        delete tmp.TEMPERATURE;
    }
    else {
        tmp.TEMPERATURE.VALUE = tmpVal;
        tmp.TEMPERATURE.UNITS = tmpUnit;

        //populates the INPUT array of operation structure with temperature values and units
        //operation obj being passed into function
        obj.OPERATION.INPUTS.push(tmp);
    }
}


// populates substance structure timing for inputs of operations
function inputTime (obj, tmpVal, tmpUnit) {

    //creates an instance of the time structure while keeping its JSON structure
    var time = JSON.parse(JSON.stringify(propertyTime));

    if(tmpVal === '' && tmpUnit === '') {
        delete time.INPUT_TYPE;
        delete time.TIME;
    }
    else {
        time.TIME.VALUE = tmpVal;
        time.TIME.UNITS = tmpUnit;

        //populates the INPUT array of operation structure with time values and units using
        //operation obj being passed into funtion
        obj.OPERATION.INPUTS.push(time);
    }
}


/**************************************************************************************

 Functions to help make forms dynamic

 **************************************************************************************/


// populates the temperature for operations for forms
function formTemperature(formId) {
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
function formTime(formId) {
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


//dynamically handles the input fields for mixing operations
function mixInputCreate() {
    // pulls the number from selection of how many inputs wanted
    var num = document.getElementById('mixInputAmount').value;

    var container = document.getElementById('mixInput');

    var opLength = operationList.length;

    if (container !== null) {

        // handles if the number is changed to a lower number than was previously selected
        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild);
        }

        // creates the input entries based on number selected with # of inputs
        for (i = 0; i < num; i++) {

            // creates drop down boxes for defined substances
            container.appendChild(document.createTextNode("Input " + (i + 1) + ": "));
            var inputs = document.createElement('select');
            inputs.id = "input" + i;
            inputs.className = "substanceDrop";
            container.appendChild(inputs);

            for (var s = 0; s < substancelist.length; s++) {

                var opt = document.createElement('option');
                opt.innerHTML = opt.value = substancelist[s].VARIABLE_DECLARATION.NAME;
                inputs.appendChild(opt);
            }

            // adds the output of operations to input drop down list
            for (n = 0; n < opLength; n++) {

                //if (operationList[n].OPERATION.OUTPUTS.length != 0) {
                if (operationList[n].OPERATION.OUTPUTS[0] != null) {

                    var innerlist = operationList[n].OPERATION.OUTPUTS.length;

                    // used to make sure only variable outputs are populated
                    var varTest = operationList[n].OPERATION.OUTPUTS[0];
                    var isVariable = Object.keys(varTest);

                    // used to check the above vars to make sure it was a variable output
                    if (isVariable[0] === 'VARIABLE_DECLARATION') {

                        if (operationList[n].OPERATION.OUTPUTS.length === 1) {

                            var option = document.createElement('option');
                            option.innerHTML = option.value =
                                operationList[n].OPERATION.OUTPUTS[0].VARIABLE_DECLARATION.NAME;
                            inputs.appendChild(option);
                        }
                        else {

                            for (j = 0; j < innerlist; j++) {

                                var option = document.createElement('option');
                                option.innerHTML = option.value =
                                    operationList[n].OPERATION.OUTPUTS[j].VARIABLE_DECLARATION.NAME;
                                inputs.appendChild(option);
                            }
                        }
                    }
                }
            }
            // end drop down creation of defined substances

            // creates the volume input entries
            container.appendChild((document.createTextNode(" Volume: ")));
            var volume = document.createElement('input');
            volume.type = "text";
            volume.id = "inputvolume" + i;
            volume.className = "volumeInput";
            container.appendChild(volume);
            // ends the volume input creation

            // creates the selection entries based on number selected with # of inputs
            container.appendChild((document.createTextNode(" Units: ")));
            var volumeUnits = document.createElement("select");
            volumeUnits.id = "inputvolumeUnits" + i;
            container.appendChild(volumeUnits);

            var option = document.createElement('option');
            option.setAttribute('selected', 'selected');
            option.setAttribute('disabled', 'disabled');
            option.setAttribute('hidden', 'hidden');
            option.setAttribute('style', 'display: none');
            volumeUnits.appendChild(option);

            var units = ["mL", "\u00B5L", "pL", "nL", "L"];
            var unitVal = ["ML", "UL", "PL", "NL", "LITER"];

            for (var j = 0; j < units.length; j++) {
                var option = document.createElement('option');
                option.innerHTML = units[j];
                option.value = unitVal[j];
                volumeUnits.appendChild(option);
            }
            // end drop down creation of volume units

            container.appendChild(document.createElement('br'));
        }
    }
}


//handles if input is substance or operation output and disables volume attributes
function mixInputChange() {

    // pulls number of inputs being used within mixture operation
    var num = document.getElementById('mixInputAmount').value;

    for(var i = 0; i < num; i++) {

        // takes the value of the input selected at its given id
        var substance = document.getElementById('input' + i).value;

        // checks to see if the substance exists within the substances array
        if (substances.indexOf(substance) != -1) {

            console.log('is chem');
        }
        else {

            // disables volume input options for non substances
            document.getElementById('inputvolume' + i).setAttribute("disabled","disabled");
            document.getElementById('inputvolumeUnits' + i).setAttribute("disabled","disabled");
        }
    }
}


// dynamically handles the output fields for split operations
function splitOutputCreate() {

    // pulls the number from selection of how many inputs wanted
    var num = document.getElementById('splitAmount').value;

    var container = document.getElementById('splitInput');

    // handles if the number is changed to a lower number than was previously selected
    while (container.hasChildNodes())
    {
        container.removeChild(container.lastChild);
    }

    // creates the output entries based on number selected with # of outputs
    for (i = 0; i < num; i++)
    {
        // creates the output entries
        container.appendChild((document.createTextNode(" Output: " )));
        var splitOut = document.createElement('input');
        splitOut.type = "text";
        splitOut.id = "splitOut" + i;
        splitOut.className = "splitOut";
        container.appendChild(splitOut);

        container.appendChild(document.createElement('br'));
    }
}


// populates the Substance removal form drop down
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