// creates thanks view
var initThanksView = function() {
	var view = {};
	view.name = 'thanks';
	view.template = $('#thanks-view').html();

	$('main').html(Mustache.render(view.template, {
		message: config_views.thanks.message
	}));

	return view;
};