/**************************************************************************************

                    All functions to populate operation INPUT/OUTPUT information

 **************************************************************************************/

//not sure if needed yet... might be able to delete this
function inputExperiment () {

    var experiment = JSON.parse(JSON.stringify(experimentStructure));

    experiment.BENCHTOP.EXPERIMENTS.push(experimentHolder);
}


// Functions for injecting inputs, volume, temperature in
function inputSubstance (name) {

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
    //var index = substances.indexOf(toRemove);

    for(var i = 0; i < substancelist.length; i++)
    {
        if(substancelist[i].VARIABLE_DECLARATION.NAME === toRemove)
        {
            substancelist.splice(i, 1);
            substances.splice(i, 1);
        }
    }

    /*
    var opLength = operationList.length;

    // creates the input entries based on number selected with # of inputs
    // adds the output of operations to input drop down list
    for (i = 0; i < opLength; i++) {

        var innerlist = operationList[i].OPERATION.INPUTS.length;

        if (operationList[i].OPERATION.INPUTS[0] != null) {

            // used to make sure only variable outputs are populated
            //var varTest = operationList[i].OPERATION.INPUTS[0];
            //var isVariable = Object.keys(varTest);

            // used to check the above vars to make sure it was a variable output
            //if (isVariable[0] === 'VARIABLE') {

                if (operationList[i].OPERATION.INPUTS.length === 1) {

                    if (operationList[i].OPERATION.INPUTS[0].CHEMICAL.VARIABLE.NAME === toRemove) {
                        operationList.splice(i, 1);
                    }
                }
                else {

                    for (j = 0; j < innerlist; j++) {

                        if (operationList[i].OPERATION.INPUTS[0].CHEMICAL.VARIABLE.NAME === toRemove) {
                            operationList.splice(i, 1);
                        }
                    }
                }
            //}
        }
    } */

    //update();
}


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
        console.log('entered sensor');
        var sensor = JSON.parse(JSON.stringify(sensorOutput));

        sensor.SENSOR_DECLARATION.NAME = sensor.SENSOR_DECLARATION.ID = tmpName;

        obj.OPERATION.OUTPUTS.push(sensor);
    }
}


function inputVariable (obj, tmpName, tmpVal, tmpUnit) {

    //creates an instance of the variable structure while keeping its JSON structure
    var input = JSON.parse(JSON.stringify(substanceStructure));

    input.CHEMICAL.VARIABLE.NAME = tmpName;

    if (tmpVal === '' && tmpUnit === '')
    {
        delete input.CHEMICAL.VOLUME;
        obj.OPERATION.INPUTS.push(input);
    }
    else {
        input.CHEMICAL.VOLUME.VALUE = tmpVal;
        input.CHEMICAL.VOLUME.UNITS = tmpUnit;

        //populates the INPUT array of operation structure with inputs with volumes and units
        //operation obj being passed into function
        obj.OPERATION.INPUTS.push(input);
    }
}


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


//dynamically handles the input fields for mixing operations
function inputCreate() {
    // pulls the number from selection of how many inputs wanted
    var num = document.getElementById('mixInputAmount').value;

    var container = document.getElementById('mixInput');

    // handles if the number is changed to a lower number than was previously selected
    while (container.hasChildNodes())
    {
        container.removeChild(container.lastChild);
    }

    // creates the input entries based on number selected with # of inputs
    for (i = 0; i < num; i++)
    {
        // creates drop down boxes for defined substances
        container.appendChild(document.createTextNode("Input " + (i + 1) + ": "));
        var inputs = document.createElement('select');
        inputs.id = "input" + i;
        inputs.className = "substanceDrop";
        container.appendChild(inputs);

        for(var s = 0; s < substancelist.length; s++)
        {
            var opt = document.createElement('option');
            opt.innerHTML = substancelist[s].VARIABLE_DECLARATION.NAME;
            opt.value = substancelist[s].VARIABLE_DECLARATION.NAME;
            inputs.appendChild(opt);
        }
        // end drop down creation of defined substances

        // creates the volume input entries
        container.appendChild((document.createTextNode(" Volume: " )));
        var volume = document.createElement('input');
        volume.type = "text";
        volume.id = "inputvolume" + i;
        volume.className = "volumeInput";
        container.appendChild(volume);
        // ends the volume input creation

        // creates the selection entries based on number selected with # of inputs
        container.appendChild((document.createTextNode(" Units: " )));
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

        for (var j = 0; j < units.length; j++)
        {
            var option = document.createElement('option');
            option.innerHTML = units[j];
            option.value = unitVal[j];
            volumeUnits.appendChild(option);
        }
        // end drop down creation of volume units

        container.appendChild(document.createElement('br'));
    }
}


// dynamically handles the output fields for split operations
function outputCreate() {

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