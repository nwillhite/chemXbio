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
    experiment.NAME = "";
    experiment.INPUTS.length = 0;
    experiment.INSTRUCTIONS.length = 0;
    document.getElementById('whereToPrint').innerHTML = "";
}


//dynamically handles the input fields for mixing operations
window.inputCreate = function()
{
    // pulls the number from selection of how many inputs wanted
    var num = document.getElementById('numInputs').value;

    var container = document.getElementById('inputMix');

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

        for(var s = 0; s < substances.length; s++)
        {
            var opt = document.createElement("option");
            opt.innerHTML = substances[s];
            opt.value = substances[s];
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


var substanceStructure = {
    VARIABLE_DECLARATION: {
        ID: "",
        NAME: "",
        TYPE: "CHEMICAL"
    }
};


var operationStructure = {
    NAME: "",
    ID: "",
    CLASSIFICATION: "",
    INPUTS: [],
    OUTPUTS: []
};


/**************************************************************************************

                    All structures to hold operation INPUT information

 **************************************************************************************/


// structure to hold user defined substances with their volume and volume units
var variableStructure = {
    INPUT_TYPE : "VARIABLE",
    VARIABLE : {
        NAME: "",
        VOLUME : {
            VALUE: "",
            UNITS: ""
        },
    }
};

// structure to hold temperature for operations
var propertyTemp = {
    INPUT_TYPE : "PROPERTY",
    TEMPERATURE : {
        VALUE : "",
        UNITS : "",
    }
};

// structure to hold time for operations
var propertyTime = {
    INPUT_TYPE : "PROPERTY",
    TIME : {
        VALUE : "",
        UNITS : "",
    }
};


/**************************************************************************************

                    All functions to populate operation INPUT information

 **************************************************************************************/


// Functions for injecting inputs, volume, temperature in

function inputSubstance (name) {

    //creates an instance of the substance structure while keeping its JSON structure
    var tmpSub = JSON.parse(JSON.stringify(substanceStructure));

    tmpSub.VARIABLE_DECLARATION.ID = tmpSub.VARIABLE_DECLARATION.NAME = name;

    //populates substance list for pushing into Experiment
    substancelist.push(tmpSub);

    //populates substance with names of user inputted substance for allowing user to pick from defined substances
    substances.push(name);

    resetForm('subForm'); // resets the substance entry form after each substance entered

}


function inputVariable (obj, tmpname, tmpVal, tmpUnit) {

    //creates an instance of the variable structure while keeping its JSON structure
    var input = JSON.parse(JSON.stringify(variableStructure));

    input.VARIABLE.NAME = tmpname;

    if (tmpVal === undefined && tmpUnit === undefined) {
        delete input.VARIABLE.VOLUME;
    }
    else {
        input.VARIABLE.VOLUME.VALUE = tmpVal;
        input.VARIABLE.VOLUME.UNITS = tmpUnit;

        //populates the INPUT array of operation structure with inputs with volumes and units
        //operation obj being passed into function
        obj.INPUTS.push(input);
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
        obj.INPUTS.push(tmp);
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
        obj.INPUTS.push(time);
    }

}