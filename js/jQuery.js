/**************************************************************************************

                                Menu functions

 **************************************************************************************/


function toggle_visibility(id) {
    // hide all divs with class opMenu
    $('.opMenu').slideUp(1000);

    // closes forms upon leaving forms menu type
    var arr = $('#forms > div').map(function(){
        return this.id;
    }).get();

    for (var i = 0; i < arr.length; i++) {
        hideDiv(arr[i]);
    }

    // show the desired div
    if ($('#' + id).is(":hidden")) {
        $('#' + id).delay(100).slideDown(1000);
    }
    else {
        $('#' + id).delay(100).slideUp(1000);
    }
}

function toggle_form(id) {
    // hide all divs with class form
    $('.form').slideUp(1000);

    // show the desired div
    if ($('#' + id).is(":hidden")) {
        $('#' + id).delay(100).slideDown(1000);
    }
    else {
        $('#' + id).delay(100).slideUp(1000);
    }
}

/*

//substanceMenu open
$(document).ready(function(){
    $("#substanceHeading").click(function(){
        $("#substanceMenu").slideDown('slow');
    });
});

//substanceMenu close
$(document).ready(function(){
    $("#substanceClose").click(function(){
        $("#substanceMenu").slideUp('slow');
    });
});

*/