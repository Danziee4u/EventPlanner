var database = firebase.database().ref('/');
var feeds = document.getElementById('allEvents');
var currentUser = JSON.parse(localStorage.getItem('currentUser'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    
    console.log('Inside : ' + user.uid)
    localStorage.setItem('myUid', JSON.stringify(user.uid));
  }
});


var getUid = JSON.parse(localStorage.getItem('myUid'));
console.log('Outside : ' + getUid);

database.child('events').on('child_added', function (snapshot) {

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
    mainDiv.setAttribute('id', 'div'+events.id);
    mainDiv.setAttribute('class', 'card');

    var div = document.createElement('DIV');
    div.setAttribute('class', 'card-body');

    var span = document.createElement('SPAN');
    var eventNameTag = document.createElement('H3');
    eventNameTag.setAttribute('class','card-title card-header');
    var eventName = document.createTextNode('Event Name : ' + events.eventName + ' ');
    eventNameTag.appendChild(eventName);

    var organizationNameTag = document.createElement('H5');
    organizationNameTag.setAttribute('class','card-text card-header');
    var organizationNameTxt = document.createTextNode('Organization Name : ' + events.organizationName);
    organizationNameTag.appendChild(organizationNameTxt);

    span.appendChild(eventNameTag);
    span.appendChild(organizationNameTag);
    div.appendChild(span);

    var eventLocationTag = document.createElement('H5');
    eventLocationTag.setAttribute('class','card-text card-header');
    var eventLocationTxt = document.createTextNode('Event Location : ' + events.eventLocation);
    eventLocationTag.appendChild(eventLocationTxt);
    
    span.appendChild(eventLocationTag);
    

    var dateTag = document.createElement('H5');
    dateTag.setAttribute('class','card-text card-header');
    var dateTxt = document.createTextNode(' Date : ' + events.date);
    dateTag.appendChild(dateTxt);
    
    span.appendChild(dateTag);


    var goingBtn = document.createElement('BUTTON');
    goingBtn.setAttribute('class','btn btn-primary');
    goingBtn.setAttribute('id','goingBtn');
    var goingBtnTxt = document.createTextNode('Going');
    goingBtn.onclick = function(){
            goingFunc(events);
    }

    div.appendChild(goingBtn);

    goingBtn.appendChild(goingBtnTxt);
/////////////////////////////////////////////
    var notGoingBtn = document.createElement('BUTTON');
    notGoingBtn.setAttribute('class','btn btn-primary');
    var notGoingBtnTxt = document.createTextNode('Not Going');
    notGoingBtn.onclick = function(){
        // Do Something With Not Going
    }

    div.appendChild(notGoingBtn);

    notGoingBtn.appendChild(notGoingBtnTxt);


    

    mainDiv.appendChild(div); 
    allEvents.appendChild(mainDiv);



    

}



function logout(){
    firebase.auth().signOut().then(function(){
        window.localStorage.removeItem("currentUser");
        window.localStorage.clear();
        location = 'login.html';
    }, function(error){
        console.error('Sign Out Error',error);
    })
}


function goToHome(){
    location = 'home.html';
}


function goingFunc(events){
    var eventToRemove = document.getElementById('div'+events.id);
    eventToRemove.style.display = 'none';

    database.child('events'+ getUid + 'going' ).push(events);


}


document.addEventListener('contextmenu', event => event.preventDefault());





