/*
window.onload = function()
{
  document.getElementById('operationsMenu').style.visibility = 'hidden';
};
*/

function showDiv(id)
{
  document.getElementById(id).style.display = 'block';
};

function hideDiv(id)
{
  document.getElementById(id).style.display = 'none';
};

function resetForm(formId)
{
  document.getElementById(formId).reset();
};
