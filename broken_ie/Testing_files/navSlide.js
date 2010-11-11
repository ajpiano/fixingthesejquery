(function( $ ){

	$.fn.navSlide = function() {




		var Parent = this;

		function scrollTo(domEle)
		{
			var url = $(domEle).attr('title');

			//position is 0 based
			var counter = 0;
			var position;

			$(domEle).parent().children().each(function ()
			{
				if ($(this).attr('title') == url)	{position = counter;}

				counter = counter +1;
			});

			if (position !== undefined)
			{
				$(domEle).parent().animate(	{'margin-left': (Parent.width() * position * -1) + 'px'}, {"easing": "easeInOut"});
				//$(domEle).parent().parent().animate( {'height': $(domEle).outerHeight(true) + 'px'}, {"easing": "easeInOut"});
			}
		}

		function setCSS()
		{
			var parentWidth = Parent.width();
			var numberOfPanels = Parent.children().children('[title]').size();

			// the main Parent
			Parent.css(
			{
				'overflow': 'hidden'
			})

			// The wrapper that scrolls
			Parent.children().css(
			{
				'width': parentWidth * numberOfPanels + 'px'
			});


			// each slide, float left and calculate individual widths taking into account padding etc
			Parent.children().children('[title]').each(function (index, domEle)
			{
				$(domEle).css(	{'float': 'left', 'width': parentWidth + 'px'});

				var fullWidth = $(domEle).outerWidth(true);
				var innerWidth = parentWidth;
				var newInnerWidth = innerWidth - (fullWidth - innerWidth);
				$(domEle).css('width', newInnerWidth + 'px');
			});

		}

		function hashChanged()
		{
			var hash = self.document.location.hash.substring(1);

			// there's a hash
			if (hash !== undefined && hash !== "")
			{
				scrollTo( Parent.find('[title="'+hash+'"]').first().get() );
			}
			
			// no hash
			else
			{
				var height = Parent.children().children().first().outerHeight(true);

				//Parent.css('height', height+'px');
			}
		}

		function registerEvents()
		{
			$(window).hashchange( function()
			{
				hashChanged();
			});
		}

		this.children().first().append('<div style="clear: both"></div>');
		setCSS();
		registerEvents();
		hashChanged(); // init
		


		return this;
	};

})( jQuery );


//TODO: make initial call to trigger the live event