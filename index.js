const dropArea = document.getElementById('dropArea');
const dragText = document.querySelector('.dragText');
const buttonFile = document.getElementById('buttonFile');
const inputFile = document.getElementById('inputFile');

const ResetTextAreaDrop = "Drag & drop your image here";
let files;

buttonFile.addEventListener('click', () => inputFile.click());

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Drop file";
})


dropArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropArea.classList.remove("active");
    dragText.textContent = ResetTextAreaDrop;
})

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();

    files = e.dataTransfer.files;
    showFiles(files)

    dropArea.classList.remove("active");
    dragText.textContent = ResetTextAreaDrop;
})

function showFiles(files) {
    if (files.length === undefined) {
        imageDrop(files);
    }
    else {
        for (const file of files) {
            imageDrop(file)
        }
    }
}

function imageDrop(file) {
    const docType = file.type;
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (validExtensions.includes(docType)) {

        const fileReader = new FileReader();
        const id = `file-${Math.random().toString(32).substring(7)}`;

        fileReader.addEventListener('load', (e) => {
            const fileUrl = fileReader.result;
            const image = `
            <div id="${id}" class="container">
            <img src="${fileUrl}" alt="${file.name}" width="50px">
            <div class="bg-red-50">
            <span>${file.name}</span>
            
            </div>
            </div>
            `;

            const html = document.querySelector("#preview").innerHTML;
            document.querySelector("#preview").innerHTML = image + html;

        });
        fileReader.readAsDataURL(file);
        uploadFile(file, id);
    }
    else {
        alert("No es archivo valido")
    }
}

async function uploadFile(file) {
    const formData = new FormData();

    formData.append("file", file);

    try {
        const response = await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData,
        });
        const responseText = await response.text();
        console.log(responseText);

        
        document.querySelector('#buttonFile').textContent = svg + successfull
 
    }
    catch (error) {
        document.querySelector(`#${id} .bg-red-50`).innerHTML = `<span class="bg-red-500"> Archivo no subido </span>`;


    };
}