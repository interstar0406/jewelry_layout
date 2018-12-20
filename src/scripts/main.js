//main
$('#filter-list li').on('click', function () {
	let id = $(this).attr('data-filter')

	$('#filter-list li').removeClass('active')
	$(this).addClass('active')


	$('#list-item .col').hide()
	$('#list-item .col').each(function () {
		if (id === $(this).attr('data-type')) {
			$(this).show()
		}
	})
	if (id === '0') {
		$('#list-item .col').show()
	}
})
