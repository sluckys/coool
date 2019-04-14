//initialize the firebase app


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBVLECXu8cERB2OeDZ12vxAieV29RvX1nM",
    authDomain: "newproject-c9ee6.firebaseapp.com",
    databaseURL: "https://newproject-c9ee6.firebaseio.com",
    projectId: "newproject-c9ee6",
    storageBucket: "newproject-c9ee6.appspot.com",
    messagingSenderId: "759884414502"
  };


firebase.initializeApp(config);
//create firebase references
const Storage = firebase.storage();
const allImagesRef = Storage.ref().child('all-images')
const dbRef = firebase.database();
const userImagesRef = dbRef.ref('user-images');
const Auth = firebase.auth();
let user = null;
let userData = null;
const body = document.body;

Auth.onAuthStateChanged(updateUserStatus);

document.addEventListener("DOMContentLoaded", function(event) {
  const logoutButton = document.querySelector('#logout');
  const fbLoginButton = document.querySelector('#fbLogin');
  const twLoginButton = document.querySelector('#twLogin');
  const createPostButton = document.querySelector('#create-post');
  const preview = document.querySelector('#form-image-preview')

  const statusDropzone = document.querySelector('[file-drop]');
  const statusDropzonePreview = document.querySelector('[file-drop-preview]');

  const fileCollection = [];
  const fileDropzoneCollection = [];

  const events = [
    'dragenter',
    'dragleave',
    'dragover', // to allow drop
    'drop'
  ];
  events.forEach(e => {
    statusDropzone.addEventListener(e, (ev) => {
      ev.preventDefault();
      if (ev.type === 'dragenter') {
        statusDropzone.classList.add('solid-border');
      }
      if (ev.type === 'dragleave') {
        statusDropzone.classList.remove('solid-border');
      }
      if(ev.type === 'drop') {
        statusDropzone.classList.remove('solid-border');
        [].slice.call(ev.dataTransfer.files).map(f => fileDropzoneCollection.push(f));
        renderCollection(fileDropzoneCollection, statusDropzonePreview);
      }
    })
  })


  document.querySelector('#pictures').addEventListener('change', (e) => {
    const formData = extractFormData('#statusForm');
    while (fileCollection.length) {
      fileCollection.pop();
    }
    [].slice.call(formData.pictures).map(f => fileCollection.push(f));

    renderCollection(fileCollection, preview);
  });

  document.forms.statusForm.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = extractFormData('#statusForm');
    const text = formData.status;
    formData.status = '';
    sendData(text, fileCollection)
    setTimeout(() => {
      while (fileCollection.length) {
        fileCollection.pop();
      }
      document.forms.statusForm.reset()
    }, 100);
  });
  
  createPostButton.addEventListener('click', (e) => {
    const status = document.getElementById('status');
    const text = status.value;
    status.value = '';
    sendData(text, fileDropzoneCollection)
    setTimeout(() => {
      status.value = '';
      while (fileDropzoneCollection.length) {
        fileDropzoneCollection.pop();
      }
    }, 100);
  });
  
  logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    Auth.signOut();
  });
  fbLoginButton.addEventListener('click', (e) => {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile');
    request = Auth.signInWithPopup(provider)
    e.preventDefault();
    Auth.signOut();
  });
  twLoginButton.addEventListener('click', (e) => {
    const provider = new firebase.auth.TwitterAuthProvider();
    request = Auth.signInWithPopup(provider)
    e.preventDefault();
    Auth.signOut();
  });
  const renderCollection = (collection, container) => {
    removeAllChildren(container);
    Promise
      .all(collection.map(generatePreviewData))
      .then(imgs => imgs.map((img, i) => {
        img.setAttribute('index', i);
        img.addEventListener('click', e => {
          collection.splice(i, 1);
          renderCollection(collection, container);
        })
        container.appendChild(img);
      }))
  }
  const sendData = (text, files) => Promise
    .all(files.map(file =>
      saveImage(file, +(new Date) + '_' + Math.random(), allImagesRef, progress)
    )).then((values) => userImagesRef.child(user.uid).push({
      status: text,
      pictures: values,
      timestamp: +(new Date()),
    }));
});
