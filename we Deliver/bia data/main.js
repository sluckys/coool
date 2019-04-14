// Initialize Firebase (ADD YOUR OWN DATA)
var config = {
  apiKey: "AIzaSyBVLECXu8cERB2OeDZ12vxAieV29RvX1nM",
  authDomain: "newproject-c9ee6.firebaseapp.com",
  databaseURL: "https://newproject-c9ee6.firebaseio.com",
  projectId: "newproject-c9ee6",
  storageBucket: "newproject-c9ee6.appspot.com",
  messagingSenderId: "759884414502"
};
firebase.initializeApp(config);

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener
('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var PresentAddress = getInputVal('PresentAddress');
  var permanentAddress = getInputVal('permanentAddress');
  var aadhar = getInputVal('aadhar');
  var pan = getInputVal('pan');
  var dl = getInputVal('dl');
  var Bankaccountno=getInputVal('Bankaccountno');
  var bankaccountholdername=getInputVal('bankaccountholdername');
  var icfno=getInputVal('icfno');
  var bankname=getInputVal('bankname');
  
  var message = getInputVal('message');

  // Save message
  saveMessage(name, PresentAddress,permanentAddress, aadhar, pan,dl,Bankaccountno,bankaccountholdername,icfno,bankname,message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, PresentAddress,permanentAddress, aadhar, pan,dl,Bankaccountno,bankaccountholdername,icfno, bankname,message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    PresentAddress: PresentAddress,
    permanentAddress :permanentAddress,
    aadhar:aadhar,
    pan:pan,
    dl:dl,
    Bankaccountno:Bankaccountno,
    bankaccountholdername:bankaccountholdername,
    icfno:icfno,
    bankname:bankname,
    message:message
  });
}