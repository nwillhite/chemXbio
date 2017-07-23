/**************************************************************************************

                    Functions to create operations

 **************************************************************************************/


function createDetect() {

    var operation = JSON.parse(JSON.stringify(operationStructure));

    operation.OPERATION.NAME = document.getElementById('nameDetect').value;
    operation.OPERATION.ID = createID();
    operation.OPERATION.CLASSIFICATION = 'DETECT';

    //var input = JSON.parse(JSON.stringify(variableInput));
    //input.VARIABLE.NAME = document.getElementById('inputDetect').value;
    //operation.OPERATION.INPUTS.push(input);

    var tmpName = document.getElementById('inputDetect').value;
    inputVariable(operation, tmpName, '', '');

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

    //var input = JSON.parse(JSON.stringify(variableInput));
    //input.VARIABLE.NAME = document.getElementById('inputHeat').value;
    //operation.OPERATION.INPUTS.push(input);

    var tmpName = document.getElementById('inputHeat').value;
    inputVariable(operation, tmpName, '', '');


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


function createIncubate() {

    var operation = JSON.parse(JSON.stringify(operationStructure));

    operation.OPERATION.NAME = document.getElementById('nameIncubate').value;
    operation.OPERATION.ID = createID();
    operation.OPERATION.CLASSIFICATION = 'HEAT';

    //inputVariable(operation, document.getElementById('inputHeat').value);

    var input = JSON.parse(JSON.stringify(variableInput));
    input.VARIABLE.NAME = document.getElementById('inputIncubate').value;

    operation.OPERATION.INPUTS.push(input);

    inputTemperature(operation, document.getElementById('incubateTemp').value,
        document.getElementById('incubateTempSign').value);
    inputTime(operation, document.getElementById('incubateTime').value,
        document.getElementById('incubateDuration').value);

    if(document.getElementById('incubateRepeat').value === 'true') {

        var repeatOp = JSON.parse(JSON.stringify(operationStructure));

        repeatOp.OPERATION.NAME = 'REPEAT';
        repeatOp.OPERATION.ID = createID();
        repeatOp.OPERATION.CLASSIFICATION = 'CFG_LOOP';
        delete repeatOp.OPERATION.INPUTS;
        delete repeatOp.OPERATION.OUTPUTS;
        repeatOp.OPERATION.LOOP_NUMS = document.getElementById('incubateRepeatNum').value;
        repeatOp.OPERATION.OPERATIONS = [];

        repeatOp.OPERATION.OPERATIONS.push(operation);

        operationList.push(repeatOp);
        addOperation();
    }
    else {
        operationList.push(operation);
        addOperation();
    }

    resetForm('incubateForm');
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


function createSave() {

    var operation = JSON.parse(JSON.stringify(operationStructure));

    operation.OPERATION.NAME = document.getElementById('nameSave').value;
    operation.OPERATION.ID = createID();
    operation.OPERATION.CLASSIFICATION = 'OUTPUT';

    var input = JSON.parse(JSON.stringify(variableInput));
    input.VARIABLE.NAME = document.getElementById('inputSave').value;

    operation.OPERATION.INPUTS.push(input);

    operationList.push(operation);
    addOperation();

    resetForm('saveForm');
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

        var varOutput = JSON.parse(JSON.stringify(variableStructure));
        var tmpName = document.getElementById("splitOut" + i).value;

        varOutput.VARIABLE_DECLARATION.NAME = varOutput.VARIABLE_DECLARATION.ID = tmpName;

        varOutput.VARIABLE_DECLARATION.TYPE = 'VARIABLE';

        operation.OPERATION.OUTPUTS.push(varOutput);

        console.log(operation.OPERATION.OUTPUTS);

        //var tmpName = document.getElementById("splitOut" + i).value;
        //outputs.push(tmpName);
        //operation.OPERATION.OUTPUTS.push(operationOutput(operation, 'substance', tmpName));
    }
    //console.log(outputs);

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

        /*
        for (i = 0; i < operationList.length; i++) {

            var tmp = operationList[i].OPERATION.OUTPUTS.length;

            if (operationList[i].OPERATION.OUTPUTS.length === 1) {

                console.log(operationList[i].OPERATION.OUTPUTS[i].hasOwnProperty('VARIABLE_DECLARATION'));

                console.log(operationList[i].OPERATION.OUTPUTS[i].VARIABLE_DECLARATION);

            }
            else {

                for (j = 0; j < tmp; j++) {

                    console.log(operationList[i].OPERATION.OUTPUTS[j].VARIABLE_DECLARATION);
                }
            }
        } */
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