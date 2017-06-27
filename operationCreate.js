/**************************************************************************************

                    Functions to create operations

 **************************************************************************************/


function createDetect() {

    var operation = JSON.parse(JSON.stringify(operationStructure));

    operation.OPERATION.NAME = document.getElementById('nameDetect').value;
    operation.OPERATION.ID = createID();
    operation.OPERATION.CLASSIFICATION = 'DETECT';


    var input = JSON.parse(JSON.stringify(variableInput));
    input.VARIABLE.NAME = document.getElementById('inputDetect').value;

    operation.OPERATION.INPUTS.push(input);
    operationOutput(operation, 'sensor', document.getElementById('detectOutputName').value);


    if(document.getElementById('detectRepeat').value === 'true') {

        var repeatOp = JSON.parse(JSON.stringify(operationStructure));

        repeatOp.OPERATION.NAME = 'REPEAT';
        repeatOp.OPERATION.ID = createID();
        repeatOp.OPERATION.CLASSIFICATION = 'CFG_LOOP';
        delete repeatOp.OPERATION.INPUTS;
        delete repeatOp.OPERATION.OUTPUTS;
        repeatOp.OPERATION.LOOP_NUMS = document.getElementById('detectRepeatNum').value;
        repeatOp.OPERATION.OPERATIONS = [];

        repeatOp.OPERATION.OPERATIONS.push(operation);

        operationList.push(repeatOp);
        addOperation();
    }
    else {
        operationList.push(operation);
        addOperation();
    }

    resetForm('detectForm');

}


function createHeat() {

    var operation = JSON.parse(JSON.stringify(operationStructure));

    operation.OPERATION.NAME = document.getElementById('nameHeat').value;
    operation.OPERATION.ID = createID();
    operation.OPERATION.CLASSIFICATION = 'HEAT';

    //inputVariable(operation, document.getElementById('inputHeat').value);

    var input = JSON.parse(JSON.stringify(variableInput));
    input.VARIABLE.NAME = document.getElementById('inputHeat').value;

    operation.OPERATION.INPUTS.push(input);

    inputTemperature(operation, document.getElementById('heatTemp').value,
        document.getElementById('heatTempSign').value);
    inputTime(operation, document.getElementById('heatTime').value,
        document.getElementById('heatDuration').value);

    if(document.getElementById('heatRepeat').value === 'true') {

        var repeatOp = JSON.parse(JSON.stringify(operationStructure));

        repeatOp.OPERATION.NAME = 'REPEAT';
        repeatOp.OPERATION.ID = createID();
        repeatOp.OPERATION.CLASSIFICATION = 'CFG_LOOP';
        delete repeatOp.OPERATION.INPUTS;
        delete repeatOp.OPERATION.OUTPUTS;
        repeatOp.OPERATION.LOOP_NUMS = document.getElementById('heatRepeatNum').value;
        repeatOp.OPERATION.OPERATIONS = [];

        repeatOp.OPERATION.OPERATIONS.push(operation);

        operationList.push(repeatOp);
        addOperation();
    }
    else {
        operationList.push(operation);
        addOperation();
    }

    resetForm('heatForm');

}


