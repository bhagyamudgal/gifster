console.log("GIFSTER");

const api_key = "60925fcff2fc22523a42c839";
let contactForm = document.getElementById("contactForm");
let contactHeading = document.getElementById("contactHeading");
let contactName = document.getElementById("name");
let contactEmail = document.getElementById("email");
let contactMessage = document.getElementById("message");
let sendBtn = document.getElementById("sendBtn");


contactForm.addEventListener("submit", sendData);

function sendData(e) {
  e.preventDefault();
//   console.log(contactName.value);
//   console.log(contactEmail.value);
//   console.log(contactMessage.value);

  var data = JSON.stringify({
    Name: `${contactName.value}`,
    Email: `${contactEmail.value}`,
    Message: `${contactMessage.value}`,
  });

  contactForm.reset();
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
    //   console.log(this.responseText);
    }
  });

  xhr.open("POST", "https://gifsterdb-7ffd.restdb.io/rest/contactform");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("x-apikey", `${api_key}`);
  xhr.setRequestHeader("cache-control", "no-cache");

  xhr.send(data);

//   console.log("Data Send Successfully");

contactName.style.display="none";
contactEmail.style.display="none";
contactMessage.style.display="none";
sendBtn.style.display="none";
contactHeading.innerText="Thanks for contacting us. We will get back to you soon."
contactForm.style.display="flex";
contactForm.style.justifyContent="center";
contactForm.style.alignItems="center";
}
