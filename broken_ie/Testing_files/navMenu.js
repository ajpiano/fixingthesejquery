

$(document).ready(function()
{


	$('.navigation li').each(function ()
	{
		var pos = $(this).position();
		$(this).data('otop', pos.top );

	});

	$(window).hashchange( function()
	{
		var hash = self.document.location.hash;

		var triggerli = $('.navigation').find('[href="'+hash+'"]').parent();


		// animate trigger up
		$(triggerli).animate(
		{
			'top' : ($(triggerli).data('otop')-21) +'px'
		},
		{
			queue: false
		});


		// animate all non-trigger down
		$('.navigation li a[href!="'+hash+'"]').each(function ()
		{
			var theli = $(this).parent();

			$(theli).animate(
			{
				'top' : $(theli).data('otop') + 'px'
			},
			{
				queue: false
			});
		});

	});


});