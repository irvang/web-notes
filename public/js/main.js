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

function editNote(thisButton, i) {

	let toggleB = true;

	return function () {
		console.log(thisButton);

		let noteDiv = $(thisButton).parent().parent().children()[1];
		noteDiv.contentEditable = true;
		thisButton.innerHTML = 'Save';
		thisButton.classList.remove('btn-secondary');
		thisButton.classList.add('btn-success');
		thisButton.removeEventListener('click', editNote)
		console.log(thisButton);
	}
}

let buttons = $(".editButton");
buttons.on('click', editNote2);


function editNote2(evt) {
	// console.log(($(this)));
	$(this).toggleClass('btn-secondary');
	$(this).toggleClass('btn-success');
	$(this).html('Update');

	let noteDiv = $(this).parent().parent().children()[1];
	noteDiv.contentEditable = true; //attr('contentEditable', true);
	$(this).off('click', editNote2);
	$(this).on('click', saveNote);
	// console.log(noteDiv);
	// console.log('editNote')
}

function saveNote (evt) {

	$(this).toggleClass('btn-secondary');
	$(this).toggleClass('btn-success');
	$(this).html('Save');

	let noteDiv = $(this).parent().parent().children()[1];
	noteDiv.contentEditable = false; //attr('contentEditable', 

	$(this).on('click', editNote2);
	$(this).off('click', saveNote);
	
	let noteNumber = noteDiv.dataset.id;
	let noteText = noteDiv.textContent;
	console.log(noteText)

	let ajaxRequest = {
		url: '/notes/' + noteNumber,
		method: 'put',

		data: { note: noteText },
		success: window.location.reload()
	}
	$.ajax(ajaxRequest);

}