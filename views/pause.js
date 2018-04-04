// creates Pause View
var initPauseView = function() {
	var view = {};
	view.name = 'pause';
	view.template = $("#pause-view").html();
	$('main').html(Mustache.render(view.template));

	$('#next').on('click', function() {
		exp.findNextView();
	});

	return view;
};