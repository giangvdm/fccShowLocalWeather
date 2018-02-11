var dest = document.getElementById("myLocation");

function geoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(myPos);
    }
    else {
        dest.innerHTML = "Geolocation is not supported or not allowed!";
    }
}

function myPos(position) {
    var lat = position.coords.latitude ;
    var lng = position.coords.longitude;
}

function submit() {

}