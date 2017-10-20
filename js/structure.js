/**************************************************************************************

                Containers for holding all aspects of experiment creation

 **************************************************************************************/

// holder for the BenchTop
var benchtop = [];

// holder for the Experiment
var experimentHolder = [];

//holder for all variableStructure for user defined substances, used for JSON output
var substancelist = [];

//holder for all operations instances created by the user
var operationList = [];

// holds defined substance to help populate selection for drop downs
var substances = [];

// holder for substances instances used as input for operations, holds inputList structures
var inputs = [];

// holder for outputs instances of operations
// used for tracking output usage as inputs, holds outputList structures
var outputHolder = [];

// helper function to clear experiment until a better way can be found
function resetExperiment() {
    document.body.scrollTop = 0;
    location.reload();
}

function finish() {
    // add experiment to benchtop and prints out the benchtop JSON
    addExperiment();
    toJson(benchtop);

    document.getElementById('activeSubstanceDisplay').innerHTML = "";
    document.body.scrollTop = 0;
    hideDiv('finishbutton');
    showDiv('newButton');

    // used for operation menu
    hideDiv('operationsMenu');
    toggle_visibility();

    // used to hide open forms and reset any that might have had info in at time of hitting finish
    toggle_form();
    $('form').trigger("reset");

    // resets all holders of experiment components
    benchtop.length = 0;
    experimentHolder.length = 0;
    experimentStructure.EXPERIMENT.NAME = "";
    experimentStructure.EXPERIMENT.INPUTS.length = 0;
    experimentStructure.EXPERIMENT.INSTRUCTIONS.length = 0;
    substancelist.length = 0;
    operationList.length = 0;
    substances.length = 0;
    inputs.length = 0;
    outputHolder.length = 0;
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

var outputList = {
    createID: "",
    NAME: "",
    status: "",
    consumedID: ""
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