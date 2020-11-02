    // When the user clicks on an anchor with a class name "someClassName"...
    $('body').on('click', 'a.love,a.truth', function(e) {

      // Get the hash. In this example, "#myDestinationAnchor".
      var targetSelector = this.hash;
      var $target = $(targetSelector);
    
      // Animate the scroll to the destination...
      $('html, body').animate(
          {
              scrollTop: $target.offset().top // Scroll to this location.
          }, {
              // Set the duration long enough to allow time
              // to lazy load the elements.
              duration: 2000,
    
              // At each animation step, check whether the target has moved.
              step: function( now, fx ) {
    
                  // Where is the target now located on the page?
                  // i.e. its location will change as images etc. are lazy loaded
                  var newOffset = $target.offset().top;
    
                  // If where we were originally planning to scroll to is not
                  // the same as the new offset (newOffset) then change where
                  // the animation is scrolling to (fx.end).
                  if(fx.end !== newOffset)
                      fx.end = newOffset;
              }
          }
      );
    });
document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages = document.querySelectorAll("img.lazy");    
  var lazyloadThrottleTimeout;
  
  function lazyload () {
    if(lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }    
    
    lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
    }, 20);
  }
  
  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
});