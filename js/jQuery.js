/**************************************************************************************

                                Menu functions

 **************************************************************************************/

/*
$(document).ready(function(){
    $('.heading').click(function(){
        var id = $(this).attr("id");
        $(".opMenu").slideUp('slow');
        $("#" + id).show();
    });
});
*/


function toggle_visibility(id) {
    // hide all divs with class opMenu
    $('.opMenu').slideUp(500);

    // show the desired div
    if ($('#' + id).is(":hidden")) {
        $('#' + id).slideDown(1000);
    }
    else {
        $('#' + id).slideUp(1000);
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