/*
window.onload = function()
{
  document.getElementById('operationsMenu').style.visibility = 'hidden';
};
*/

function showDiv(id)
{
  document.getElementById(id).style.display = 'block';
}


function hideDiv(id)
{
  document.getElementById(id).style.display = 'none';
}


function showhidetoggle(id)
{
  var tmp = document.getElementById(id);
  if (tmp.style.display === 'none')
  {
    tmp.style.display = 'block';
  }
  else
  {
    tmp.style.display = 'none';
  }

}


function toJson(input)
{
  document.getElementById('whereToPrint').innerHTML = JSON.stringify(input, null, 2);
}


function createID()
{
    return Math.floor((Math.random() * 1000000000) + 1);
}


function resetForm(formId)
{
    document.getElementById(formId).reset();
}


function removeSubstance() {
    var toRemove = document.getElementById('removesubstanceName').value;
    var index = substances.indexOf(toRemove);

    console.log(toRemove);

    for(var i = 0; i < substancelist.length; i++)
    {
        if(substancelist[i].VARIABLE_DECLARATION.NAME === toRemove)
        {
            substancelist.splice(i, 1);
        }
    }
    substances.splice(index,1);
    update();
}


/**************************************************************************************

                    Functions to help make forms dynamic

 **************************************************************************************/

// function controls the number of inputs for setting inputs into operations
function formInput()
{
    var container = document.getElementById('numInputs');

    // handles if the number is changed to a lower number than was previously selected
    while (container.hasChildNodes())
    {
        container.removeChild(container.lastChild);
    }
    var tmp = substances.length;
    tmp += 1;
    console.log(tmp);

    for(var i = 0; i < tmp; i++)
    {
        var option = document.createElement('option');
        option.innerHTML = i;
        option.value = i;
        container.appendChild(option);
    }
}

function formTemperature(form)
{
    var sign = ['\u2103', '\u2109', '\u212A'];
    var signValue = ['CELSIUS', 'FAHRENHEIT', 'KELVIN'];
    var select = document.getElementById(form);

    for(var i = 0; i < sign.length; i++)
    {
        var option = document.createElement('option');
        option.innerHTML = sign[i];
        option.value = signValue[i];
        select.appendChild(option);
    }
}

function formTime(form)
{
    var display = ['Second(s)', 'Minute(s)', 'Hour(s)', 'Day(s)'];
    var displayValue = ['SECOND', 'MINUTE', 'HOUR', 'DAY'];
    var select = document.getElementById(form);

    for(var i = 0; i < display.length; i++)
    {
        var option = document.createElement('option');
        option.innerHTML = display[i];
        option.value = displayValue[i];
        select.appendChild(option);
    }
}

// populates the Substance removal drop down
function formRemove() {

    var tmp = substances.length;

    var container = document.getElementById('removesubstanceName');

    // handles if the number is changed to a lower number than was previously selected
    while (container.hasChildNodes())
    {
        container.removeChild(container.lastChild);
    }

    for (var i = 0; i < tmp; i++)
    {
        var option = document.createElement('option');
        option.innerHTML = substances[i];
        option.value = substances[i];
        container.appendChild(option);
    }

}

function update() {
    formInput();
    formRemove();
    document.getElementById('substancedisplay').innerHTML = " " + substances;
}