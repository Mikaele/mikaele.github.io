/**
 * @name		jQuery Count-UP Plugin
 * @author		Martin Angelov
 * @version 	1.0
 * @url			http://tutorialzine.com/2012/09/count-up-jquery/
 * @license		MIT License
 */

(function($){

	// Number of seconds in every time division
	var years = 365*24*60*60,
		months = 30*24*60*60,
		days	= 24*60*60;

	// Creating the plugin
	$.fn.countup = function(prop){

		var options = $.extend({
			callback	: function(){},
			start		: new Date()
		},prop);

		var passed = 0,y,mo, d,
			positions;

		// Initialize the plugin
		init(this, options);

		positions = this.find('.position');

		(function tick(){
			var dateObj = new Date();
			var month = dateObj.getUTCMonth() + 1; //months from 1-12
			var day = dateObj.getUTCDate();
			var year = dateObj.getUTCFullYear();

			passed = Math.floor((new Date(year,month,day) - options.start) / 1000);
			// Number of days passed
			y = Math.floor(passed / years);
			updateDuo(0, 1, y);
			passed -= y*years;


			// Number of days passed
			mo = Math.floor(passed /months);
			updateDuo(2, 3, mo);
			passed -= mo*months;
			// Number of days passed
			d = Math.floor(passed / days);
			updateDuo(4, 5, d);
			passed -= d*days;

			// Calling an optional user supplied callback
			options.callback(y, mo, d);

			// Scheduling another call of this function in 1s
		//	setTimeout(tick, 1000);
		})();

		// This function updates two digit positions at once
		function updateDuo(minor,major,value){
			switchDigit(positions.eq(minor),Math.floor(value/10)%10);
			switchDigit(positions.eq(major),value%10);

		}

		return this;
	};


	function init(elem, options){
		elem.addClass('countdownHolder');

		// Creating the markup inside the container
		$.each(['Anos','Meses','Dias'],function(i){
			$('<span class="count'+this+'">').html(
				'<span class="position">\
					<span class="digit static">0</span>\
				</span>\
				<span class="position">\
					<span class="digit static">0</span>\
				</span>'
			).appendTo(elem);

			if(this){
				elem.append('<span class="divDesc">'+this+'</span>');
			}
		});

	}

	// Creates an animated transition between the two numbers
	function switchDigit(position,number){

		var digit = position.find('.digit')

		if(digit.is(':animated')){
			return false;
		}

		if(position.data('digit') == number){
			// We are already showing this number
			return false;
		}

		position.data('digit', number);

		var replacement = $('<span>',{
			'class':'digit',
			css:{
				top:'-2.1em',
				opacity:0
			},
			html:number
		});

		// The .static class is added when the animation
		// completes. This makes it run smoother.

		digit
			.before(replacement)
			.removeClass('static')
			.animate({top:'2.5em',opacity:0},'fast',function(){
				digit.remove();
			})

		replacement
			.delay(100)
			.animate({top:0,opacity:1},'fast',function(){
				replacement.addClass('static');
			});
	}
})(jQuery);
