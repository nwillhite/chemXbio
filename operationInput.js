/**************************************************************************************

                    All functions to populate operation INPUT information

 **************************************************************************************/

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

function operationOutput(obj, type, tmpName) {

    if (type === 'substance')
    {
        var varOutput = JSON.parse(JSON.stringify(variableStructure));

        varOutput.VARIABLE_DECLARATION.NAME = varOutput.VARIABLE_DECLARATION.ID = tmpName;

        varOutput.VARIABLE_DECLARATION.TYPE = 'VARIABLE';

        obj.OPERATION.OUTPUTS.push(varOutput);

    }
    else if (type === 'sensor')
    {
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