function createMixture() {

    //var repeat = document.getElementById('mixRepeat').value;
    //console.log(document.getElementById('mixRepeat').value);

    var operation = JSON.parse(JSON.stringify(operationStructure));

    operation.OPERATION.NAME = document.getElementById('mixName').value;
    operation.OPERATION.ID = createID();
    operation.OPERATION.CLASSIFICATION = 'MIX';

    var num = document.getElementById('mixInputAmount').value;

    for (i = 0; i < num; i++) {

        var tmpName = document.getElementById("input" + i).value;
        console.log(tmpName);
        var tmpVol = document.getElementById("inputvolume" + i).value;
        console.log(tmpVol);
        var tmpUnit = document.getElementById("inputvolumeUnits" + i).value;
        console.log(tmpUnit);

        inputVariable(operation, tmpName, tmpVol, tmpUnit);
    }

    inputTemperature(operation, document.getElementById('mixTemp').value,
        document.getElementById('mixTempSign').value);

    inputTime(operation, document.getElementById('mixTime').value,
        document.getElementById('mixDuration').value);

    operationOutput(operation, 'substance',
        document.getElementById('mixOutputName').value);

    if(document.getElementById('mixRepeat').value === 'true') {

        var repeatOp = JSON.parse(JSON.stringify(operationStructure));

        repeatOp.OPERATION.NAME = 'REPEAT';
        repeatOp.OPERATION.ID = createID();
        repeatOp.OPERATION.CLASSIFICATION = 'CFG_LOOP';
        delete repeatOp.OPERATION.INPUTS;
        delete repeatOp.OPERATION.OUTPUTS;
        repeatOp.OPERATION.LOOP_NUMS = document.getElementById('mixRepeatNum').value;
        repeatOp.OPERATION.OPERATIONS = [];

        repeatOp.OPERATION.OPERATIONS.push(operation);

        operationList.push(repeatOp);
        addOperation();
    }
    else {
        operationList.push(operation);
        addOperation();
    }

    resetForm('mixForm');
    inputCreate();

}


function createOutput() {

    var operation = JSON.parse(JSON.stringify(operationStructure));

    operation.OPERATION.NAME = document.getElementById('nameOutput').value;
    operation.OPERATION.ID = createID();
    operation.OPERATION.CLASSIFICATION = 'OUTPUT';

    var input = JSON.parse(JSON.stringify(variableInput));
    input.VARIABLE.NAME = document.getElementById('inputOutput').value;

    operation.OPERATION.INPUTS.push(input);

    operationList.push(operation);

    resetForm('outputForm');

}


function createSplit() {

    var operation = JSON.parse(JSON.stringify(operationStructure));

    operation.OPERATION.NAME = document.getElementById('nameSplit').value;
    operation.OPERATION.ID = createID();
    operation.OPERATION.CLASSIFICATION = 'Split';

    var num = document.getElementById('splitAmount').value;
    var tmpIn = document.getElementById("inputSplit").value;
    inputVariable(operation, tmpIn, '', '');

    for (i = 0; i < num; i++) {

        var tmpName = document.getElementById("splitOut" + i).value;
        operationOutput(operation, 'substance', tmpName);
    }
    
    if(document.getElementById('splitRepeat').value === 'true') {

        var repeatOp = JSON.parse(JSON.stringify(operationStructure));

        repeatOp.OPERATION.NAME = 'REPEAT';
        repeatOp.OPERATION.ID = createID();
        repeatOp.OPERATION.CLASSIFICATION = 'CFG_LOOP';
        delete repeatOp.OPERATION.INPUTS;
        delete repeatOp.OPERATION.OUTPUTS;
        repeatOp.OPERATION.LOOP_NUMS = document.getElementById('splitRepeatNum').value;
        repeatOp.OPERATION.OPERATIONS = [];

        repeatOp.OPERATION.OPERATIONS.push(operation);

        operationList.push(repeatOp);
        addOperation();
    }
    else {
        operationList.push(operation);
        addOperation();
    }

    resetForm('splitForm');
    outputCreate();

}


function createStore() {
    var operation = JSON.parse(JSON.stringify(operationStructure));

    operation.OPERATION.NAME = document.getElementById('nameStore').value;
    operation.OPERATION.ID = createID();
    operation.OPERATION.CLASSIFICATION = 'STORAGE';

    var input = JSON.parse(JSON.stringify(variableInput));
    input.VARIABLE.NAME = document.getElementById('inputStore').value;

    operation.OPERATION.INPUTS.push(input);

    inputTemperature(operation, document.getElementById('storeTemp').value,
        document.getElementById('storeTempSign').value);

    inputTime(operation, document.getElementById('storeTime').value,
        document.getElementById('storeDuration').value);

    operationList.push(operation);

    resetForm('storeForm');
}