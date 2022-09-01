var announcementEl = $('storage-announcement'); //small element to be dynamically altered. It announces something has been saved into local storage and then erases the message so the user can tell their schedule has been saved

// Function that gets rid of the "saved into local storage" announcement with the use of jQuery syntax
var timeLeft = 4;
function clearAnnouncement () {
    var announcementInterval = setInterval(function() {
        timeLeft--;
        if(timeLeft === 0) {
            $('#storage-announcement').text('')
            clearInterval(announcementInterval)
            timeLeft = 4;
        }

    }, 1000)
}

$(document).ready(function () { // The ready method occurs when the DOM has been loaded, so it happens after HTML/CSS/Bootstrap is loaded up
    // This is so the colors load correctly



    function headerClock() {

        setInterval(function() {
            
            $('#current-day').text(moment().format("dddd MMMM Do YYYY, h:mm:s A")); //Moment use as per readme requirements
        }, 100)
    }

    //jQuery version of 'addEventListener' and a function to attach to the save buttons
    $('.saveBtn').on('click', function() {
        // Sets the text in the text area into the variable 'text'
        var text = $(this).siblings('.description').val();

        // sets the 'hour8' etc id into the variable 'time'
        var time = $(this).parent().attr('id');
        
        
        //Throw the previous values into local storage and announces that they have been saved
        localStorage.setItem(time, text);
        $('#storage-announcement').text('Saved to Local Storage ✅')
        clearAnnouncement();
   
    })

    //Load saved data from local storage into the text area with jQuery syntax
    $('#hour8 .description').val(localStorage.getItem('hour8'));

    $('#hour9 .description').val(localStorage.getItem('hour9'));

    $('#hour10 .description').val(localStorage.getItem('hour10'));

    $('#hour11 .description').val(localStorage.getItem('hour11'));

    $('#hour12 .description').val(localStorage.getItem('hour12'));

    $('#hour13 .description').val(localStorage.getItem('hour13'));

    $('#hour14 .description').val(localStorage.getItem('hour14'));

    $('#hour15 .description').val(localStorage.getItem('hour15'));

    $('#hour16 .description').val(localStorage.getItem('hour16'));

    $('#hour17 .description').val(localStorage.getItem('hour17'));

    function trackHours () {

        // Saves the current hour into a variable, which will be compared to the hard coded time blocks. These if statements will determine the background color of the calender
        var currentTime = moment().hour();

        //iterates over time blocks

        $('.time-block').each(function () {
            //use of the .split function from week 4 activity 10 to divide the id of 'hour8' etc to 'hour' and '8', the if statements compare the split number against the number provided by the currentTime variable
            var hourBlock = parseInt($(this).attr('id').split('hour')[1]);

            if (hourBlock < currentTime) {

                $(this).removeClass('present'); //red

                $(this).removeClass('future'); //green

                $(this).addClass('past'); // gray

            } else if (hourBlock === currentTime) {
             
                $(this).removeClass('past');

                $(this).removeClass('future');

                $(this).addClass('present');

            } else {

                $(this).removeClass('present');

                $(this).removeClass('past');

                $(this).addClass('future');

            }
        })
    }

    trackHours();
    headerClock();

})