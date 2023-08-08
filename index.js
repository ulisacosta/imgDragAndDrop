const dropArea = document.getElementById("dropArea");
const dragText = document.querySelector(".dragText");
const buttonFile = document.getElementById("buttonFile");
const inputFile = document.getElementById("inputFile");

const ResetTextAreaDrop = "Drag & drop your image here";
let files;

buttonFile.addEventListener("click", () => inputFile.click());

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Drop file";
});

dropArea.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropArea.classList.remove("active");
  dragText.textContent = ResetTextAreaDrop;
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();

  files = e.dataTransfer.files;
  showFiles(files);

  dropArea.classList.remove("active");
  dragText.textContent = ResetTextAreaDrop;
});

function showFiles(files) {
  if (files.length === undefined) {
    imageDrop(files);
  } else {
    for (const file of files) {
      imageDrop(file);
    }
  }
}

function imageDrop(file) {
  const docType = file.type;
  const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

  if (validExtensions.includes(docType)) {
    const fileReader = new FileReader();
    const id = `file-${Math.random()
      .toString(32)
      .substring(7)}`; /* Creo ID para el archivo  */

    fileReader.addEventListener("load", (e) => {
      const fileUrl = fileReader.result;
      const image = `
        <div class="hidden  imageUpload flex flex-col justify-center items-center">      
      <div id="${id}" class="  ">
            <img src="${fileUrl}" alt="${file.name}" width="100px" height="100px" class="">
            </div>
            <div class="bg-red-50">
            <input class="w-full h-2/6 p-4" id="inputUrl" type="text" value="${file.name}" readonly> 
            <button id="copyButton" onClick="copyButton('${fileUrl}')">copy</button>
            
            </div>
            </div>
            `;

      const html = document.querySelector("#preview").innerHTML;
      document.querySelector("#preview").innerHTML = image + html;
    });

    fileReader.readAsDataURL(file);
    uploadFile(file, id);
  } else {
    alert("No es archivo valido");
  }
}

function copyButton(fileUrl) {
  const inputUrl = document.getElementById("inputUrl");

  inputUrl.select();
  navigator.clipboard
    .writeText(fileUrl)
    .then(() => {
      console.log("Contenido copiado al portapapeles");
    })
    .catch((err) => {
      console.error("Error al copiar al portapapeles:", err);
    });
}

async function uploadFile(file) {
  const formData = new FormData();

  formData.append("file", file);

  document.getElementById("main").style.display = "none";
  document.getElementById("loader").style.display = "flex";
  document.getElementById("spinner").style.display = "flex";

  try {
    const response = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });

    const responses = await response.arrayBuffer();

    for (let i = 0; i <= responses.byteLength; i++) {
      document.getElementById("spinner").style.display = "none";
    }
    document.querySelector(".imageUpload").style.display = "flex";
  } catch (error) {
    document.querySelector(
      ".btnSpan"
    ).innerHTML = `<span class="bg-red-500"> Archivo no subido </span>`;
  }
}
