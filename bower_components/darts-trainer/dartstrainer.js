function disallowOverscroll(){
  $(document).on('touchmove',function(e){
    e.preventDefault();
  });
  $('body').on('touchstart','.scrollable',function(e) {
    if (e.currentTarget.scrollTop === 0) {
      e.currentTarget.scrollTop = 1;
    } else if (e.currentTarget.scrollHeight
              === e.currentTarget.scrollTop
                  + e.currentTarget.offsetHeight) {
      e.currentTarget.scrollTop -= 1;
    }
  });
  $('body').on('touchmove','.scrollable',function(e) {
    e.stopPropagation();
  });
}