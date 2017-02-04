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
  document.getElementById('whereToPrint').innerHTML = JSON.stringify(input, null, 4);
}


function createID()
{
    var tmpId = Math.floor((Math.random() * 1000000000) + 1);
    return tmpId
}

function resetForm(formId)
{
    document.getElementById(formId).reset();
}


function removeSubstance() {

    var toRemove = document.getElementById('removesubstanceName').value;
    var index = substances.indexOf(toRemove);
    substances.splice(index,1);
    formRemove(); // temp fix ----- make function to update all forms that use substances
}


/**************************************************************************************

                    Functions to help make forms dynamic

 **************************************************************************************/


function formInput(num)
{
    var select = document.getElementById('numInputs');

    // handles if the number is changed to a lower number than was previously selected
    while (select.hasChildNodes())
    {
        select.removeChild(select.lastChild);
    }

    var tmp = num + 1;
    console.log(tmp);

    for(var i = 0; i < tmp; i++)
    {
        var option = document.createElement('option');
        option.innerHTML = i;
        option.value = i;
        select.appendChild(option);
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