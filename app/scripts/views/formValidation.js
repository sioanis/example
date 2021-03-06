var FormValidation = Backbone.View.extend({

	el: '.form-group',
	
	events: { 

		'keyup input'  : 'validateField',
		'change input' : 'validateField',
		'submit'       : 'onSubmit',
		'click button' : 'checkForErrors' 

	},
	initialize: function() {
		var self = this;

		_.each($('input'), function(elm) {
			self.validateField($(elm));
		});
	},

	validateField: function(e) {
		var $e      = e.currentTarget ? $(e.currentTarget) : e,
			$parent = $e.parent(),
			name    = $parent.attr('class'),
			type    = $e.attr('type'),
			value   = $e.val(),
			valid   = false;

		switch (type) {
			case 'text' : 
				valid = /\w{2,}/g.test(value);
				break;
			case 'tel' :
				valid = /\d{10}/g.test(value.replace(/[^\d]/g, ''));
				break;
			case 'email' : 
				valid = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(value));
				break;
			default : 
				break;
		}

		if (valid) {
			$parent.removeClass('error').addClass('valid');

			if (!$('label').not('.valid').length) {
				this.$el.find('button').addClass('valid');
			}
		} else {
			$parent.removeClass('valid');
		}
	},
	
	onSubmit: function(e) {
		if ($('label').not('.valid').length) { return false; }

		var self     = this,
			$req     = $('.requests'),
			reqVal   = $req.find('textarea').val(),
			name     = this.$el.find('.first input').val(),
			$success = $('.success');

		this.eventAggregator.trigger('onSubmit');

		this.$el.find('.contact').addClass('hide');
		$('.reservation').find('.hold').addClass('hide');
		$('.confirm').removeClass('hide');

		setTimeout(function(){ 
			$('.details').addClass('hide');
			$('.confirm').addClass('hide');
			$success.removeClass('hide'); 
		}, 3000);

		if (reqVal.length) {
			$req.find('.special').text(reqVal);
		} else {
			$req.addClass('hide');
		}

		$success.find('.name').text(name);

		return false;
	},


	checkForErrors: function() {
		_.each($('input'), function(elm) {
			var $elm = $(elm),
				$parent = $elm.parent();

			if ($elm.prop('required') && !$parent.hasClass('valid')) {
				$parent.addClass('error');
			}
		});
	}
});

var formValidation = new FormValidation();