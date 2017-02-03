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


function resetForm(formId)
{
  document.getElementById(formId).reset();
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


/**************************************************************************************

                    Functions to help make forms dynamically

 **************************************************************************************/


function formInput(num)
{
    var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var select = document.getElementById('numInputs');

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