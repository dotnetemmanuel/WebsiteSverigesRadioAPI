// Denna fil ska innehålla er lösning till projektuppgiften.

"use strict";

/*  Delar till ej obligatorisk funktionalitet, som kan ge poäng för högre betyg
 *   Radera rader för funktioner du vill visa på webbsidan. */
//document.getElementById("player").style.display = "none"; // Radera denna rad för att visa musikspelare
document.getElementById("shownumrows").style.display = "none"; // Radera denna rad för att visa antal träffar

/* Här under börjar du skriva din JavaScript-kod */

/*I first decide to create an event listener that will reload the page when the user clicks on the logo, so that they can go back to seeing what is currently playing on P1, P2 and P3 (see below).*/
var logo = document.getElementById("logo");
logo.addEventListener("click", function () {
  location.reload();
});

//Event listener that containing functions to retrieve API information on load of DOM.
document.addEventListener("DOMContentLoaded", () => {
  //################## RIGHT NOW ##################
  //Creation of a main header to explain what content is displayed under
  var info = document.getElementById("info");
  var header = document.createElement("h1");
  info.appendChild(header);
  header.innerHTML = "Spelas just nu i våra tre första kanaler:";

  /*I decide to display what is currently playing on P1, P2 and P3 at page load. SR has made this information available via another API link, typical for each channel.
  i use fetch to retrieve information from API and convert response to json format. I create the necessary DOM elements for the information I want to display and retrieve the information from JSON. This is done individually for each channel. */
  //####P1
  function rightNowP1() {
    fetch(
      "http://api.sr.se/api/v2/scheduledepisodes/rightnow?channelid=132&format=json"
    )
      .then((res) => res.json())
      .then((data) => printRightNowP1(data));
  }

  function printRightNowP1(data) {
    var info = document.getElementById("info");
    var article = document.createElement("article");
    var P1name = document.createElement("h3");
    var P1image = document.createElement("img");
    P1image.setAttribute(
      "src",
      data.channel.currentscheduledepisode.socialimage
    );
    P1image.setAttribute("width", "100px");
    var P1title = document.createElement("h4");
    var P1description = document.createElement("p");

    article.appendChild(P1name);
    article.appendChild(P1image);
    article.appendChild(P1title);
    article.appendChild(P1description);
    info.appendChild(article);

    P1name.innerHTML = data.channel.name;
    P1title.innerHTML = data.channel.currentscheduledepisode.title;
    P1description.innerHTML = data.channel.currentscheduledepisode.description;
  }

  //####P2
  function rightNowP2() {
    fetch(
      "http://api.sr.se/api/v2/scheduledepisodes/rightnow?channelid=2562&format=json"
    )
      .then((res) => res.json())
      .then((data) => printRightNowP2(data));
  }

  function printRightNowP2(data) {
    var info = document.getElementById("info");
    var article = document.createElement("article");

    var P2name = document.createElement("h3");
    var P2image = document.createElement("img");
    P2image.setAttribute(
      "src",
      data.channel.currentscheduledepisode.socialimage
    );
    P2image.setAttribute("width", "100px");
    var P2title = document.createElement("h4");
    var P2description = document.createElement("p");

    article.appendChild(P2name);
    article.appendChild(P2image);
    article.appendChild(P2title);
    article.appendChild(P2description);
    info.appendChild(article);

    P2name.innerHTML = data.channel.name;
    P2title.innerHTML = data.channel.currentscheduledepisode.title;
    P2description.innerHTML = data.channel.currentscheduledepisode.description;
  }

  //####P3
  function rightNowP3() {
    fetch(
      "http://api.sr.se/api/v2/scheduledepisodes/rightnow?channelid=164&format=json"
    )
      .then((res) => res.json())
      .then((data) => printRightNowP3(data));
  }

  function printRightNowP3(data) {
    var info = document.getElementById("info");
    var article = document.createElement("article");

    var P3name = document.createElement("h3");
    var P3image = document.createElement("img");
    P3image.setAttribute(
      "src",
      data.channel.currentscheduledepisode.socialimage
    );
    P3image.setAttribute("width", "100px");
    var P3title = document.createElement("h4");
    var P3description = document.createElement("p");

    article.appendChild(P3name);
    article.appendChild(P3image);
    article.appendChild(P3title);
    article.appendChild(P3description);
    info.appendChild(article);

    P3name.innerHTML = data.channel.name;
    P3title.innerHTML = data.channel.currentscheduledepisode.title;
    P3description.innerHTML = data.channel.currentscheduledepisode.description;
  }

  //################## END OF RIGHT NOW ##################

  function getData() {
    fetch("http://api.sr.se/api/v2/channels?format=json")
      .then((res) => res.json())
      .then((data) => printData(data));
  }
  var header = document.getElementById("mainheader");

  /*After fetching of the API, I print channel names from API to the left menu by creating new DOM elements. For this, I use a for loop, that loops through all channels (on the first page of JSON). I then set title and id attributes to li elements that i get from the API. I also choose to add a data attribute with the value of the channel color from the api.  */
  function printData(data) {
    for (var ch of data.channels) {
      var ul = document.getElementById("mainnavlist");
      var li = document.createElement("li");

      li.setAttribute("id", ch.id);
      li.setAttribute("title", ch.tagline);
      li.setAttribute("data", ch.color);
      li.innerHTML = ch.name;

      ul.appendChild(li);

      //Creation of new event listener that will on click (of the channel names to the left) retieve and print programe schedule for the channel in question. It is done by calling the getInfo function
      li.addEventListener("click", getInfo);
    }
    /*getInfo will fetch new information from the link in the JSON element containing a url for each channel. The start of the url is the same for all channels. Only the id at the end changes. so I create a new url by concatenationg the beginning of the url with the channel id that I retrieve from the previous function using the *this* keyword and the end of the url. Here, I want to be able to retrieve the schedule for the whole day. As it is by default contained om several pages, turn the pagination to false in the url, which will help get whole day information.*/
    function getInfo() {
      var url = "http://api.sr.se/v2/scheduledepisodes?channelid=";
      var jsonstr = "&format=json&pagination=false";
      var scheduleUrl = url + this.id + jsonstr;
      var info = document.getElementById("info");
      info.innerHTML = "";

      //I add the style attribute to the page's header and gives it the bakcground-color property. The value of it is the color stores in the data attribute of the li elements. Upon click, the header color will change and display the channel color.
      header.setAttribute(
        "style",
        "background-color: #" + this.getAttribute("data")
      );
      /*
I use a regular fetch method to get the content of the API and convert it to JSON to be able to retrieve information from it. I then create a new variable called prog that will contained the result of the schedule API.
*/
      fetch(scheduleUrl)
        .then((res) => res.json())
        .then((data) => {
          var prog = data.schedule;
          /*
I loop through att programs and create new DOM elements as per instruction for each program. 
******I decide to event include program image that will be displayed with each. I set new attributes to the img element to be able to controle the source of the image and its size.
*/
          for (var i = 0; i < prog.length; i++) {
            var info = document.getElementById("info");
            var program = document.createElement("article");
            var title = document.createElement("h3");
            var timeSlot = document.createElement("h5");
            var description = document.createElement("p");
            var img = document.createElement("img");
            img.setAttribute("src", prog[i].imageurl);
            img.setAttribute("width", "100px");

            //get program start and end time from API
            var startTime = prog[i].starttimeutc;
            var endTime = prog[i].endtimeutc;

            //convert JSON formatted time
            var newStart = new Date(parseInt(startTime.substr(6)));
            var newEnd = new Date(parseInt(endTime.substr(6)));

            /*allocating time data to start and end variables by using get() methods and adding a zero to hours and minutes inferior to 10 to improve readability as well as ensuring functionality for some timeslots as times directly after midnight will otherwise impact the schedule, not showing anything before 10. (See upcoming comment on time comparinson for displaying only current and upcoming programs.)*/
            var prHoursStart = newStart.getHours();
            if (prHoursStart < 10) prHoursStart = "0" + prHoursStart;
            var prMinutesStart = newStart.getMinutes();
            if (prMinutesStart < 10) prMinutesStart = "0" + prMinutesStart;
            var prTimeStart = prHoursStart + ":" + prMinutesStart;

            var prHoursEnd = newEnd.getHours();
            if (prHoursEnd < 10) prHoursEnd = "0" + prHoursEnd;
            var prMinutesEnd = newEnd.getMinutes();
            if (prMinutesEnd < 10) prMinutesEnd = "0" + prMinutesEnd;
            var prTimeEnd = prHoursEnd + ":" + prMinutesEnd;

            //getting current system time
            var date = new Date();
            var hours = date.getHours();
            if (hours < 10) hours = "0" + hours;
            var minutes = date.getMinutes();
            if (minutes < 10) minutes = "0" + minutes;

            var currentTime = hours + ":" + minutes;

            //comparing program time to current time to show only current and upcoming programs
            if (prTimeStart < currentTime) info.innerHTML = "";

            //changing inner HTML of created HTML elements by allocating data from API
            title.innerHTML = prog[i].title;
            timeSlot.innerHTML = prTimeStart + " - " + prTimeEnd;
            description.innerHTML = prog[i].description;

            //appending created HTML elements to HTML element with ID "info".
            program.appendChild(title);
            program.appendChild(timeSlot);
            program.appendChild(description);
            info.appendChild(program);
            info.appendChild(img);

            console.log(data);
          }
        });
    }
  }

  /*Fetching of whole program list from the API - use of pagination=false to retrieve all channels instead of only the 10 first ones contained on page 1.*/
  function getAllData() {
    fetch("http://api.sr.se/api/v2/channels?format=json&pagination=false")
      .then((res) => res.json())
      .then((data) => printAllData(data));
  }

  /*
  After fetching the API, I then display all channel names in the dropdown list by looping through the JSON file. Every channel is contained in newly added option elements, contained in the select element (dropdown menu).
  */
  var playButton = document.getElementById("playbutton");
  function printAllData(data) {
    /*I add a first option to the select element with id playchannel to be able to display that the user can choose a channel to play the livestream. */
    var playChannel = document.getElementById("playchannel");
    var optionChoice = document.createElement("option");

    optionChoice.innerHTML = "Välj kanal";
    playChannel.appendChild(optionChoice);

    document.addEventListener("load", getRadioID);

    var ch = data.channels;
    for (var i = 0; i < ch.length; i++) {
      var playChannel = document.getElementById("playchannel");
      var option = document.createElement("option");
      option.setAttribute("id", ch[i].id);
      option.innerHTML = ch[i].name;
      playChannel.appendChild(option);
    }

    /*Creation of an event listener that will retrieve the id of the selected channel (option) in the select element (dropdown menu). It will fire the getRadioID function */
    playChannel.addEventListener("change", getRadioID);

    //I create the audio element and the source element that will be contained within audio.
    var audio = document.createElement("audio");
    var source = document.createElement("source");
    /* This function retrieves the ID of the selected option (index). To check that thsi is working, I add a console.log() but this is just for the sake of writing functioning code and is not necessary*/
    function getRadioID() {
      var optionID = playChannel.options[playChannel.selectedIndex].id;
      console.log(optionID);

      /*Creation of an event listener that will automatically play the livestream from the selected channel. It will use the start of the liveurl, which is common to all channels, concatenate it with the retrieved id and add the .mp3 extension (as a string) to the end of the url. */
      playButton.addEventListener("click", playRadio);
      function playRadio() {
        var radioPlayer = document.getElementById("radioplayer");
        radioPlayer.innerHTML = "";
        var liveAudioURL = "http://sverigesradio.se/topsy/direkt/srapi/";
        var string = ".mp3";
        var newLiveURL = liveAudioURL + optionID + string;

        /* Creation of DOM elements audio and source, that will be used to display a player. The attribute controls is necessary for this elements to be displayed and the autoplay attribute will make sure the stream plays automatically. I retrieve the whole url and define it as the src attribiute's value.*/

        source.setAttribute("src", newLiveURL);
        source.setAttribute("type", "audio/mpeg");
        audio.appendChild(source);
        radioPlayer.appendChild(audio);
        audio.setAttribute("controls", "");

        //I add the load and play methods to the audio element in order to reload it completely on click to avoid overload and dysfunctionality. I
        audio.load();
        audio.play();
      }
    }
  }

  rightNowP1();
  rightNowP2();
  rightNowP3();
  getData();
  getAllData();
});
