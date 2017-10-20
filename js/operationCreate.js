/**************************************************************************************

                        Functions to setup experiment

 **************************************************************************************/


function createExperiment() {

    var name = document.getElementById('experimentName').value;

    if (name === '') {
        alert("You input an invalid experiment name");
    }
    else {
        experimentStructure.EXPERIMENT.NAME = name;

        //var text = 'You have started an expriment named: ' + name;
        //text += " \n this is going to be a test";
        //document.getElementById('whereToPrint').innerHTML = text;

        if (benchtop.length === 0) {
            benchtop = benchTopStructure;

            //benchtop = JSON.parse(JSON.stringify(benchTopStructure));
        }

        if (experimentHolder.length === 0) {
            experimentHolder.push(experimentStructure);

            //experiment = JSON.parse(JSON.stringify(experimentStructure));
            //experimentStructure.EXPERIMENT.NAME = document.getElementById('experimentName').value;
            //experimentHolder.push(experiment);
        }

        toJson(experimentHolder);
        $('#startExperiment').slideUp(1000);
        showDiv('finishbutton');
        hideDiv('newButton');
        resetForm('startForm');
        $('#operationsMenu').delay(1000).slideDown(1000);
    }
}


// sets the bench top structures experiments to the contents of experimentHolder
function addExperiment() {
    benchTopStructure.BENCHTOP.EXPERIMENTS = experimentHolder;
}


// sets the experiment structure inputs to the contents of the substance list
function addSub() {
    experimentStructure.EXPERIMENT.INPUTS = substancelist;
}


// sets the experiment structure instructions to the contents of the operation list
function addOperation() {
    experimentStructure.EXPERIMENT.INSTRUCTIONS = operationList;

    /*
     if (experimentStructure.EXPERIMENT.INSTRUCTIONS != 0) {

     experimentStructure.EXPERIMENT.INSTRUCTIONS.length = 0;

     experimentStructure.EXPERIMENT.INSTRUCTIONS.push(operationList);
     }
     else {

     experimentStructure.EXPERIMENT.INSTRUCTIONS.push(operationList);

     }
     //experimentStructure.EXPERIMENT.INSTRUCTIONS = operationList; */
}


/**************************************************************************************

                        Functions to create operations

 **************************************************************************************/


