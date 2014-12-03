
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
      budgetInput.val('All of your money');
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
    if(timeframeSlider.val() == minTimeframe) {
      timeframeInput.val('No fixed deadline, but ASAP');
    }
    if(timeframeSlider.val() == maxTimeframe) {
      timeframeInput.val('Whenevs');
    }
  });


  $('form.hire-us').on('submit', function(e) {
    e.preventDefault();
    var $self = $(this);

    $('.js-submit-btn').attr('disabled', true);
    $('.js-btn-loader').addClass('visible');
    $('.js-feedback-msg').removeClass('msg-visible');

    var success = function(data) {
      if (data) {
        $('.js-feedback-msg')
          .html('<p>Thanks for getting in touch. We’ll get back to you very soon.</p>')
          .removeClass('msg-error')
          .addClass('msg-success msg-visible');
        $('#name, #email, #project_title, #description').val('');
      }
    }

    var error = function() {
      // alert('failure!');
      $('.js-feedback-msg')
        .html('<p>Something’s wrong! Please try again, or email us instead at <a href="mailto:andy@madebyfieldwork.com">andy@madebyfieldwork.com</a>.</p>')
        .removeClass('msg-success')
        .addClass('msg-error msg-visible');
    }

    var complete = function() {
      $('.js-submit-btn').attr('disabled', false);
      $('.js-btn-loader').removeClass('visible');
    }

    $.ajax({
      method: 'post',
      url: $self.attr('action'),
      data: $self.serialize(),
      success: success,
      error: error,
      complete: complete,
      dataType: 'json'
    });
  });

});
