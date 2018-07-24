  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDr2OG4jV2_nV14cEayOquZTErGboEqjro",
    authDomain: "laceytrainscheduler.firebaseapp.com",
    databaseURL: "https://laceytrainscheduler.firebaseio.com",
    projectId: "laceytrainscheduler",
    storageBucket: "laceytrainscheduler.appspot.com",
    messagingSenderId: "636654410059"
  };
  firebase.initializeApp(config);

const database = firebase.database();
 
  var trainDatabase = database.ref("trainDatabase")

  var trainName = "";
  var destination = "";
  var firstTrainTime = "00:00";
  var frequency = 3;


  var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);
  
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
  
  var tRemainder = diffTime % parseInt(frequency);
  console.log(tRemainder);
  

  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
 
  $("#add-train").on("click", function(event){
      event.preventDefault();
      trainName = $("#train").val().trim();
      destination = $("#destination").val().trim();
      firstTrainTime = $("#firstTT").val().trim();
      frequency = $("#frequency").val().trim();
            console.log(frequency);
      trainDatabase.push({
          trainName: trainName,
          destination: destination,
          firstTrainTime: firstTrainTime,
          frequency: frequency
      });
      $("#train").val("")
      $("#destination").val("")
      $("#firstTT").val("")
      $("#frequency").val(null)
  });


trainDatabase.on("child_added", function(childSnapshot){
  $("tBody").append("<tr class='well'><td class='train-name'> " + childSnapshot.val().trainName +
  " </td><td class='train-destination'> " + childSnapshot.val().destination +
    " </td><td class='first-train-time'> " + childSnapshot.val().firstTrainTime +
    " </td><td class='train-frequency'> " + childSnapshot.val().frequency + 
    " </td><td class='train-minutes'> " +  childSnapshot.val().tMinutesTillTrain + " </td></tr>");
    
  });
      
trainDatabase.orderByChild("dataAdded").limitToLast(1).on("child_added", function(snapshot) {

});
