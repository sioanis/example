require(['scripts/views/formValidation'], function() {
	
	var Timer = Backbone.View.extend({

	  el: '.remaining',

	  initialize: function() {
	  	var self = this;

	    this.startTimer();

	    this.eventAggregator.bind('onSubmit', this.clearTimer);
	  },

	  startTimer: function() {
	  	var self     = this,
	  		duration = 60*5,
	  		timer    = duration,
	  		min, sec;

	  	self.clearTimer();
	    
	    this.time = setInterval(function () {
	        min = parseInt(timer / 60, 10)
	        sec = parseInt(timer % 60, 10);
	        sec = sec < 10 ? "0" + sec : sec;

	        self.$el.html(min + 'm ' + sec + 's');

	        if (--timer < 0) {

	            $('input').val('');
	            $('label:not(.requests)').removeClass('valid');
	            
		    	self.clearTimer();

		    	if (!alert('Your reservation has expired.')) {
		    		self.startTimer();
		    	}
	        }
	    }, 1000);
	  },

	  clearTimer: function() {
	  	var self = this;

	  	clearTimeout(self.time);
	  }

	});

	var timer = new Timer();	
});