// pulls the information from the detect form to populate the structures for JSON output
function createDetect() {
    var operation = JSON.parse(JSON.stringify(operationStructure));

    if (document.getElementById('nameDetect').value === '') {
        alert("You input an invalid Operation name");
    }
    else {
        operation.OPERATION.NAME = document.getElementById('nameDetect').value;
        var id = createID();
        operation.OPERATION.ID = id;
        operation.OPERATION.CLASSIFICATION = 'DETECT';


        var tmpName = document.getElementById('inputDetect').value;
        inputVariable(operation, tmpName, '', '');

        // used for removing of substance and operation that uses input
        var input = JSON.parse(JSON.stringify(inputList));
        input.ID = id;
        input.NAME = tmpName;
        inputs.push(input);

        for (var i = 0; i < outputHolder.length; i++)
        {
            console.log(outputHolder[i]);
            if (outputHolder[i].NAME === tmpName) {

                outputHolder[i].status = 'consumed';
                outputHolder[i].consumedID = id;
            }
        }

        operationOutput(operation, 'sensor', document.getElementById('detectOutputName').value);

        if (document.getElementById('detectRepeat').value === 'true') {

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
        showhidetoggle('detect_form');
        toJson(experimentHolder);
    }
}


// pulls the information from the heat form to populate the structures for JSON output
function createHeat() {
    var operation = JSON.parse(JSON.stringify(operationStructure));

    if (document.getElementById('nameHeat').value === '') {
        alert("You input an invalid Operation name");
    }
    else {
        operation.OPERATION.NAME = document.getElementById('nameHeat').value;
        var id = createID();
        operation.OPERATION.ID = id;
        operation.OPERATION.CLASSIFICATION = 'HEAT';


        var tmpName = document.getElementById('inputHeat').value;
        inputVariable(operation, tmpName, '', '');

        // used for removing of substance and operation that uses input
        var input = JSON.parse(JSON.stringify(inputList));
        input.ID = id;
        input.NAME = tmpName;
        inputs.push(input);

        for (var i = 0; i < outputHolder.length; i++)
        {
            console.log(outputHolder[i]);
            if (outputHolder[i].NAME === tmpName) {

                outputHolder[i].status = 'consumed';
                outputHolder[i].consumedID = id;
            }
        }

        inputTemperature(operation, document.getElementById('heatTemp').value,
            document.getElementById('heatTempSign').value);
        inputTime(operation, document.getElementById('heatTime').value,
            document.getElementById('heatDuration').value);

        if (document.getElementById('heatRepeat').value === 'true') {

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
        showhidetoggle('heat_form');
        toJson(experimentHolder);
    }
}


// pulls the information from the incubate form to populate the structures for JSON output
function createIncubate() {
    var operation = JSON.parse(JSON.stringify(operationStructure));

    if (document.getElementById('nameIncubate').value === '') {
        alert("You input an invalid Operation name");
    }
    else {
        operation.OPERATION.NAME = document.getElementById('nameIncubate').value;
        var id = createID();
        operation.OPERATION.ID = id;
        operation.OPERATION.CLASSIFICATION = 'HEAT';


        var tmpName = document.getElementById('inputIncubate').value;
        inputVariable(operation, tmpName, '', '');

        // used for removing of substance and operation that uses input
        var input = JSON.parse(JSON.stringify(inputList));
        input.ID = id;
        input.NAME = tmpName;
        inputs.push(input);

        for (var i = 0; i < outputHolder.length; i++)
        {
            console.log(outputHolder[i]);
            if (outputHolder[i].NAME === tmpName) {

                outputHolder[i].status = 'consumed';
                outputHolder[i].consumedID = id;
            }
        }

        inputTemperature(operation, document.getElementById('incubateTemp').value,
            document.getElementById('incubateTempSign').value);
        inputTime(operation, document.getElementById('incubateTime').value,
            document.getElementById('incubateDuration').value);

        if (document.getElementById('incubateRepeat').value === 'true') {

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
        showhidetoggle('incubate_form');
        toJson(experimentHolder);
    }
}


// pulls the information from the mix form to populate the structures for JSON output
function createMixture() {
    var operation = JSON.parse(JSON.stringify(operationStructure));

    if (document.getElementById('mixName').value === '' || document.getElementById('mixOutputName').value === '') {

        if (document.getElementById('mixName').value === '')
            alert("You input an invalid Operation name");
        else if (document.getElementById('mixOutputName').value === '')
            alert("You need to have a named output");
    }
    else {
        operation.OPERATION.NAME = document.getElementById('mixName').value;
        var id = createID();
        operation.OPERATION.ID = id;
        operation.OPERATION.CLASSIFICATION = 'MIX';

        var num = document.getElementById('mixInputAmount').value;


        for (i = 0; i < num; i++) {

            var tmpName = document.getElementById("input" + i).value;
            var tmpVol = document.getElementById("inputvolume" + i).value;
            var tmpUnit = document.getElementById("inputvolumeUnits" + i).value;

            inputVariable(operation, tmpName, tmpVol, tmpUnit);

            for (var j = 0; j < outputHolder.length; j++)
            {
                console.log(outputHolder[j]);
                if (outputHolder[j].NAME === tmpName) {

                    outputHolder[j].status = 'consumed';
                    outputHolder[j].consumedID = id;
                }
            }

            // used for removing of substance and operation that uses input
            var input = JSON.parse(JSON.stringify(inputList));
            input.ID = id;
            input.NAME = tmpName;
            input.OUTPUT = document.getElementById('mixOutputName').value;
            inputs.push(input);
        }

        console.log(inputs);

        inputTemperature(operation, document.getElementById('mixTemp').value,
            document.getElementById('mixTempSign').value);

        inputTime(operation, document.getElementById('mixTime').value,
            document.getElementById('mixDuration').value);

        operationOutput(operation, 'substance',
            document.getElementById('mixOutputName').value);

        // used for tracking outputs of operation
        var output = JSON.parse(JSON.stringify(outputList));
        output.createID = id;
        output.NAME = document.getElementById('mixOutputName').value;
        output.status = 'usable';
        outputHolder.push(output);

        operationList.push(operation);
        addOperation();

        /*
        if (document.getElementById('mixRepeat').value === 'true') {

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
        */

        resetForm('mixForm');
        mixInputCreate();
        showhidetoggle('mixtureform');
        toJson(experimentHolder);
    }
}


// pulls the information from the save form to populate the structures for JSON output
function createSave() {
    var operation = JSON.parse(JSON.stringify(operationStructure));

    if (document.getElementById('nameSave').value === '') {
        alert("You input an invalid Operation name");
    }
    else {
        operation.OPERATION.NAME = document.getElementById('nameSave').value;
        var id = createID();
        operation.OPERATION.ID = id;
        operation.OPERATION.CLASSIFICATION = 'OUTPUT';


        var tmpName = document.getElementById('inputSave').value;
        inputVariable(operation, tmpName, '', '');

        // used for removing of substance and operation that uses input
        var input = JSON.parse(JSON.stringify(inputList));
        input.ID = id;
        input.NAME = tmpName;
        inputs.push(input);

        for (var i = 0; i < outputHolder.length; i++)
        {
            if (outputHolder[i].NAME === tmpName) {

                outputHolder[i].status = 'consumed';
                outputHolder[i].consumedID = id;
            }
        }

        operationList.push(operation);
        addOperation();

        resetForm('saveForm');
        showhidetoggle('save_form');
        toJson(experimentHolder);
    }
}


// pulls the information from the split form to populate the structures for JSON output
function createSplit() {
    var operation = JSON.parse(JSON.stringify(operationStructure));

    if (document.getElementById('nameSplit').value === '') {
        alert("You input an invalid Operation name");
    }
    else {
        operation.OPERATION.NAME = document.getElementById('nameSplit').value;
        var id = createID();
        operation.OPERATION.ID = id;
        operation.OPERATION.CLASSIFICATION = 'Split';

        var num = document.getElementById('splitAmount').value;

        var tmpName = document.getElementById("inputSplit").value;
        inputVariable(operation, tmpName, '', '');

        // used for removing of substance and operation that uses input
        var input = JSON.parse(JSON.stringify(inputList));
        input.ID = id;
        input.NAME = tmpName;
        inputs.push(input);

        for (var i = 0; i < outputHolder.length; i++)
        {
            if (outputHolder[i].NAME === tmpName) {

                outputHolder[i].status = 'consumed';
                outputHolder[i].consumedID = id;
            }
        }

        for (i = 0; i < num; i++) {

            var varOutput = JSON.parse(JSON.stringify(variableStructure));
            var outName = document.getElementById("splitOut" + i).value;

            varOutput.VARIABLE_DECLARATION.NAME = varOutput.VARIABLE_DECLARATION.ID = outName;

            varOutput.VARIABLE_DECLARATION.TYPE = 'VARIABLE';

            operation.OPERATION.OUTPUTS.push(varOutput);

            console.log(operation.OPERATION.OUTPUTS);


            // used for tracking outputs of operation
            var output = JSON.parse(JSON.stringify(outputList));
            output.createID = id;
            output.NAME = document.getElementById('splitOut' + i).value;
            output.status = 'usable';
            outputHolder.push(output);

            //var tmpName = document.getElementById("splitOut" + i).value;
            //outputs.push(tmpName);
            //operation.OPERATION.OUTPUTS.push(operationOutput(operation, 'substance', tmpName));
        }

        if (document.getElementById('splitRepeat').value === 'true') {

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
        splitOutputCreate();
        showhidetoggle('split_form');
        toJson(experimentHolder);
    }
}


// pulls the information from the store form to populate the structures for JSON output
function createStore() {
    var operation = JSON.parse(JSON.stringify(operationStructure));

    if (document.getElementById('nameStore').value === '') {
        alert("You input an invalid Operation name");
    }
    else {
        operation.OPERATION.NAME = document.getElementById('nameStore').value;
        var id = createID();
        operation.OPERATION.ID = id;
        operation.OPERATION.CLASSIFICATION = 'STORAGE';


        var tmpName = document.getElementById('inputStore').value;
        inputVariable(operation, tmpName, '', '');

        // used for removing of substance and operation that uses input
        var input = JSON.parse(JSON.stringify(inputList));
        input.ID = id;
        input.NAME = tmpName;
        inputs.push(input);

        for (var i = 0; i < outputHolder.length; i++)
        {
            console.log(outputHolder[i]);
            if (outputHolder[i].NAME === tmpName) {

                outputHolder[i].status = 'consumed';
                outputHolder[i].consumedID = id;
            }
        }

        inputTemperature(operation, document.getElementById('storeTemp').value,
            document.getElementById('storeTempSign').value);

        inputTime(operation, document.getElementById('storeTime').value,
            document.getElementById('storeDuration').value);

        operationList.push(operation);
        addOperation();

        resetForm('storeForm');
        showhidetoggle('store_form');
        toJson(experimentHolder);
    }
}