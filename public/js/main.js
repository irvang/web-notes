function deleteNote(id) {
	let ajaxRequest = {
		url: '/notes/' + id,
		method: 'delete',
		success: window.location.reload()
		// success: function () {
		// 	window.location.reload();
		// }
	}

	$.ajax(ajaxRequest);
	
}