/**
 * This file holds the core functionality for the lightbox plugin
 */
(function($) {
	
	$.fn.myLightbox = function() {

		// Global variables for the function
		var current,
			size;
	  
		// Lightbox function
		$('a.lightbox').click(function(e) {

			// prevent default click event
    		e.preventDefault(); // http://api.jquery.com/event.preventDefault/

    		// store href from clicked element
    		var image_href = $(this).attr("href");

    		// determine the index of clicked trigger
    		var slideNum = $('a.lightbox').index(this);

    		// find out if #lightbox exists
		    if ($('#lightbox').length > 0) {        
		      // if #lightbox exists, fadeIn to replace current
		      $('#lightbox')
		      	.fadeIn(300);
		    } else {    
		      // if no #lightbox exists - create and insert               
		      // (runs 1st time only)
		      var lightbox =
		          '<div id="lightbox">' +
			          '<p>Click to close</p>' +
			          '<div id="slideshow">' +
			          	'<div id="slideshow-images"></div>' +
				          '<div class="nav">' +
				          	  '<a href="#prev" class="prev slide-nav">prev</a>' +
					          '<a href="#next" class="next slide-nav">next</a>' +
				          '</div>' +
			          '</div>' +
		          '</div>';

		      // insert lightbox HTML into page
		      $('body').append(lightbox);

		      // fill lightbox with a.lightbox hrefs in #gallery
		      $('#gallery').find('a.lightbox').each(function() {
		        var $href = $(this).attr('href');
		        $('#slideshow-images').append('<img src="' + $href + '">' );
		      });

		    }

		    // setting size based on number of objects in slideshow
    		size = $('#slideshow-images img').length;

		    // hide all slide, then show the selected slide
		    $('#slideshow-images img').hide();
		    $('#slideshow-images img:eq(' + slideNum + ')').show();

		    // set current to selected slide
    		current = slideNum;

    		// Add functionality for closing the lightbox
		     $('body').on('click', '#lightbox', function() { 
		     	// Close with mouseclick
    			$('#lightbox').fadeOut(300);
  			});

		     $(document).keyup(function(e){
		     	// Close with esc key
			    if(e.which == 27){
			        $('#lightbox').fadeOut(300);
			    }
			});

    	}); // End of lightbox function

		// show/hide navigation when hovering over #slideshow
		$('body').on(
		{ mouseenter: function() {
		  $('.nav').fadeIn(300)
		}, mouseleave: function() {
		  $('.nav').fadeOut(300);
		}
		},'#slideshow');

		// navigation prev/next
		$('body').on('click', '.slide-nav', function(e) {

			// prevent default click event, and prevent event bubbling to prevent lightbox from closing
			e.preventDefault();
			e.stopPropagation();

			var $this = $(this);
			var dest;

			// looking for .prev
			if ($this.hasClass('prev')) {
			  dest = current - 1;
			  if (dest < 0) {
			    dest = size - 1;
			  }
			} else {
			  // in absence of .prev, assume .next
			  dest = current + 1;
			  if (dest > size - 1) {
			    dest = 0;
			  }
			}

			// fadeOut curent slide, FadeIn next/prev slide
			$('#slideshow-images img:eq(' + current + ')').fadeOut(750);
			$('#slideshow-images img:eq(' + dest + ')').fadeIn(750);

			// update current slide
			current = dest;

		}); // End of navigation

	} // End of fn.myLightbox

}) (jQuery);
