const dropArea = document.getElementById('dropArea');
const dragText = document.querySelector('.dragText');
const buttonFile = document.getElementById('buttonFile');
const inputFile = document.getElementById('inputFile');

const ResetTextAreaDrop = "Drag & drop your image here";

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Drop file";
})

buttonFile.addEventListener('click', () => inputFile.click());


dropArea.addEventListener('drop', (e) => {
    e.preventDefault();


    dragText.textContent = ResetTextAreaDrop;
})

dropArea.addEventListener('dragleave', (e) => {
    e.preventDefault();

    dragText.textContent = ResetTextAreaDrop;
})