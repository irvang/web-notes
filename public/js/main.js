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

function saveNote(evt) {

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
	let ajaxRequest = {
		url: '/notes/' + noteDiv.dataset.id,
		method: 'put',

		data: { note: noteDiv.textContent },
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