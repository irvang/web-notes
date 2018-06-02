let deleteButtons = $(".deleteButton");
deleteButtons.on('click', deleteNote);

function deleteNote(evt) {

	const {id} = this.dataset;
	console.log(id);

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

//====EDIT BUTTON
let editButtons = $(".editButton");
editButtons.on('click', editNote);

function editNote(evt) {
	// console.log(($(this)));
	$(this).toggleClass('btn-secondary');
	$(this).toggleClass('btn-success');
	$(this).html('Save');

	let noteDiv = $(this).parent().parent().children()[1];
	noteDiv.contentEditable = true; //attr('contentEditable', true);
	$(this).off('click', editNote);
	$(this).on('click', saveNote);
	// console.log(noteDiv);
	// console.log('editNote')
}

function saveNote (evt) {

	$(this).toggleClass('btn-secondary');
	$(this).toggleClass('btn-success');
	$(this).html('Edit');

	let noteDiv = $(this).parent().parent().children()[1];
	noteDiv.contentEditable = false; //attr('contentEditable', 

	$(this).on('click', editNote);
	$(this).off('click', saveNote);
	
	let noteNumber = noteDiv.dataset.id;
	let noteText = noteDiv.textContent;

	console.log(noteNumber, noteText);
	let ajaxRequest = {
		url: '/notes/' + noteNumber,
		method: 'put',

		data: { note: noteText },
		// success: window.location.reload()
	}
	$.ajax(ajaxRequest);
}


/* 
function replaceNote() {
	let noteText = document.querySelector('#note-replace-text').value;
	let noteNumber = document.querySelector('#note-replace-index').value;

	let ajaxRequest = {
		url: '/notes/' + noteNumber,
		method: 'put',

		data: { note: noteText },
		success: window.location.reload()
	}
	$.ajax(ajaxRequest);
}
 */