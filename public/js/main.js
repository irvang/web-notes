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

	//toggle button style and text
	$(this).toggleClass('btn-secondary');
	$(this).toggleClass('btn-success');
	$(this).html('Save');

	//select div with text to update
	let noteDiv = $(this).parent().parent().children()[1];
	noteDiv.contentEditable = true; //attr('contentEditable', true);
	noteDiv.classList.add('editableText');//changes background color

	//toggle listener functions
	$(this).off('click', editNote);
	$(this).on('click', saveNote);
}

function saveNote (evt) {

	//toggle button style and text
	$(this).toggleClass('btn-secondary');
	$(this).toggleClass('btn-success');
	$(this).html('Edit');

	//select div
	let noteDiv = $(this).parent().parent().children()[1];
	noteDiv.contentEditable = false; //attr('contentEditable', 
	noteDiv.classList.remove('editableText');//changes background color

	//toggle listener functions
	$(this).on('click', editNote);
	$(this).off('click', saveNote);
	
	//generate AJAX request
	let noteNumber = noteDiv.dataset.id;
	let noteText = noteDiv.textContent;

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