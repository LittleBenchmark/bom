$(function() {

	// Sign-in / Join Modal
	var $authmodal = $('#modal-auth');
	var authmodalPanes = $authmodal.find('.auth-box');
	
	window.signinModalTrigger = function signinModalTrigger(e) {

		e.preventDefault();

		var initial = $(this).data("initial") || 'join';
		var initialPane = $authmodal.find('.modal-pane-' + initial);
		var from = $(this).data("from");
		
		$authmodal.modal('show');
		
		authmodalPanes.addClass('hidden');
		initialPane.removeClass('hidden');
		
		// Only focus the first field on large devices where showing
		// the keyboard isn't a jarring experience
		if ($(window).width() >= 768) {
			initialPane.find('input[type!=hidden],textarea').eq(0).click().focus();
		}
		
		if (from) {
			$authmodal.find('[name="from"]').val(from);
		}
	};

	$("[href='#modal-auth'], [data-modal='auth'], .js-auth-trigger").on('click', signinModalTrigger);
	
	// Move between panes
	$("[rel='modal-pane']").click( function() {

        var switchTo = $authmodal.find('.modal-pane-' + $(this).data("modal-pane"));

        authmodalPanes.addClass('hidden');
        switchTo.removeClass('hidden');

        // Only focus the first field on large devices where showing
        // the keyboard isn't a jarring experience
        if ($(window).width() >= 768) {
            switchTo.find('input[type!=hidden],textarea').eq(0).click().focus();
        }
    });

    // UI Reveal
    // ------------------------------

    $('.ui-reveal__trigger').click( function() {
        container = $(this).closest('.ui-reveal');

        container.addClass('is-revealed');

        //- click ensures browse is envoked on file fields 
        container.find('input[type!=hidden],textarea').eq(0).click().focus();
    });

    $('.ui-reveal__hide').click( function() {
        container = $(this).closest('.ui-reveal');

        container.removeClass('is-revealed');
    });
    
	// Clean up URL if signed in via Facebook, see - https://github.com/jaredhanson/passport-facebook/issues/12
	if (window.location.hash && window.location.hash === "#_=_") {
		
		if (window.history && history.pushState) {
			window.history.pushState("", document.title, window.location.pathname);
		} else {
			var scroll = {
				top: document.body.scrollTop,
				left: document.body.scrollLeft
			};
			window.location.hash = "";
			document.body.scrollTop = scroll.top;
			document.body.scrollLeft = scroll.left;
		}
	}
});
