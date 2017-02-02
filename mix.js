/*
var mix = new Object();

mix.name = "testing";
mix.inputOne = "";
mix.inputTwo = "";
mix.tempature = "";
mix.duration = "";

function mix(name, input1, input2, temp, time)
{
  this.name = name;
  this.inputOne = input1;
  this.inputTwo = input2;
  this.duration = time;
};

*/



// holder for all experiment operations
var experimentHolder = [];



// Structure for mix operation
var mix = {
  mixName : "Mix1",
  mixSubstances : "",
  mixInput2 : "Blood",
  mixTemp : "100 degrees",
  mixDuration : "10 mins"

};


//dynamically handles the input fields for mixing operations
window.inputCreate = function()
{
    var num = document.getElementById('numInputs').value;
    var container = document.getElementById('inputMix');

    while (container.hasChildNodes())
    {
        container.removeChild(container.lastChild);
    }

    for (i = 0; i < num; i++)
    {
        // creates the input entries based on number selected with # of inputs
        container.appendChild(document.createTextNode("Input " + (i + 1) + ": "));
        var inputs = document.createElement("input");
        inputs.type = "text";
        inputs.id = "input" + i;
        container.appendChild(inputs);

        // creates the volume entries based on number selected with # of inputs
        container.appendChild((document.createTextNode(" Volume: " )));
        var volume = document.createElement("input");
        volume.type = "text";
        volume.id = "inputvolume" + i;
        container.appendChild(volume);

        // creates the selection entries based on number selected with # of inputs
        container.appendChild((document.createTextNode(" Units: " )));
        var volumeUnits = document.createElement("select");
        volumeUnits.id = "inputvolumeUnits" + i;
        container.appendChild(volumeUnits);

        // creates the options for the selection entries
        var units = ["mL", "\u00B5L", "pL", "nL", "L"];

        var option = document.createElement("option");
        var option1 = document.createElement("option");
        var option2 = document.createElement("option");
        var option3 = document.createElement("option");
        var option4 = document.createElement("option");

        volumeUnits.appendChild(option);
        option.innerHTML = units[0];
        option.value = "ML";
        volumeUnits.appendChild(option1);
        option1.text = units[1];
        option1.value = "UL";
        volumeUnits.appendChild(option2);
        option2.text = units[2];
        option2.value = "PL";
        volumeUnits.appendChild(option3);
        option3.text = units[3];
        option3.value = "NL";
        volumeUnits.appendChild(option4);
        option4.text = units[4];
        option4.value = "LITRE";

        container.appendChild(document.createElement("br"));
    }
};


var sublist = [];

var Substance = {
    VARIABLE_DECLARATION : {
        ID : "",
        NAME : "",
        TYPE : "CHEMICAL"
    }
};


var experiment = {
    NAME : "",
    INPUTS : [],
    INSTRUCTIONS: []
};


var optList = []

var operation = {
    NAME : "",
    ID : "",
    CLASSIFICATION : "",
    INPUTS : [],
    OUTPUTS : []
};


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


var Compound = {
    CHEMICAL: {
        NAME: "",
        VOLUME: {
            VALUE: "",
            UNITS: ""
        },
    }
};


var Variable = {
    INPUT_TYPE : "VARIABLE",
    VARIABLE : {
        NAME: "blood",
        VOLUME : {
            VALUE: "",
            UNITS: ""
        },
    }
};


var PropertyTemp = {
    INPUT_TYPE : "PROPERTY",
    TEMPERATURE : {
        VALUE : "",
        UNITS : "",
    }
};


var PropertyTime = {
    INPUT_TYPE : "PROPERTY",
    TIME : {
        VALUE : "",
        UNITS : "",
    }
};


function inputSub (name) {

    var tmpSub = JSON.parse(JSON.stringify(Substance));

    tmpSub.VARIABLE_DECLARATION.ID = tmpSub.VARIABLE_DECLARATION.NAME = name;

    sublist.push(tmpSub);

    resetForm('subForm')
}


function inputVar (obj, tmpname, tmpVal, tmpUnit) {

    var input = JSON.parse(JSON.stringify(Variable));

    input.VARIABLE.NAME = tmpname;

    if (tmpVal === undefined && tmpUnit === undefined)
    {
        delete input.VARIABLE.VOLUME;
    }
    else
    {
        input.VARIABLE.VOLUME.VALUE = tmpVal;
        input.VARIABLE.VOLUME.UNITS = tmpUnit;
    }

    obj.INPUTS.push(input);

}


function inputTemperature (obj, tmpVal, tmpUnit) {

    var tmp = JSON.parse(JSON.stringify(PropertyTemp));

    if(tmpVal === '' && tmpUnit === '')
    {
        delete tmp.INPUT_TYPE;
        delete tmp.TEMPERATURE;
    }
    else
    {
        tmp.TEMPERATURE.VALUE = tmpVal;
        tmp.TEMPERATURE.UNITS = tmpUnit;
        obj.INPUTS.push(tmp);
    }

}


function inputTime (obj, tmpVal, tmpUnit) {

    var time = JSON.parse(JSON.stringify(PropertyTime));

    if(tmpVal === '' && tmpUnit === '')
    {
        delete time.INPUT_TYPE;
        delete time.TIME;
    }
    else
    {
        time.TIME.VALUE = tmpVal;
        time.TIME.UNITS = tmpUnit;
        obj.INPUTS.push(time);
    }

}