document.addEventListener('DOMContentLoaded', function() {
    var pages = document.querySelectorAll('.page');
    var zIndex = 1;
  
    pages.forEach(function(page, i) {
      page.addEventListener('click', function(event) {
        var x = event.pageX;
        var y = event.pageY;
  
        var nextItem = i + 1;
        if (nextItem >= pages.length) {
          nextItem = 0;
        }
  
        var nextPage = pages[nextItem];
        nextPage.style.zIndex = ++zIndex;
        nextPage.style.clipPath = 'circle(0% at ' + x + 'px ' + y + 'px)';
  
        var start = null;
  
        function animateClipPath(timestamp) {
          if (!start) start = timestamp;
          var progress = timestamp - start;
          var radius = Math.min(progress / 5, 200);
          nextPage.style.clipPath = 'circle(' + radius + '% at ' + x + 'px ' + y + 'px)';
  
          if (radius < 200) {
            requestAnimationFrame(animateClipPath);
          }
        }
  
        requestAnimationFrame(animateClipPath);
      });
    });
  });
  