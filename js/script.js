$(function(){

	$('#countdown').countup({
	    start: new Date(2011, 8, 24) //year, month, day, hour, min, sec
	});

	$('#contato-form').validate({
	    rules: {
	      name:       {required: true},
	      email:      {required: true, email: true },
	      message:    {required: true}
	    },
	    highlight: function(element) {
	      $(element).closest('.form-group').removeClass('success').addClass('error');
	    },
	    success: function(element) {
	      element
	        .addClass('valid')
	        .closest('.form-group').removeClass('error').addClass('success');
	    }
	  });
});
