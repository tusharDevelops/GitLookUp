const searchbar = document.querySelector(".searchbar-container");

const profilecontainer = document.querySelector(".profile-container");

const allCss = document.documentElement.style;

const get = (param)=>{
return document.getElementById(`${param}`);
};

//API
const gitApi = "https://api.github.com/users/";

const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const input = get("input")
const btnsubmit = get("submit");
const noresults = get("no-results");
const avatar = get("avatar");
const userName = get("name");
const user  = get("user");
const date = get("date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");


let darkMode = false;

btnsubmit.addEventListener('click', ()=>{
    if(input.value !== ""){
        getUserData(gitApi + input.value);
    }
});



//bubbling phase me capture hoga event 

input.addEventListener(
    "keydown",
    function (e) {
      if (e.key == "Enter") {
        if (input.value !== "") {
          getUserData(gitApi + input.value);
        }
      }
    },false
    
  );
///////////////////////////




  input.addEventListener("input", function () {
    noresults.style.display = "none";
  });


function updateProfile(data){
    if(data.message !== "Not Found"){
        function checkNull(param1, param2) {
            if (param1 === "" || param1 === null) {
              param2.style.opacity = 0.5;
              param2.previousElementSibling.style.opacity = 0.5;
              return false;
            } else {
              return true;
            }
          }

        noresults.style.display = "none"
        avatar.src = `${data.avatar_url}`;
        userName.innerText = data.name === null ? data.login : data.name;
        user.innerText = `@${data.login}`;
        user.href = `${data.html_url}`;

        datesegments = data.created_at.split("T").shift().split("-");
        date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;

        bio.innerText = data.bio === null ? "This profile has no bio" : `${data.bio}`;
        repos.innerText = `${data.public_repos}`;
        followers.innerText = `${data.followers}`;
        following.innerText = `${data.following}`;
        user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
        page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
        page.href = checkNull(data.blog, page) ? data.blog : "#";
        twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
        twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
        company.innerText = checkNull(data.company, company) ? data.company : "Not Available"; 
        searchbar.classList.toggle("active");
        profilecontainer.classList.toggle("active"); 


    }
    else{
        noresults.style.display = "block";
    }
}



//both ways are same
// function getUserData(gitUrl) {
//     fetch(gitUrl)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         updateProfile(data);
//       })
//       .catch((error) => {
//         throw error;
//       });
//   }

async function getUserData(gitUrl){
    try{
    const response = await fetch(gitUrl);
    const data  = await response.json();
    updateProfile(data);
    }
    catch(err){
        throw err;
    }

}



btnmode.addEventListener('click', function(){
    //agr current situation me darkmode band hai to dark mode on karo
    if(darkMode==false){
        darkModeProperties();
    }
    // agr current sitution me darkmode chalo hai to light mode jajalo
    else{
       lightModeProperties();
    }
});




//activate lightmode
function lightModeProperties(){
    allCss.setProperty("--lm-bg", "#F6F8FF");
    allCss.setProperty("--lm-bg-content", "#FEFEFE");
    allCss.setProperty("--lm-text", "#4B6A9B");
    allCss.setProperty("--lm-text-alt", "#2B3442");
    allCss.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modetext.innerText = "DARK";
    modeicon.src = "./assets/images/moon-icon.svg";
    allCss.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode=false;
    localStorage.setItem("dark-mode", false);

}

//activate darkmode
function darkModeProperties(){
    allCss.setProperty("--lm-bg", "#141D2F");
    allCss.setProperty("--lm-bg-content", "#1E2A47");
    allCss.setProperty("--lm-text", "white");
    allCss.setProperty("--lm-text-alt", "white");
    allCss.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modetext.innerText = "LIGHT";
    modeicon.src = "./assets/images/sun-icon.svg";
    allCss.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
    localStorage.setItem("dark-mode", true);
   
}




//int ui

function init(){
    darkMode = false;

    const value = localStorage.getItem("dark-mode");

    if(value==null){
        localStorage.setItem("dark-mode", darkMode);
        lightModeProperties();
    }
    else if(value=="true"){
        darkModeProperties();
    }
    else if(value=="false"){
        lightModeProperties();
    }

    getUserData(gitApi + "thepranaygupta");
}

init();
