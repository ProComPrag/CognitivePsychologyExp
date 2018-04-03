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

	$('#next').on('click', function() {
		cp.findNextView();
	});

	return view;
};