

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
  var userTest = 1;

  if (skillName && skillLevel) {
    $("#skill-name").val("");
    $("#skill-level").val("");

    var skillData = { skillName, skillLevel };

    skill.push(skillData);
    console.log(skill);
    var skillItem = $("<li>").html(
      "<strong>" + skillName + "</strong> - " + skillLevel
    );
    $("#skills-list").append(skillItem);
  }

  response = await fetch("/profile/new/skill", {
    method: "POST",
    body: JSON.stringify({ skillData, userTest }),
    headers: { "Content-Type": "application/json" },
  });
  if (window.location.pathname == "/dashboard") {
    window.location.href = `${window.location.pathname}`;
  }
}

async function saveOverview() {
  var overviewText = $("#overview-text").val();
  response = await fetch("/profile/new", {
    method: "POST",
    body: JSON.stringify({ overviewText }),
    headers: { "Content-Type": "application/json" },
  });
  if (window.location.pathname == "/dashboard") {
    window.location.href = `${window.location.pathname}`;
  }else{
    if(overviewText){
    var htmlwrite = `<div class="card">
    <div class="card-body">
      <h5 class="card-title">Overview</h5>
      <p class="card-text">${overviewText}</p>
    </div>
  </div>`
  }
}
  $(".outputDIv").append(htmlwrite)
}

async function addEducation() {
  var school = $("#school").val();
  var degree = $("#degree").val();
  var startDate = $("#start-date-2").val();
  var endDate = $("#end-date-2").val();
  var eduText = $("#education-text").val();
  var userTest = 1;

  console.log(startDate);
  var educationItem = {
    school: school,
    degree: degree,
    startDate: startDate,
    endDate: endDate,
    eduText: eduText,
  };
  console.log(educationItem);

  response = await fetch("/profile/new/education", {
    method: "POST",
    body: JSON.stringify({ educationItem, userTest }),
    headers: { "Content-Type": "application/json" },
  });
  if (window.location.pathname == "/dashboard") {
    window.location.href = `${window.location.pathname}`;
  }else{
    if(school,degree){
    var htmlwrite = `
    <div class="card mb-3">
      <div class="card-body py-2">
        <h6 class="card-title mb-1">Education</h6>
        <p class="card-text mb-0">${degree} details added successfully</p>
      </div>
    </div>
  `;
  }
}
  $(".eduHtml").append(htmlwrite)
}

