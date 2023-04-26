

let educationData = [];
let personalData = [];
let overview = [];
let skill = [];
let experiene = [];
let certification = [];
let projects = [];

async function addSkill() {
  var skillName = $("#skill-name").val();
  var skillLevel = $("#skill-level").val();
  var userTest = 1

  if (skillName && skillLevel) {
    $("#skill-name").val("");
    $("#skill-level").val("");

    var skillData ={skillName, skillLevel }

    skill.push(skillData);
    console.log(skill);
    var skillItem = $("<li>").html(
      "<strong>" + skillName + "</strong> - " + skillLevel
    );
    $("#skills-list").append(skillItem);
  }

  response = await fetch("/profile/new/skill",{

    method: "POST",
    body: JSON.stringify({skillData,userTest}),
    headers: { "Content-Type": "application/json" },
  })



}

async function saveOverview() {
  var overviewText = $("#overview-text").val();
  var userTest = 1
  // let overviewData = {
  //   overviewText: overviewText,
  // };
  // overview = overviewData;

response = await fetch("/profile/new",{

  method: "POST",
  body: JSON.stringify({ overviewText,userTest  }),
  headers: { "Content-Type": "application/json" },
})

}




async function addEducation() {
    var school = $("#school").val();
    var degree = $("#degree").val();
    var startDate = $("#start-date").val();
    var endDate = $("#end-date").val();
    var eduText = $("#education-text").val();
    var userTest = 1

    console.log(startDate)
    var educationItem = {
      school: school,
      degree: degree,
      startDate: startDate,
      endDate: endDate,
      eduText: eduText,
    };
    console.log(educationItem)

    response = await fetch("/profile/new/education",{

      method: "POST",
      body: JSON.stringify({ educationItem,userTest  }),
      headers: { "Content-Type": "application/json" },
    })
  };



$(".nav-link").on("click", function () {
  const links = $(".nav-link");
  const progress = ((links.index(this) + 1) / links.length) * 100;
  const progressBar = $(".progress-bar");
  progressBar.css("width", progress + "%");
  progressBar.attr("aria-valuenow", progress);
});

async function addPersonal() {
  var name = $("#name").val();
  var email = $("#email").val();
  var phone = $("#phone").val();
  var address = $("#address").val();
  var github = $("#github").val();
  var linkedin = $("#linkedin").val();
  var portfolio = $("#portfolio").val();
  var profilePic = $("#profile-pic").val();

  let perosnalcollection = {
    name: name,
    email: email,
    phone: phone,
    address: address,
    github: github,
    linkedin: linkedin,
    portfolio: portfolio,
    profilePic: profilePic,
  };
  console.log(perosnalcollection)

  response = await fetch("/profile/new/person",{

    method: "POST",
    body: JSON.stringify({ perosnalcollection}),
    headers: { "Content-Type": "application/json" },
  })
  
  personalData = perosnalcollection;
  console.log(personalData);
}

// $(".submitbutton").click(function(){
 
//   const resumeData = {
//     educationData: educationData,
//     personalData: personalData,
//     overview: overview,
//     skill: skill,
//     experiene: experiene,
//     certification: certification,
//     projects: projects
//   };
// console.log(resumeData)
// })



// function disableEnddate(){
//   var currentJb =$("#current-job").val()

//   if(currentJb){
//     $("#end-date").disabled = true;
//   }
//   console.log(currentJb)
// }

async function addWorkExperience() {


  var jobTitle = $("#job-title").val()
  var companyName = $("#company-name").val()
  var location = $("#job-location").val()
  var startDate = $("#start-date").val()
  var endDate = $("#end-date").val()
  var responsibility = $("#responsibility").val()

  var userTest = 1;

  let experiencedata = {
    companyName: companyName,
    endDate: endDate,
    jobTitle: jobTitle,
    location : location,
    responsibility: responsibility,
    startDate: startDate,
    userTest : userTest
  }

  console.log(experiencedata)

  response = await fetch("/profile/new/experience",{

    method: "POST",
    body: JSON.stringify({experiencedata}),
    headers: { "Content-Type": "application/json" },
  })
  


}  
























// $("#deleteexp").click(function() {
//   console.log("i clied")
//   var index = $(this).data("index");
//  experiene.splice(index, 1);
//  $(this).closest(".card").remove();
// });

async function addCertification() {
var certName = $("#certification-name").val()
var issueOrg =  $("#issuing-org").val()
var deteEarned = $("#date-earned").val()
var expireDate = $("#expiration-date").val()
var userTest = 1;

let certificateDate = {
  certName :certName,
  issueOrg : issueOrg,
  deteEarned : deteEarned,
  expireDate :expireDate,
  userTest : userTest
}


response = await fetch("/profile/new/certification",{

  method: "POST",
  body: JSON.stringify({ certificateDate }),
  headers: { "Content-Type": "application/json" },
})

}

async function addproject(){

  var projectName = $("#project-name").val();
  var yourRole = $("#your-title").val();
  var startDate = $("#start-date").val();
  var endDate = $("#end-date").val();
  var responsibility = $("#responsibility").val();
  var userTest = 1

  let projectData = {
    projectName :projectName,
    yourRole:yourRole,
    startDate:startDate,
    endDate:endDate,
    responsibility :responsibility,
    userTest :userTest
  }


  response = await fetch("/profile/new/project",{

    method: "POST",
    body: JSON.stringify({ projectData }),
    headers: { "Content-Type": "application/json" },
  })
  
  console.log(projects)
}




$(".nav-link").on("click", function () {
  const links = $(".nav-link");
  const progress = ((links.index(this) + 1) / links.length) * 100;
  const progressBar = $(".progress-bar");
  progressBar.css("width", progress + "%");
  progressBar.attr("aria-valuenow", progress);

  if (progress == 100 && !$(".submitbutton").has("button").length) {
    const submitb = `<button type="button" class="btn btn-primary submitall mb-3">Submit your profile</button>`;
    $(".submitbutton").append(submitb);
  }
});

