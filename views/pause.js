// creates Pause View
var initPauseView = function(index, trials) {
	var view = {};
	view.name = 'pause';
	view.template = $("#pause-view").html();
	$('main').html(Mustache.render(view.template));

	$('#next').on('click', function() {
		cp.findNextView();
	});

	return view;
};