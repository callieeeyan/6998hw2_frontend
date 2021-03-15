
// window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
// const synth = window.speechSynthesis;
// const recognition = new SpeechRecognition();
// // const icon = document.querySelector('i.fa.fa-microphone')
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // reader.onload = () => resolve(reader.result)
    reader.onload = () => {
      let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
      if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = error => reject(error);
  });
}
function UploadPhoto() {
  var file = document.getElementById('img').files[0];
  var label = document.getElementById('customlabels').value; 
  console.log("label",label);
  const reader = new FileReader();
  var encoded_image = getBase64(file).then(
    data => {
      console.log(data)
      var apigClient = apigClientFactory.newClient({
        apiKey: "fKlDh3ro8y72RZfzuWUKB4xOLN49k1QO4BRN21Lm"
      });

      var body = file;
      var params = {
        "bucket": "bucketforas2",
        "filename": file.name,
        "labels":label,
        "Content-Type": "image/jpg"
        // 'Accept': 'image/jpg'
      };

      var additionalParams = {
        headers: {
            "Content-Type": "image/jpg;base64",
        }
      };
 
   

    apigClient.uploadPut(params, data, additionalParams)
      .then(function (result) {
        console.log('success OK');
        console.log(result);
        alert("Photo uploaded successfully!");
      }).catch(function (result) {
        console.log(result);
      });
  });
}

function searchFromVoice(speechText) {
  const searchlabel = speechText;
  console.log(searchlabel)

  var apigClient = apigClientFactory.newClient({ apiKey: "fKlDh3ro8y72RZfzuWUKB4xOLN49k1QO4BRN21Lm" });
  var params = {
    "q": searchlabel
  };
  var body = {
    "q": searchlabel
  };

  var additionalParams = {
    headers: {
        'Content-Type':"application/json"
    },
    queryParams: {
        "q": searchlabel,
    }
  };
  console.log(searchlabel);
  apigClient.searchGet(params, body, additionalParams)
    .then(function (result) {
      console.log('success OK');
      console.log(result);
      showImages(result.data.results);
    }).catch(function (result) {
      console.log("failed......");
      console.log(searchlabel);
      console.log(result);
    });
}


function SearchByText() {
  var searchlabel = document.getElementById("search_content").value;
  console.log(searchlabel);
  var apigClient = apigClientFactory.newClient({ apiKey: "fKlDh3ro8y72RZfzuWUKB4xOLN49k1QO4BRN21Lm" });
  var params = {
    "q": searchlabel
  };
  var body = {
    "q": searchlabel
  };

  var additionalParams = {
    headers: {
        'Content-Type':"application/json"
    },
    queryParams: {
        "q": searchlabel,
    }
  };
  console.log(searchlabel);
  apigClient.searchGet(params, body, additionalParams)
    .then(function (result) {
      console.log('success OK');
      console.log(result);
      showImages(result.data.results);
    }).catch(function (result) {
      console.log("failed......");
      console.log(searchlabel);
      console.log(result);
    });
}

function showImages(res) {
  var newDiv = document.getElementById("img-container");
  if(typeof(newDiv) != 'undefined' && newDiv != null){
    while (newDiv.firstChild) {
      newDiv.removeChild(newDiv.firstChild);
    }
  }
  console.log(res)
  if (res.length == 0) {
//     document.getElementById("displaytext").style.visibility = "visible";
//     document.getElementById("displaytext").innerHTML = "No Image Found."
    document.getElementById("test").style.display = "block";
  }
  else {

    for (var i = 0; i < res.length; i++) {
      console.log(res[i]);
      var img = new Image();
      img.src = res[i];
      img.setAttribute("class", "banner-img");
      img.setAttribute("alt", "effy");
      img.style.width = '200px';
      img.style.height = 'auto';
      document.getElementById("test").style.display = "none";
      document.getElementById("img-container").appendChild(img);
      
//       document.getElementById("displaytext").style.display = "none";
    }
  }
}
