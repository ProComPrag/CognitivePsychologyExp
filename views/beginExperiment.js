var initBeginExpView = function() {
	console.log('begin exp');
	var view = {};
	view.name = 'beginExp';
	view.template = $("#begin-exp-view").html();
	$('main').html(Mustache.render(view.template, {
		text: config_views.beginExp.text
	}));

	$('#next').on('click', function() {
		exp.findNextView();
	});

	return view;
};