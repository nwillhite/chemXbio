/**************************************************************************************

                                All helper functions

 **************************************************************************************/

function download(text, name, type) {
    var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}


function showDiv(id) {
    document.getElementById(id).style.display = 'inline';
}


function hideDiv(id) {
    document.getElementById(id).style.display = 'none';
}

function showDivBlock(id) {
    document.getElementById(id).style.display = 'block';
}

function showhidetoggle(id) {
    var tmp = document.getElementById(id);

    if (tmp.style.display === 'none') {
        tmp.style.display = 'block';
    }
    else {
        tmp.style.display = 'none';
    }
}


// updates JSON output to the 'whereToPrint' which is the right side
function toJson(input) {
    document.getElementById('whereToPrint').innerHTML = JSON.stringify(input, null, 2);
    document.getElementById('whereToPrint').scrollIntoView(false);
}


// randomly generates number for operation id
function createID() {
    return Math.floor((Math.random() * 1000000000) + 1);
}


function resetForm(formId) {
    document.getElementById(formId).reset();
}

// allows to remove operation once they've been added
function removeOperation() {
    var toRemove = document.getElementById('').value;

    for(var i = 0; i < operationList.length; i++) {

        if(operationList[i].OPERATION.NAME === toRemove) {
            operationList.splice(i, 1);
        }
    }
}


function updateList() {
    substanceRemove();

    if (substances.length != 0) {
        document.getElementById('activeSubstanceDisplay').innerHTML = "Active substances : " + substances;
    }
    else {
        document.getElementById('activeSubstanceDisplay').innerHTML = '';
    }

    //document.getElementById('substanceDisplay').innerHTML = JSON.stringify(substances, null, 2);
    toJson(experimentHolder);
    update();
}


function update() {
    formInput();
    var tempOpList = ['inputSplit', 'inputSave', 'inputDetect', 'inputStore', 'inputHeat'];

    for (var i = 0; i < tempOpList.length; i++) {
        operationInput(i);
    }
}