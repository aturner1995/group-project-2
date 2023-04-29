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
  if (response.ok) {
    window.location.href = `${window.location.pathname}`;
  }


}

async function saveOverview() {
  var overviewText = $("#overview-text").val();

  response = await fetch("/profile/new/overview", {
    method: "POST",
    body: JSON.stringify({ overviewText}),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    window.location.href = `${window.location.pathname}`;
  }
}





async function addEducation() {
    var school = $("#school").val();
    var degree = $("#degree").val();
    var startDate = $("#start-date-2").val();
    var endDate = $("#end-date-2").val();
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
    if (response.ok) {
      window.location.href = `${window.location.pathname}`;
    }
  };

  $(".updatEdu").on("click",async function(){
    var eduId = parseInt($(this).attr("id"))
    var school = $(this).closest('.card').find("#school").val();
    var degree = $(this).closest('.card').find("#degree").val();
    var startDate = $(this).closest('.card').find("#start-date-2").val()
    var endDate = $(this).closest('.card').find("#end-date-2").val();
    var eduText = $(this).closest('.card').find("#education-text").val();
  

  
    var educationItem = {
      school: school,
      degree: degree,
      startDate: startDate,
      endDate: endDate,
      eduText: eduText,

      eduId:eduId
  
    };
    console.log(educationItem)
    response = await fetch("/profile/new/education",{
  
      method: "PUT",
      body: JSON.stringify({ educationItem  }),
      headers: { "Content-Type": "application/json" },
    })
    if (response.ok) {
      window.location.href = `${window.location.pathname}`;
    }
  
  })

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

  let perosnalcollection = {
    name: name,
    email: email,
    phone: phone,
    address: address,
    github: github,
    linkedin: linkedin,
    portfolio: portfolio,
  };
  console.log(perosnalcollection)

  response = await fetch("/profile/new/person",{

    method: "POST",
    body: JSON.stringify({ perosnalcollection}),
    headers: { "Content-Type": "application/json" },
  })
  if (response.ok) {
    window.location.href = `${window.location.pathname}`;
  }
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
    userTest : userTest,
 
  }
  


  
  response = await fetch("/profile/new/experience",{

    method: "POST",
    body: JSON.stringify({experiencedata}),
    headers: { "Content-Type": "application/json" },
  })

  if (response.ok) {
    window.location.href = `${window.location.pathname}`;
  } else {
      throw new Error("Request failed");
    }

  }
  













  $(".updateExp").on("click", async function(){
    var workId = parseInt($(this).attr("id"))
    var jobTitle = $(this).closest('.card').find("#job-title").val()
    var companyName = $(this).closest('.card').find("#company-name").val()
    var location = $(this).closest('.card').find("#job-location").val()
    var startDate = $(this).closest('.card').find("#start-date").val()
    var endDate = $(this).closest('.card').find("#end-date").val()
    var responsibility = $(this).closest('.card').find("#responsibility").val()
  
    console.log(workId)
    var userTest = 1;
  
    let experiencedata = {
      companyName: companyName,
      endDate: endDate,
      jobTitle: jobTitle,
      location : location,
      responsibility: responsibility,
      startDate: startDate,
      userTest : userTest,
      workId : workId
    }
  
    console.log(experiencedata)
  
    response = await fetch("/profile/new/experience",{
      method: "PUT",
      body: JSON.stringify({experiencedata}),
      headers: { "Content-Type": "application/json" },
    })
  
    if (response.ok) {
      window.location.href = `${window.location.pathname}`;
    } else {
      throw new Error("Request failed");
    }
  })
  


  $(".updateProject").on("click", async function(){
    var projectid = parseInt($(this).attr("id"));
    var projectName = $(this).closest('.card').find("#project-name").val();
    var yourTitle = $(this).closest('.card').find("#your-title").val();
    var startDate = $(this).closest('.card').find("#start-date").val();
    var endDate = $(this).closest('.card').find("#end-date").val();
    var responsibility = $(this).closest('.card').find("#responsibility").val();
    var userTest = 1;
  
    let projectData = {
      projectid: projectid,
    projectName: projectName,
      yourTitle: yourTitle,
      startDate: startDate,
      endDate: endDate,
      responsibility: responsibility,
      userTest: userTest
    };
  
  
    try {
      const response = await fetch(`/profile/new/project`, {
        method: "PUT",
        body: JSON.stringify({ projectData }),
        headers: { "Content-Type": "application/json" }
      });
      if (response.ok) {
        window.location.href = `${window.location.pathname}`;
      }
      const data = await response.json();
      console.log(data);
  
    } catch (error) {
      console.error(error);
  
    }
  });
  










  $(".expdelete").on("click", async function() {
    const deleteiD = $(this).attr("id")
    const deleteResponse = await fetch(`/profile/new/experience/${deleteiD}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (deleteResponse.ok) {
      window.location.href = `${window.location.pathname}`;
    } else {
      throw new Error("Request failed");
    }
  });
  















async function addCertification() {
var certName = $("#certification-name").val()
var issueOrg =  $("#issuing-org").val()
var deteEarned = $("#date-earned").val()
var expireDate = $("#expiration-date").val()
var certId = $(this).attr("id")

let certificateDate = {
  certName :certName,
  issueOrg : issueOrg,
  deteEarned : deteEarned,
  expireDate :expireDate,
  certId :certId

}


response = await fetch("/profile/new/certification",{

  method: "POST",
  body: JSON.stringify({ certificateDate }),
  headers: { "Content-Type": "application/json" },
})
if (response.ok) {
  window.location.href = `${window.location.pathname}`;
}
}


$(".updateCert").on("click",async function(){
  var certId = parseInt($(this).attr("id"));
  var certName = $(this).closest('.card').find("#certification-name").val();
  var issueOrg = $(this).closest('.card').find("#issuing-org").val();
  var deteEarned  = $(this).closest('.card').find("#date-earned").val();
  var expireDate = $(this).closest('.card').find("#expiration-date").val();


  
let certificateDate = {
  certName :certName,
  issueOrg : issueOrg,
  deteEarned : deteEarned,
  expireDate :expireDate,
  certId : certId
}

console.log(certificateDate)
response = await fetch("/profile/new/certification",{

  method: "PUT",
  body: JSON.stringify({ certificateDate }),
  headers: { "Content-Type": "application/json" },
})
if (response.ok) {
  window.location.href = `${window.location.pathname}`;
}

})














async function addproject(){

  var projectName = $("#project-name").val();
  var yourRole = $("#your-title").val();
  var startDate = $("#start-Date").val();
  var endDate = $("#end-Date").val();
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

console.log(projectData)

  response = await fetch("/profile/new/project",{

    method: "POST",
    body: JSON.stringify({ projectData }),
    headers: { "Content-Type": "application/json" },
  })
  if (response.ok) {
    window.location.href = `${window.location.pathname}`;
  }
}



















$(".nav-link").on("click", function () {
  const links = $(".nav-link");
  const progress = ((links.index(this) + 1) / links.length) * 100;
  const progressBar = $(".progress-bar");
  progressBar.css("width", progress + "%");
  progressBar.attr("aria-valuenow", progress);

  if (progress == 100 && !$(".submitbutton").has("button").length) {
    const submitb = `<button type="button" class="btn btn-primary submitall mb-3" href="/dashboard">Submit Profile</button>`;
    $(".submitbutton").append(submitb);
  }
});
