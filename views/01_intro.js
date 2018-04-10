// creates the Introduction View
var initIntroView = function() {
	var view = {};
	view.name = 'intro';
	view.template = $('#intro-view').html();
	$('main').html(Mustache.render(view.template, {
	    title: config_views.intro.title,
	    IDtext: config_views.intro.IDtext,
	    text: config_views.intro.text,
	    button: config_views.intro.buttonText
	}));

	if (config_deploy.deployMethod === 'Prolific') {
		$('.id-field').removeClass('nodisplay');
	} 

	$('#next').on('click', function() {
		if (config_deploy.deployMethod === 'Prolific') {
			if ($('#id-field').val().trim() === '') {
				alert('Please enter your ID to begin the experiment');
			} else {
				exp.data.out.participant_id = $('#id-field').val().trim();
				exp.findNextView();
			}
		} else {
			exp.findNextView();			
		}
	});

	return view;
};
