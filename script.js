function showCity(){
    let City_id = document.getElementById("city-select");
    let cities = document.getElementsByClassName("city_div");

    for(i=0; i<cities.length;i++){
        if (City_id.value != cities[i].id){
            cities[i].style.display="none";
            if (City_id.selectedIndex != 0)
                document.getElementById('selected_city').innerHTML = 'Vous avez choisi : '+ City_id.options[City_id.selectedIndex].text;
            else
                document.getElementById('selected_city').innerHTML = 'Vous avez choisi : ';
        }
        else{
            cities[i].style.display="";
        }
    }
}

// utilisant openweathermap APIs 
function showCityOpenWeather(){
    let City_id = document.getElementById("city-select");
    let cities = document.getElementsByClassName("city_div");

    var respons;
    var xhttp = new XMLHttpRequest();
    if (City_id.selectedIndex != 0){ // ignore the first dummy option : '--Please choose an option--'
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                respons = JSON.parse(xhttp.responseText);

                //set weather info inside the div
                document.getElementById(City_id.value).innerHTML = '<div><h3>'+City_id.options[City_id.selectedIndex].text+'</h3><p>'+respons.main.temp+'°, '+respons.weather[0].main+'</p></div><img src="http://openweathermap.org/img/wn/'+respons.weather[0].icon+'@4x.png">';
                for(i=0; i<cities.length;i++){
                    if (City_id.value != cities[i].id){
                        cities[i].style.display="none";
                        document.getElementById('selected_city').innerHTML = 'Vous avez choisi : '+ City_id.options[City_id.selectedIndex].text;
                    }
                    else{
                        cities[i].style.display="";
                    }
                }
            }
        };
        xhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+City_id.options[City_id.selectedIndex].text+"&appid=85b44872c7f62d2f6f59116b303ea6b2&units=metric", true);
        xhttp.send();
    }
    else{ // reset if '--Please choose an option--' is selected
        for(i=0; i<cities.length;i++){
                cities[i].style.display="none";
        }
        document.getElementById('selected_city').innerHTML = 'Vous avez choisi : ';
    }
}

/*

[respons.main.temp, respons.weather[0].main, respons.weather[0].icon]


*/