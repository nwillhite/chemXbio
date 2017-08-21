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

// holds instances of inputList
var inputs = [];


// helper function to clear experiment until a better way can be found
function resetExperiment() {
    //experimentHolder.length = 0;
    //experimentStructure.EXPERIMENT.NAME = "";
    //experimentStructure.EXPERIMENT.INPUTS.length = 0;
    //experimentStructure.EXPERIMENT.INSTRUCTIONS.length = 0;
    //substancelist.length = 0;
    //operationList.length = 0;
    //substances.length = 0;
    //outputs.length = 0;
    //hideDiv('startExperiment');
    //hideDiv('operationsMenu');
    //hideDiv('forms');
    //document.getElementById('whereToPrint').innerHTML = "";
    //document.getElementById('substanceDisplay').innerHTML = "";
    document.body.scrollTop = 0;
    location.reload();
}

function finish() {
    addExperiment();
    toJson(benchtop);

    document.getElementById('substanceDisplay').innerHTML = "";
    document.body.scrollTop = 0;

    //document.getElementById('whereToPrint').innerHTML = "";
    //download(JSON.stringify(benchtop, null, 2), 'output.JSON', 'text/plain');

    benchtop.length = 0;
    experimentHolder.length = 0;
    experimentStructure.EXPERIMENT.NAME = "";
    experimentStructure.EXPERIMENT.INPUTS.length = 0;
    experimentStructure.EXPERIMENT.INSTRUCTIONS.length = 0;
    substancelist.length = 0;
    operationList.length = 0;
    substances.length = 0;
    inputs.length = 0;
    outputs.length = 0;

    hideDiv('operationsMenu');
    hideDiv('forms');
    hideDiv('finishbutton');
    showDiv('newButton');
}



/**************************************************************************************

                    All structures of a complete experiment

 **************************************************************************************/

// structure for look up of input and id tied to the inputs operation
var inputList = {
    ID: "",
    NAME: "",
    OUTPUT: []
};


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
        }
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