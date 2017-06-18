/**
 * Created by nwillhite on 6/18/17.
 */

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
    location.reload();
    //document.getElementById('whereToPrint').innerHTML = "";
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

function outputCreate()
{
    // pulls the number from selection of how many inputs wanted
    var num = document.getElementById('splitAmount').value;

    var container = document.getElementById('splitInput');

    // handles if the number is changed to a lower number than was previously selected
    while (container.hasChildNodes())
    {
        container.removeChild(container.lastChild);
    }

    // creates the input entries based on number selected with # of inputs
    for (i = 0; i < num; i++)
    {

        // creates the volume input entries
        container.appendChild((document.createTextNode(" Output: " )));
        var splitOut = document.createElement('input');
        splitOut.type = "text";
        splitOut.id = "splitOut" + i;
        splitOut.className = "splitOut";
        container.appendChild(splitOut);

        container.appendChild(document.createElement('br'));
    }
}

/**************************************************************************************

 TO BE COMPLETED

 **************************************************************************************/



/**************************************************************************************

 All structures of a complete experiment

 **************************************************************************************/


var benchTopStructure = {
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
            NAME: ""
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
        NAME: ""
    }
};


var sensorOutput = {
    SENSOR_DECLARATION: {
        ID: "",
        NAME: "",
        TYPE: "SENSOR"
    }
};


// structure to hold temperature for operations
var propertyTemp = {
    INPUT_TYPE: "PROPERTY",
    TEMPERATURE: {
        VALUE: "",
        UNITS: ""
    }
};


// structure to hold time for operations
var propertyTime = {
    INPUT_TYPE: "PROPERTY",
    TIME: {
        VALUE: "",
        UNITS: ""
    }
};