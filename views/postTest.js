var initPostTestView = function() {
	var view = {};
	view.name = 'postTest';
	view.template = $('#post-test-view').html();

	$('main').html(Mustache.render(view.template, {
		title: config_views.postTest.title,
		text: config_views.postTest.text
	}));

	$('#next').on('click', function() {
		cp.findNextView();
	});

	return view;
};