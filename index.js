const dropArea = document.getElementById('dropArea')
const dragText = document.querySelector('.dragText')
const buttonFile = document.getElementById('buttonFile');
const inputFile = document.getElementById('inputFile');

dropArea.addEventListener('dragover', (e) =>{
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Drop file"
})

buttonFile.addEventListener('click', ()=>{
    inputFile.click();
})

