// After the HTML of the Application loads
$('document').ready(function(){

    // On Submitting the form
    $('form').submit(function(e){
    
        // Preventing the default behaviour
        e.preventDefault();

        $('#photos').html('');
        const submitButton = $('#submit');
        const searchField = $('#search');
        const searchQuery = searchField.val();

        // Disabling Searching Options
        searchField.prop("disabled",true);
        submitButton.attr("disabled", true).val("searching....");
        
        // Getting the Data from flickr Public Feed
        const flickrPublicFeed = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

        const config = {
            tags : searchQuery,
            format : "json"
        };

        const flickrCallback = function(data){
            let photoHTML = "";
            if(data.items.length > 0){
                $.each(data.items, function(i, photo){
                    photoHTML += `
                        <li class="grid-25 tablet-grid-50">
                            <a href="${photo.link}" class="image">
                                <img src="${photo.media.m}">
                            </a>
                        </li>
                    `;
                });
            }
            else{
                photoHTML = "<p>No photos found that match : " + searchQuery + ".</p>"
            }
            $('#photos').html(photoHTML);

            // Enabling Searching Options
            searchField.prop("disabled", false);
            submitButton.attr("disabled", false).val("Search");
        }
        $.getJSON(flickrPublicFeed, config, flickrCallback);
    });
});