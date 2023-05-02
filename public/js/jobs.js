async function fetchJobTitles() {
    try {
      const response = await fetch("/jobs/title", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
  
      let jobtitile =  data.Works[data.Works.length -1].title
 
      const url = "https://jooble.org/api/";
      const key = "a46cba24-ba23-4e97-a5a2-beba34693158";
      const params = { keywords: `${jobtitile}`, location: "canada", count: 10 };
  
      const response2 = await fetch(url + key, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
  
      const data2 = await response2.json();
  
      const jobPostingsDiv = document.getElementById("jobPostings");
  
      data2.jobs.forEach((job) => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");
        card.innerHTML = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${job.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${job.company}</h6>
              <p class="card-text">${job.snippet.replace(/&nbsp;/g, "")}</p>
              <p class="card-text">Type: ${job.type}</p>
              <a href="${job.link}" target="_blank" class="btn btn-custom-2 mr-2">View Job</a>
                <a href="/resume" class="btn btn-custom-3 mr-2">Generate Resume</a>
            </div>
          </div>
        `;
  
        jobPostingsDiv.appendChild(card);
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  fetchJobTitles();
  
  

  











