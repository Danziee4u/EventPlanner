
// localStorage.removeItem('getUid');
var currentUser = JSON.parse(localStorage.getItem('currentUser'));
// console.log(currentUser);
var database = firebase.database().ref('/');



///////////////////////////////////////////
// This Is For Getting User ID
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    
    console.log('Inside : ' + user.uid)
    localStorage.setItem('myUid', JSON.stringify(user.uid));
  }
});

// Store User Id In Variable Named getUid
var getUid = JSON.parse(localStorage.getItem('myUid'));
console.log('Outside : ' + getUid);
////////////////////////////////////////////



//////////////////////////////////////////////////////////
// Getting Access To Input Fields And Save Them In Variables
var eventName = document.getElementById('eventName');
var organizationName = document.getElementById('organizationName'); 
var eventLocation = document.getElementById('eventLocation');
var date = document.getElementById('date');
////////////////////////////////////////////////


///////////////////////////////////////////////////////
// Making Object To Store In Database And Pushing It In Database
function submitEvent(){
    var post = {
        eventName : eventName.value,
        organizationName : organizationName.value,
        eventLocation : eventLocation.value,
        date : date.value 
    }

    eventName.value = '';
    organizationName.value = '';
    eventLocation.value = '';
    date.value = '';
    console.log(post);
    database.child('events'+ getUid ).push(post);
    database.child('events').push(post);

    
}
/////////////////////////////////////////////////////


//////////////////////////////////////////////////////
function logout(){
    firebase.auth().signOut().then(function(){
        window.localStorage.removeItem("currentUser");
        window.localStorage.clear();
        location = 'login.html';
    }, function(error){
        console.error('Sign Out Error',error);
    })
}
///////////////////////////////////////////////////////////////

var unsubscribe = firebase.auth().onAuthStateChanged(function (anything) {
   

    if(currentUser.name===null){
    location = 'login.html';
}

});

    unsubscribe();
////////////////////////////////

var database = firebase.database().ref('/');
var feeds = document.getElementById('allEvents');


database.child('events'+ getUid).on('child_added', function (snapshot) {

    var obj = snapshot.val();
    obj.id = snapshot.key;

    render(obj);
});

// database.child('comments').on('child_added', function (snapshot) {

//     var obj = snapshot.val();

//     renderComment(obj);
// });


function render(events){
    var mainDiv = document.createElement('DIV');
    mainDiv.setAttribute('id', events.id);
    mainDiv.setAttribute('class', 'card');

    var div = document.createElement('DIV');
    div.setAttribute('class', 'card-body');

    var span = document.createElement('SPAN');
    var eventNameTag = document.createElement('H3');
    eventNameTag.setAttribute('class','card-title card-header');
    var spanEventName = document.createElement('SPAN');
    spanEventName.setAttribute('id','spanEventName'+events.id);
    var eventName = document.createTextNode('Event Name : ' + events.eventName + ' ');
    spanEventName.appendChild(eventName);
    eventNameTag.appendChild(spanEventName);

    var organizationNameTag = document.createElement('H5');
    organizationNameTag.setAttribute('class','card-text card-header');
    var organizationNameTxt = document.createTextNode('Organization Name : ' + events.organizationName);
    var spanOrganizationName = document.createElement('SPAN');
    spanOrganizationName.setAttribute('id','spanOrganizationName'+events.id);
    spanOrganizationName.appendChild(organizationNameTxt);
    organizationNameTag.appendChild(spanOrganizationName);


    span.appendChild(eventNameTag);
    span.appendChild(organizationNameTag);
    div.appendChild(span);

    var eventLocationTag = document.createElement('H5');
    eventLocationTag.setAttribute('class','card-text card-header');
    var eventLocationTxt = document.createTextNode('Event Location : ' + events.eventLocation);
    var spanLocation = document.createElement('SPAN');
    spanLocation.setAttribute('id','spanLocation'+events.id);
    spanLocation.appendChild(eventLocationTxt);
    eventLocationTag.appendChild(spanLocation);
    
    span.appendChild(eventLocationTag);
    

    var dateTag = document.createElement('H5');
    dateTag.setAttribute('class','card-text card-header');
    var dateTxt = document.createTextNode(' Date : ' + events.date);
    var spanDate = document.createElement('SPAN');
    spanDate.setAttribute('id','spanDate'+events.id);
    spanDate.appendChild(dateTxt);
    dateTag.appendChild(spanDate);
    
    span.appendChild(dateTag);


    var editBtn = document.createElement('BUTTON');
    editBtn.setAttribute('class','btn btn-secondary');
    editBtn.setAttribute('id','editBtn');
    var editBtnTxt = document.createTextNode('Edit');
    editBtn.onclick = function(){
       edit(events)
    }

    div.appendChild(editBtn);

    editBtn.appendChild(editBtnTxt);
/////////////////////////////////////////////
    var dltBtn = document.createElement('BUTTON');
    dltBtn.setAttribute('class','btn btn-danger');
    var dltBtnTxt = document.createTextNode('Delete');
    dltBtn.onclick = function(){
        remove(events);

    }

    div.appendChild(dltBtn);

    dltBtn.appendChild(dltBtnTxt);


    

    mainDiv.appendChild(div); 
    allEvents.appendChild(mainDiv);

//    sortDate(events);

}