$(".updatEdu").on("click", async function () {
  var eduId = parseInt($(this).attr("id"));
  var school = $(this).closest(".card").find("#school").val();
  var degree = $(this).closest(".card").find("#degree").val();
  var startDate = $(this).closest(".card").find("#start-date-2").val();
  var endDate = $(this).closest(".card").find("#end-date-2").val();
  var eduText = $(this).closest(".card").find("#education-text").val();

  var educationItem = {
    school: school,
    degree: degree,
    startDate: startDate,
    endDate: endDate,
    eduText: eduText,

    eduId: eduId,
  };
  console.log(educationItem);
  response = await fetch("/profile/new/education", {
    method: "PUT",
    body: JSON.stringify({ educationItem }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    window.location.href = `${window.location.pathname}`;
  }
});

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
  console.log(perosnalcollection);

  response = await fetch("/profile/new/person", {
    method: "POST",
    body: JSON.stringify({ perosnalcollection }),
    headers: { "Content-Type": "application/json" },
  });
  if (window.location.pathname == "/dashboard") {
    window.location.href = `${window.location.pathname}`;
  }else{
    if(name,email,phone){
    var htmlwrite = `<div class="card">
    <div class="card-body">
      <h5 class="card-title">Personal</h5>
      <p class="card-text">${name} 's Personal details added successfully</p>
    </div>
  </div>`
  }
}
$(".personHtml").append(htmlwrite)
}

async function addWorkExperience() {
  var jobTitle = $("#job-title").val();
  var companyName = $("#company-name").val();
  var location = $("#job-location").val();
  var startDate = $("#start-date").val();
  var endDate = $("#end-date").val();
  var responsibility = $("#responsibility").val();

  var userTest = 1;

  let experiencedata = {
    companyName: companyName,
    endDate: endDate,
    jobTitle: jobTitle,
    location: location,
    responsibility: responsibility,
    startDate: startDate,
    userTest: userTest,
  };

  response = await fetch("/profile/new/experience", {
    method: "POST",
    body: JSON.stringify({ experiencedata }),
    headers: { "Content-Type": "application/json" },
  });

 if (window.location.pathname == "/dashboard") {
    window.location.href = `${window.location.pathname}`;
  }else{
    if(companyName,jobTitle){
    var htmlwrite = `<div class="card">
    <div class="card-body">
      <h5 class="card-title">Experience</h5>
      <p class="card-text">${jobTitle} details added successfully</p>
    </div>
  </div>`
  }
}
  $(".expHtml").append(htmlwrite)
}

$(".updateExp").on("click", async function () {
  var workId = parseInt($(this).attr("id"));
  var jobTitle = $(this).closest(".card").find("#job-title").val();
  var companyName = $(this).closest(".card").find("#company-name").val();
  var location = $(this).closest(".card").find("#job-location").val();
  var startDate = $(this).closest(".card").find("#start-date").val();
  var endDate = $(this).closest(".card").find("#end-date").val();
  var responsibility = $(this).closest(".card").find("#responsibility").val();

  console.log(workId);
  console.log(jobTitle);

  let experiencedata = {
    companyName: companyName,
    endDate: endDate,
    jobTitle: jobTitle,
    location: location,
    responsibility: responsibility,
    startDate: startDate,
    workId: workId,
  };

  response = await fetch("/profile/new/experience", {
    method: "PUT",
    body: JSON.stringify({ experiencedata }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    window.location.href = `${window.location.pathname}`;
  } else {
    throw new Error("Request failed");
  }
});

$(".updateProject").on("click", async function () {
  var projectid = parseInt($(this).attr("id"));
  var projectName = $(this).closest(".card").find("#project-name").val();
  var yourTitle = $(this).closest(".card").find("#your-title").val();
  var githuburl = $(this).closest(".card").find("#deployedURL").val();
  var githubrepo = $(this).closest(".card").find("#githubRepo").val();
  var responsibility = $(this).closest(".card").find("#responsibility").val();


  let projectData = {
    projectid: projectid,
    projectName: projectName,
    yourTitle: yourTitle,
    githuburl: githuburl,
    githubrepo: githubrepo,
    responsibility: responsibility,
  };

  try {
    const response = await fetch(`/profile/new/project`, {
      method: "PUT",
      body: JSON.stringify({ projectData }),
      headers: { "Content-Type": "application/json" },
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
  const deleteBtn = $(this).attr("id");
  console.log(deleteBtn);
  const deleteResponse = await fetch(`/profile/new/experience/${deleteBtn}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (deleteResponse.ok) {
    window.location.href = `${window.location.pathname}`;
  } else {
    throw new Error("Request failed");
  }
});



$(".delproject").on("click", async function() {
  const deleteBtn = $(this).attr("id");
  console.log(deleteBtn);
  const deleteResponse = await fetch(`/profile/new/project/${deleteBtn}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (deleteResponse.ok) {
    window.location.href = `${window.location.pathname}`;
  } else {
    throw new Error("Request failed");
  }
});



$(".delEdu").on("click", async function() {
  const deleteBtn = $(this).attr("id");
  console.log(deleteBtn);
  const deleteResponse = await fetch(`/profile/new/education/${deleteBtn}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (deleteResponse.ok) {
    window.location.href = `${window.location.pathname}`;
  } else {
    throw new Error("Request failed");
  }
});

$(".delCert").on("click", async function() {
  const deleteBtn = $(this).attr("id");
  console.log(deleteBtn);
  const deleteResponse = await fetch(`/profile/new/certification/${deleteBtn}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (deleteResponse.ok) {
    window.location.href = `${window.location.pathname}`;
  } else {
    throw new Error("Request failed");
  }
});



$(".delSkill").on("click", async function() {
  const deleteBtn = $(this).attr("id");
  console.log(deleteBtn);
  const deleteResponse = await fetch(`/profile/new/${deleteBtn}`, {
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
  var certName = $("#certification-name").val();
  var issueOrg = $("#issuing-org").val();
  var deteEarned = $("#date-earned").val();
  var expireDate = $("#expiration-date").val();
  var certId = $(this).attr("id");

  let certificateDate = {
    certName: certName,
    issueOrg: issueOrg,
    deteEarned: deteEarned,
    expireDate: expireDate,
    certId: certId,
  };

  response = await fetch("/profile/new/certification", {
    method: "POST",
    body: JSON.stringify({ certificateDate }),
    headers: { "Content-Type": "application/json" },
  });
  if (window.location.pathname == "/dashboard") {
    window.location.href = `${window.location.pathname}`;
  }else{
    if(certName,issueOrg){
    var htmlwrite = `
    <div class="card mb-3">
      <div class="card-body py-2">
        <h6 class="card-title mb-1">Certification</h6>
        <p class="card-text mb-0">${certName} details added successfully</p>
      </div>
    </div>
  `;
    }
  }
  $(".certHtml").append(htmlwrite)
}

$(".updateCert").on("click", async function () {
  var certId = parseInt($(this).attr("id"));
  var certName = $(this).closest(".card").find("#certification-name").val();
  var issueOrg = $(this).closest(".card").find("#issuing-org").val();
  var deteEarned = $(this).closest(".card").find("#date-earned").val();
  var expireDate = $(this).closest(".card").find("#expiration-date").val();

  let certificateDate = {
    certName: certName,
    issueOrg: issueOrg,
    deteEarned: deteEarned,
    expireDate: expireDate,
    certId: certId,
  };

  console.log(certificateDate);
  response = await fetch("/profile/new/certification", {
    method: "PUT",
    body: JSON.stringify({ certificateDate }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    window.location.href = `${window.location.pathname}`;
  }
});

async function addproject() {
  var projectName = $("#project-name").val();
  var yourRole = $("#your-title").val();
  var githuburl = $("#deployedURL").val();
  var githubrepo = $("#githubRepo").val();
  var responsibility = $("#responsibility").val();
  var userTest = 1;

  let projectData = {
    projectName: projectName,
    yourRole: yourRole,
    githuburl: githuburl,
    githubrepo: githubrepo,
    responsibility: responsibility,
    userTest: userTest,
  };

  response = await fetch("/profile/new/project", {
    method: "POST",
    body: JSON.stringify({ projectData }),
    headers: { "Content-Type": "application/json" },
  });
  if (window.location.pathname == "/dashboard") {
    window.location.href = `${window.location.pathname}`;
  }else{
    if(projectName,yourRole){
    var htmlwrite = `
    <div class="card mb-3">
      <div class="card-body py-2">
        <h6 class="card-title mb-1">Experience</h6>
        <p class="card-text mb-0">${projectName} details added successfully</p>
      </div>
    </div>
  `;  
  }
}
  $(".proHtml").append(htmlwrite)
}

$(".nav-link ").on("click", function () {
  const links = $(".nav-link");
  const progress = ((links.index(this) + 1) / links.length) * 100;
  const progressBar = $(".progress-bar");
  progressBar.css("width", progress + "%");
  progressBar.attr("aria-valuenow", progress);

if (progress == 100 && !$(".submitbutton").has("button").length) {
  const submitb = `
    <a href="/dashboard" class="btn btn-primary submitall mb-3">Submit Profile</a>
  `;
  $(".submitbutton").append(submitb);
}

});
const tabs = ["#overview-tab", "#personal-tab", "#skills-tab", "#work-tab", "#project-tab", "#education-tab", "#certification-tab"];
let currentTab = 0;

$("#next-tab-btn").click(() => {
  if (currentTab < tabs.length - 1) {
    currentTab++;
    $(tabs[currentTab]).tab("show");
  }
});

$("#prev-tab-btn").click(() => {
  if (currentTab > 0) {
    currentTab--;
    $(tabs[currentTab]).tab("show");
  }
});
$("#next-tab-btn").on("click", function () {
  const currentTab = $(".nav-link.active");
  const nextTab = currentTab.parent().find(".nav-link");
  if (nextTab.length > 0) {
    currentTab.removeClass("active");
    nextTab.addClass("active");
    const links = $(".nav-link");
    const progress = ((links.index(nextTab) + 1) / links.length) * 100;
    const progressBar = $(".progress-bar");
    progressBar.css("width", progress + "%");
    progressBar.attr("aria-valuenow", progress);
  }
});


$("#prev-tab-btn").on("click", function () {
  const currentTab = $(".nav-link.active");
  const prevTab = currentTab.parent().find(".nav-link");
  if (prevTab.length > 0) {
    currentTab.removeClass("active");
    prevTab.addClass("active");
    const links = $(".nav-link");
    const progress = ((links.index(prevTab) + 1) / links.length) * 100;
    const progressBar = $(".progress-bar");
    progressBar.css("width", progress + "%");
    progressBar.attr("aria-valuenow", progress);
  }
});


$('#upload-form').on('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  console.log(formData)
  try {
    const response = await fetch('/dashboard/pic', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {

      window.location.href = `${window.location.pathname}`;
      console.log(message);
     


    } else {
      console.error(`Failed to upload file`);
    }
  } catch (error) {
    console.error(`Failed to upload file: ${error}`);
  }
});
$(document).ready(function() {
  const editBtn = $('#edit-btn');
  const uploadForm = $('#upload-form');

  editBtn.on('click', function() {
    uploadForm.show();
  });
});


$("#removepic-btn").on('click',async function(){
  const deletepic = await fetch(`/dashboard/pic`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (deletepic.ok) {
    window.location.href = `${window.location.pathname}`;
  } else {
    throw new Error("Request failed");
  }


})