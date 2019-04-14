
     // Initialize Firebase
     var config = {
       apiKey: "AIzaSyCfu9U7qC4KiHeIjqaXzWxWjRksa5AoPQA",
       authDomain: "upload-69235.firebaseapp.com",
       databaseURL: "https://upload-69235.firebaseio.com",
       projectId: "upload-69235",
       storageBucket: "upload-69235.appspot.com",
       messagingSenderId: "572296323113"
     };
     firebase.initializeApp(config);


  //get elements

  var upload = document.getElementById('upload');
  var fileButton = document.getElementById('fileButton');

  //listen for list 
  fileButton.addEventListener('change',function(e){

    var file = e.target.files[0];

    var storageRef = firebase.storage().ref( 'folder_name/ +file.name ' );

    var task = storageRef.put(file);

    task.on('state_changed',
      function progress(snapshot){
           var percentage = (snapshot.bytesTransferred /
           snapshot.totalBytes) * 100;
           upload.value = percentage;
      },

      function  error(err) {
        
      },
      function complete(){

      },
    )
  });
  