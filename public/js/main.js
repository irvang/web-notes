let deleteButtons = $(".deleteButton");
deleteButtons.on('click', deleteNote);

function deleteNote(evt) {
	let ajaxRequest = {
		url: '/notes/' + this.dataset.id,
		method: 'delete',
		success: function () {//could be: success: window.location.reload()
			window.location.reload();
		}
	}
	$.ajax(ajaxRequest);
}

//====EDIT BUTTONs
let editButtons = $(".editButton");
editButtons.on('click', editNote());

function editNote() {
	let edit_on = true;

	return function () {
		$(this).toggleClass('btn-secondary');//starts on
		$(this).toggleClass('btn-success');//starts off
		$(this).html(edit_on ? 'Save' : 'Edit');

		//select div with text to update
		let noteDiv = $(this).parent().parent().children()[1];
		noteDiv.contentEditable = edit_on; //attr('contentEditable', true);
		noteDiv.classList.toggle('editableText');

		//when edit mode is turned off, generate and send AJAX
		if (!edit_on) {//when on, no editing; when off, edit and save allowed
			let ajaxRequest = {
				url: '/notes/' + noteDiv.dataset.id,
				method: 'put',
				data: { note: noteDiv.textContent },
				// success: window.location.reload()
			}
			$.ajax(ajaxRequest);
		}
		edit_on = !edit_on;
	}
}