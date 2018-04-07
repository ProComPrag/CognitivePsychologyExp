// creates the Introduction View
var initIntroView = function() {
	var view = {};
	view.name = 'intro';
	view.template = $('#intro-view').html();
	$('main').html(Mustache.render(view.template, {
		title: config_views.intro.title,
		text: config_views.intro.text,
		button: config_views.intro.buttonText
	}));

	if (config_deploy.is_Prolific) {
		$('.prolific-id').removeClass('nodisplay');
	}

	$('#next').on('click', function() {
		if (config_deploy.is_Prolific) {
			$('.prolific-id').removeClass('nodisplay');
			exp.data.out.prolific_id = $('#prolific-id').val().trim();
		}
		exp.findNextView();
	});

	return view;
};