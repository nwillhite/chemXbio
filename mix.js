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


/*
    holder for all experiment operations
*/
var experimentHolder = [];


/*
    Structure for mix operation
*/
var mix = {
  mixName : "Mix1",
  mixSubstances : "",
  mixInput2 : "Blood",
  mixTemp : "100 degrees",
  mixDuration : "10 mins"

};


/*
    dynamically handles the input fields for mixing operations
*/
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
        container.appendChild(document.createTextNode("Input " + (i + 1) + ": "));
        var inputs = document.createElement("input");
        inputs.type = "text";
        inputs.id = "input" + i;
        container.appendChild(inputs);
        container.appendChild(document.createElement("br"));
    }
};