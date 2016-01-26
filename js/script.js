// Searchbar Handler
$(function () {
    var searchField = $('#query');
    var icon = $('#searchButton');
    
    // Focus Event
    $(searchField).on('focus', function () {
        $(this).animate({
            width: '100%'
        }, 400);
        $(icon).animate({
            right: '10px'
        }, 400)
    });
    
    // Blur Event
    $(searchField).on('blur', function () {
        if (searchField.val() == '') {
            $(searchField).animate({
                width: '50%'
            }, 400, function () { });
            $(icon).animate({
                right: '325px'
            }, 400, function () { });
        }
    });
}) 