database.child("events").on("child_removed", function (snapshot) {
    var cardToRemove = document.getElementById(snapshot.key);
    console.log('To Dlt : ' +cardToRemove);
    // ye remove() javascript ka function hy
    cardToRemove.remove();
});

database.child("events"+getUid).on("child_removed", function (snapshot) {
    var cardToRemove = document.getElementById(snapshot.key);
    console.log('To Dlt : ' +cardToRemove);
    // ye remove() javascript ka function hy
    cardToRemove.remove();
});


function remove(events) {

    // ye remove() Firebase ka function hy
    database.child("events/" + events.id).remove();
    database.child("events" + getUid + "/" + events.id).remove();
    // database.child("events" + getUid + "going/" + events.id).remove();
    

}



function edit(events) {
    var newEventName = prompt("Enter Event Name", events.eventName);
    var newOrganizationName = prompt("Enter Organization Name", events.oganizationName);
    var newEventLocation = prompt("Enter Location", events.eventLocation);
    var newDate = prompt("Enter Date", events.date); // taking new value from user
    var newData = {
        eventName : newEventName,
        organizationName : newOrganizationName,
        eventLocation : newEventLocation,
        date : newDate
    }
    database.child("events/" + events.id).update(newData);
    database.child("events"+getUid+"/" + events.id).update(newData);
     // updating data at database
}



database.child("events"+getUid+"/").on("child_changed", function (data) {    // updating at ui
    // var deletedLi = document.getElementById(data.key);
    var eEventName = document.getElementById('spanEventName'+data.key);
    var eOrganizationName = document.getElementById('spanOrganizationName'+data.key);
    var eEventLocation = document.getElementById('spanLocation'+data.key);
    var eEventDate = document.getElementById('spanDate'+data.key);
    
    // var textSpan = deletedLi.firstChild;
    // textSpan.innerText = data.val().name;

    eEventName.innerText = data.val().eventName;
    eOrganizationName.innerText = data.val().organizationName;
    eEventLocation.innerText = data.val().eventLocation;
    eEventDate.innerText = data.val().date;
})



database.child("events"+getUid+"/").on("child_changed", function (data) {    // updating at ui
    // var deletedLi = document.getElementById(data.key);
    var eEventName = document.getElementById('spanEventName'+data.key);
    var eOrganizationName = document.getElementById('spanOrganizationName'+data.key);
    var eEventLocation = document.getElementById('spanLocation'+data.key);
    var eEventDate = document.getElementById('spanDate'+data.key);
    
    // var textSpan = deletedLi.firstChild;
    // textSpan.innerText = data.val().name;

    eEventName.innerText = "Event Name : " + data.val().eventName;
    eOrganizationName.innerText = "Organization Name" + data.val().organizationName;
    eEventLocation.innerText = "Event Location" + data.val().eventLocation;
    eEventDate.innerText = "Date" + data.val().date;
})


function logout(){
    firebase.auth().signOut().then(function(){
        location = 'login.html';
    }, function(error){
        console.error('Sign Out Error',error);
    })
}


function goToHome(){
    location = 'home.html';
}






// var reloadCount = true;

// if(reloadCount)
// {
//     location.reload();
//     reloadCount = false;
//     JSON.parse(localStorage.setItem('reloadCount'));
    
// }

// $(document).ready(function(){    
//     //Check if the current URL contains '#'
//     if(document.URL.indexOf("#")==-1){
//         // Set the URL to whatever it was plus "#".
//         url = document.URL+"#";
//         location = "#";

//         //Reload the page
//         location.reload();
//     }
// });


(function()
{
  if( window.localStorage )
  {
    if( !localStorage.getItem('firstLoad') )
    {
      localStorage['firstLoad'] = true;
      window.location.reload();
    }  
    else
      localStorage.removeItem('firstLoad');
  }
})();



document.addEventListener('contextmenu', event => event.preventDefault());



// function sortDate(events){
//     console.log(events);

// }