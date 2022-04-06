// Use the defined - - - - -  rectangle (In excel.html) for the space to listen for events
let dropArea = document.getElementById('drop-area')

//Prevent the defaults for all the events we want. 
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

//Add an event listner to highlight the box when the user drags a file over it
;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})

//Add an event listner to UN-highlight the box when the user drops the file or leaves the area
;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})

function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('highlight')
}

//Add an event listner for when they "drop" the file
dropArea.addEventListener('drop', handleDrop, false)

//Handle the event if someone clicks the button for uploading a file. 
function handleFileSelect(evt) {
  let files = evt.target.files; // FileList object

  // use the 1st file from the list
  if(files != ''){
    let f = files[0];
    uploadFile(f)
  }
}

//event listner for the button being clicked. 
document.getElementById('fileElem').addEventListener('change', handleFileSelect, false);

// get the data from the excel file and store it.  
function handleDrop(e) {
  console.log(e)
  let dt = e.dataTransfer
  let files = dt.files
  handleFiles(files)
}

//for each file that we recieved pass it to the upload function
//Can be edited for future use like displaying files on site when uploaded
//for now just pass it to the uploadFile() 
function handleFiles(files) {
    ([...files]).forEach(uploadFile)    
  }

// Here we check to see if the file has the right ending for the files expected
// If not we let them know and do nothing. If they are as expected then we contuinue on....
function uploadFile(file){
  if (!file["name"].endsWith(".xlsx") && !file["name"].endsWith(".csv") && !file["name"].endsWith(".xls")){
    alert("Invalid File Type!\nPlease Upload a .xls, .xlsx, or a .csv file ")
  }else{
    console.log("Here is your File Sir: ")
    console.log(file)
  }

}
  // function uploadFile(file) {
  //   let url = 'YOUR URL HERE'
  //   let formData = new FormData()
  
  //   formData.append('file', file)
  
  //   fetch(url, {
  //     method: 'POST',
  //     body: formData
  //   })
  //   .then(() => { /* Done. Inform the user */ })
  //   .catch(() => { /* Error. Inform the user */ })
  // }


//   function uploadFile(file) {
//     var url = 'YOUR URL HERE'
//     var xhr = new XMLHttpRequest()
//     var formData = new FormData()
//     xhr.open('POST', url, true)
  
//     xhr.addEventListener('readystatechange', function(e) {
//       if (xhr.readyState == 4 && xhr.status == 200) {
//         // Done. Inform the user
//       }
//       else if (xhr.readyState == 4 && xhr.status != 200) {
//         // Error. Inform the user
//       }
//     })
  
//     formData.append('file', file)
//     xhr.send(formData)
//   }
