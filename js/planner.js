
$(document).ready(function(){

  var budgetInput = $('.budget-value');
  var budgetSlider = $('.budget-slider');
  var minBudget = 0;
  var maxBudget = 100000;

  budgetSlider.noUiSlider({
    start: [10000],
    step: 1000,
    behaviour: 'tap-drag',
    range: {
      'min': minBudget,
      'max': maxBudget
    },
    serialization: {
      lower: [
        $.Link({
          target: budgetInput,
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


  budgetSlider.on('slide set', function () {
    if(budgetSlider.val() == maxBudget) {
      budgetInput.val('£100,000+');
    }
    // if(budgetSlider.val() == minBudget) {
    //   budgetInput.val('No budget');
    // }
  });


  var timeframeInput = $('.timeframe-value');
  var timeframeSlider = $('.timeframe-slider');
  var minTimeframe = 1;
  var maxTimeframe = 24;
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  timeframeSlider.noUiSlider({
    start: [4],
    step: 1,
    behaviour: 'tap-drag',
    range: {
      'min': minTimeframe,
      'max': maxTimeframe
    },
    serialization: {
      lower: [
        $.Link({
          target: timeframeInput,
          format: {
            to: function(value) {
              var d = new Date()
              // return d.getMonth() + value * 1;
              console.log((d.getMonth() * 1) + (value * 1) - 1);
              return monthNames[(d.getMonth() + value * 1) % 12] + ' ' + (1 * d.getFullYear() + (Math.floor(((d.getMonth() * 1) + (value * 1)) / 12)));
            }
          }
        })
      ]
    }
  });


  timeframeSlider.on('slide set', function () {
    if(timeframeSlider.val() == maxBudget) {
      timeframeInput.val('All your money');
    }
    // if(timeframeSlider.val() == minBudget) {
    //   timeframeInput.val('No budget');
    // }
  });


  var successMsg = '<div class="msg success"><div class="wrapper"><p>Everything checks out, submitting now!</p><span class="loader"></span></div></div>',
    errorMsg = '<div class="msg error"><div class="wrapper"><p>Hey dummy, your information is wrong. Fix it.</p><span class="loader"></span></div></div>',
    success = '.msg.success',
    error = '.msg.error',
    loader = '.loader';

});
