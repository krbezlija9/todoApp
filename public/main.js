const deleteText = document.querySelectorAll('.del')

Array.from(deleteText).forEach((element) => {
	element.addEventListener('click', deleteTodo)
})

async function deleteTodo(){
	const todoItem = this.parentNode.childNodes[3].innerText
	try{
		const res = await fetch('deleteTodo', {
			method: 'delete',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				'item': todoItem})
		})
		const data = await res.json()
		console.log(data)
		location.reload()
	}
	catch{err => console.error(err)}
}
