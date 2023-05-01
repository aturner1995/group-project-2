const data = "Revised Overview:\nAs a skilled software engineer with experience at Google and Facebook, I possess expertise in both Javascript and Python. My strong background in front-end development has allowed me to build exceptional user experiences that drive customer retention and generate leads.\n\nRevised Job Experience:\n\nSoftware Engineer Senior, Google\n- Collaborated with cross-functional teams to develop front-end projects using Javascript\n- Designed and built front-end experiences that improved customer retention rates by 20%\n- Implemented A/B testing to optimize user experience and increase engagement\n- Mentored junior developers and provided guidance on best practices for front-end development\n\nSoftware Engineer, Facebook\n- Developed front-end projects using Javascript and React\n- Designed and built front-end experiences that generated leads and increased conversion rates by 15%\n- Conducted user research and implemented user feedback to improve product design\n- Collaborated with product managers and designers to ensure seamless integration of front-end experiences with back-end systems";

const sections = data.split("\n\n");
const overview = sections[0].split(":")[1].trim();

const jobExperiences = sections.slice(1).map((section) => {
  const [title, company] = section.split(", ");
  const bulletPoints = section.split("\n").slice(1);
  return { title, company, bulletPoints };
});

const resume = { overview, jobExperiences };
console.log(resume);