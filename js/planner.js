
$(document).ready(function(){

  var valueInput = $('.value');
  var sliderDiv = $('.slider');
  var minBudget = 1000;
  var maxBudget = 100000;

  sliderDiv.noUiSlider({
    start: [10000],
    step: 500,
    behaviour: 'tap-drag',
    range: {
      'min': minBudget,
      'max': maxBudget
    },
    serialization: {
      lower: [
        $.Link({
          target: valueInput,
          format: {
            to: function(value) {
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            prefix: '£',
            decimals: 0
          }
        })
      ]
    }
  });


  sliderDiv.on('slide set', function () {
    if(sliderDiv.val() == maxBudget) {
      valueInput.val('All your money');
    }
    // if(sliderDiv.val() == minBudget) {
    //   valueInput.val('No budget');
    // }
  });


  var successMsg = '<div class="msg success"><div class="wrapper"><p>Everything checks out, submitting now!</p><span class="loader"></span></div></div>',
    errorMsg = '<div class="msg error"><div class="wrapper"><p>Hey dummy, your information is wrong. Fix it.</p><span class="loader"></span></div></div>',
    success = '.msg.success',
    error = '.msg.error',
    loader = '.loader';

});
