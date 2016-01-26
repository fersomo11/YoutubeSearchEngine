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
    
    
    $('#searchForm').submit(function(e){
        e.preventDefault();
    })
})

function search() {
    // Clear results
    $('#results').html('');
    $('#buttons').html('');
    
    // Get Form Input
    q = $('#query').val();
    
    // Run GET on API
    $.get(
        'https://www.googleapis.com/youtube/v3/search', {
            part: 'snippet, id',
            q: q,
            type: 'video',
            key: 'AIzaSyDNP_pqXAKc3f8snkzbJkE62UmRlGQIp8s'},
            function (data) {
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;

                console.log(data);

                $.each(data.items, function (i, item) {
                    var output = _getOutput(item);
                        
                        
                    // Display results
                    $('#results').append(output);
                });

                var buttons = _getButtons(prevPageToken, nextPageToken);
                
                $('#buttons').append(buttons);

            }
    );
}

// Pagination
function nextPage(){
    var token= $('#nextButton').data('token');
    var q= $('#nextButton').data('query');
    // Clear results
    $('#results').html('');
    $('#buttons').html('');
    
    // Get Form Input
    q = $('#query').val();
    
    // Run GET on API
    $.get(
        'https://www.googleapis.com/youtube/v3/search', {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: 'AIzaSyDNP_pqXAKc3f8snkzbJkE62UmRlGQIp8s'},
            function (data) {
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;

                console.log(data);

                $.each(data.items, function (i, item) {
                    var output = _getOutput(item);
                        
                        
                    // Display results
                    $('#results').append(output);
                });

                var buttons = _getButtons(prevPageToken, nextPageToken);
                
                $('#buttons').append(buttons);

            }
    );
}

function prevPage(){
    var token= $('#prevButton').data('token');
    var q= $('#prevButton').data('query');
    // Clear results
    $('#results').html('');
    $('#buttons').html('');
    
    // Get Form Input
    q = $('#query').val();
    
    // Run GET on API
    $.get(
        'https://www.googleapis.com/youtube/v3/search', {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: 'AIzaSyDNP_pqXAKc3f8snkzbJkE62UmRlGQIp8s'},
            function (data) {
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;

                console.log(data);

                $.each(data.items, function (i, item) {
                    var output = _getOutput(item);
                        
                        
                    // Display results
                    $('#results').append(output);
                });

                var buttons = _getButtons(prevPageToken, nextPageToken);
                
                $('#buttons').append(buttons);

            }
    );
}

function _getOutput(item) {
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.chanelTitle;
    var videoDate = item.snippet.publishedAt;

    // Output String
    var output = '<li>' +
        '<div class="list-left">' +
        '<img src="' + thumb + '">' +
        '</div>' +
        '<div class="list-right">' +
        '<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/' + videoId + '">' + title + '</a></h3>' +
        '<small>By <span class="cTitle">' + channelTitle + '</span> on ' + videoDate + '</small>' +
        '<p>' + description + '</p>' +
        '</div>' +
        '</li>' +
        '<div class="clearfix"></div>' +
        '';

    return output;
}

function _getButtons(prevPageToken, nextPageToken) {
    if (!prevPageToken) {
        var btnoutput = '<div class="buttonContainer">' +
            '<button id="nextButton" class="pagingButton" data-token="' + nextPageToken + '" data-query="' + q + '"' +
            ' onclick="nextPage();">Next Page</button></div>' +
            '';
    } else {
        var btnoutput = '<div class="buttonContainer">' +
            '<button id="prevButton" class="pagingButton" data-token="' + prevPageToken + '" data-query="' + q + '"' +
            ' onclick="prevPage();">Previous Page</button>' +
            '<button id="nextButton" class="pagingButton" data-token="' + nextPageToken + '" data-query="' + q + '"' +
            ' onclick="nextPage();">Next Page</button></div>' +
            '';
    }
    return btnoutput;
}


