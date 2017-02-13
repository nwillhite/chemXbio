/**************************************************************************************

                Containers for holding all aspects of experiment creation

 **************************************************************************************/

// holder for the BenchTop
var benchtop = [];

// holder for all experiment operations
var experimentHolder = [];

//holder for all user defined substances
var substancelist = [];

//holder for all operations
var operationList = [];

// holds defined substance to help populate selection for drop downs
var substances = [];


// helper function to clear experiment until a better way can be found
function resetExperiment() {
    experimentHolder.length = 0;
    experimentStructure.EXPERIMENT.NAME = "";
    experimentStructure.EXPERIMENT.INPUTS.length = 0;
    experimentStructure.EXPERIMENT.INSTRUCTIONS.length = 0;
    substancelist.length = 0;
    operationList.length = 0;
    substances.length = 0;
    //document.getElementById('whereToPrint').innerHTML = "";
}


//dynamically handles the input fields for mixing operations
function inputCreate()
{
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
            var opt = document.createElement("option");
            opt.innerHTML = substancelist[s].VARIABLE_DECLARATION.NAME;
            opt.value = substancelist[s].VARIABLE_DECLARATION.NAME;
            inputs.appendChild(opt);
        }
        // end drop down creation of defined substances


        // creates the volume input entries
        container.appendChild((document.createTextNode(" Volume: " )));
        var volume = document.createElement("input");
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
            var option = document.createElement("option");
            option.innerHTML = units[j];
            option.value = unitVal[j];
            volumeUnits.appendChild(option);
        }
        // end drop down creation of volume units

        container.appendChild(document.createElement("br"));
    }
};


/**************************************************************************************

                                TO BE COMPLETED

 **************************************************************************************/

/*

 Need to do OUTPUT


 // structure to hold chemicals TO BE COMPLETED
 var Chemical = {
    INPUT_TYPE : "CHEMICAL",
    CHEMICAL : {
 NAME : "",
 },
 VOLUME : {
 VALUE : "",
 UNITS : ""
 }
 };


 // structure to hold compounds TO BE COMPLETED
 var Compound = {
 CHEMICAL: {
 NAME: "",
 VOLUME: {
 VALUE: "",
 UNITS: ""
 },
 }
 };

 */


/**************************************************************************************

                    All structures of a complete experiment

 **************************************************************************************/


var BenchTop = {
    BENCHTOP: {
        INPUTS: [],
        EXPERIMENTS: []
    }
};


var experimentStructure = {
    EXPERIMENT: {
        NAME: "",
        INPUTS: [],
        INSTRUCTIONS: []
    }

};


var variableStructure = {
    VARIABLE_DECLARATION: {
        ID: "",
        NAME: "",
        TYPE: "CHEMICAL"
    }
};


var operationStructure = {
    OPERATION : {
        NAME: "",
        ID: "",
        CLASSIFICATION: "",
        INPUTS: [],
        OUTPUTS: []
    }
};


/**************************************************************************************

                    All structures to hold operation INPUT information

 **************************************************************************************/


// structure to hold user defined substances with their volume and volume units
var substanceStructure = {
    INPUT_TYPE: "VARIABLE",
    CHEMICAL: {
        VARIABLE: {
            NAME: "",
        },
        VOLUME: {
            VALUE: "",
            UNITS: ""
        },
    }
};

// might need in future, using variableStucture for the time being
var variableInput = {
    INPUT_TYPE: "VARIABLE",
    VARIABLE: {
        NAME: "",
    }
};


var sensorOutput = {
    SENSOR_DECLARATION: {
        ID: "",
        NAME: "",
        TYPE: "SENSOR",
    }
};


// structure to hold temperature for operations
var propertyTemp = {
    INPUT_TYPE: "PROPERTY",
    TEMPERATURE: {
        VALUE: "",
        UNITS: "",
    }
};


// structure to hold time for operations
var propertyTime = {
    INPUT_TYPE: "PROPERTY",
    TIME: {
        VALUE: "",
        UNITS: "",
    }
};


/**************************************************************************************

                    All functions to populate operation INPUT information

 **************************************************************************************/


// Functions for injecting inputs, volume, temperature in

function inputSubstance (name) {

    //creates an instance of the substance structure while keeping its JSON structure
    var tmpSub = JSON.parse(JSON.stringify(variableStructure));

    tmpSub.VARIABLE_DECLARATION.ID = tmpSub.VARIABLE_DECLARATION.NAME = name;

    //populates substance list for pushing into Experiment
    substancelist.push(tmpSub);

    //populates substance with names of user inputted substance for allowing user to pick from defined substances
    substances.push(name);

    resetForm('subAddForm'); // resets the substance entry form after each substance entered

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