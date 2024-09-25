const uploadBtn = document.querySelector("#uploadBtn");
const downloadBtn = document.querySelector("#downloadBtn");
const deleteBtn = document.querySelector("#deleteBtn");

const baseUrl = "http://localhost:8080/api/files/presigned";

function handleUploadBtnClick() {
  const fileInput = document.querySelector("#fileInput");
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file first.");
    return;
  }
  const reqObj = { filename: file.name };

  fetch(`${baseUrl}/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqObj),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      fetch(data.url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      }).then((res) => console.log(res));
    });
}

function handledownloadBtnClick() {
  const filenameInput = document.querySelector("#filenameInput1");
  const filename = filenameInput.value;

  const reqObj = { filename };

  fetch(`${baseUrl}/download`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqObj),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      fetch(data.url)
        .then((res) => res.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const element = document.createElement("a");

          element.setAttribute("href", url);
          element.setAttribute("download", filename);

          document.body.appendChild(element);

          element.click();

          element.parentNode.removeChild(element);
          window.URL.revokeObjectURL(url);
        });
    });
}

function handledeleteBtnClick() {
  const filenameInput = document.querySelector("#filenameInput2");
  const filename = filenameInput.value;

  const reqObj = { filename };

  fetch(`${baseUrl}/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqObj),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      fetch(data.url, {
        method: "DELETE",
      }).then(console.log("deleted successfully"));
    });
}

uploadBtn.addEventListener("click", handleUploadBtnClick);
downloadBtn.addEventListener("click", handledownloadBtnClick);
deleteBtn.addEventListener("click", handledeleteBtnClick);
