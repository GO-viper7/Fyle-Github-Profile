const accessToken = "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";

const apiUrl = "https://api.github.com/user";
fetch(apiUrl, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("profile-name").innerText = data.name || data.login;
    document.getElementById("profile-description").innerText =
      data.bio || "No description available";
    document.getElementById("profile-location").innerText =
      data.location || "Location not specified";
    document.getElementById("github-link").href = data.html_url;

    document.getElementById("profile-pic").src = data.avatar_url;

    const reposUrl = `${apiUrl}/repos?per_page=${reposPerPage}&page=${currentPage}`;
    fetch(reposUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((repos) => {
        const repoContainer = document.getElementById("repo-container");
        repoContainer.innerHTML = "";

        repos.forEach((repo) => {
          const repoCard = document.createElement("div");
          repoCard.className = "card col-md-4 repo-card mr-2";
          repoCard.innerHTML = `
                <div class="card-body" >
                  <h5 class="card-title">${repo.name}</h5>
                  <p class="card-text">${
                    repo.description || "No description available"
                  }</p>
                  <p class="card-text">${
                    repo.topics.length > 0
                      ? repo.topics
                          .map(
                            (topic) =>
                              `<span class="badge badge-primary">${topic}</span>`
                          )
                          .join("")
                      : '<span class="badge badge-primary">No Topic</span>'
                  }</p>
                </div>
              `;
          repoContainer.appendChild(repoCard);
        });
      })
      .catch((error) => console.error("Error fetching repositories:", error));
  })
  .catch((error) =>
    console.error("Error fetching profile information:", error)
  );

let reposPerPage = 10;
let currentPage = 1;

function displayRepositories(repos) {
  const repoContainer = document.getElementById("repo-container");
  repoContainer.innerHTML = "";

  const startIndex = (currentPage - 1) * reposPerPage;
  const endIndex = startIndex + reposPerPage;

  repos.forEach((repo) => {
    const repoCard = document.createElement("div");
    repoCard.className = "card col-md-4 repo-card mr-2";
    repoCard.innerHTML = `
          <div class="card-body" >
            <h5 class="card-title">${repo.name}</h5>
            <p class="card-text">${
              repo.description || "No description available"
            }</p>
            <p class="card-text mr-3">${
              repo.topics.length > 0
                ? repo.topics
                    .map(
                      (topic) =>
                        `<span class="badge badge-primary mr-2">${topic}</span>`
                    )
                    .join("")
                : '<span class="badge badge-primary">No Topic</span>'
            }</p>
          </div>
        `;
    repoContainer.appendChild(repoCard);
  });

  updatePagination();
}
document.getElementById('number-badge').innerHTML = 10
function setReposPerPage(count) {
  document.getElementById('number-badge').innerHTML = count
  reposPerPage = count;
  currentPage = 1;
  fetchDataAndDisplay();
}

function updatePagination() {
  const paginationList = document.querySelectorAll(".pagination .page-item");

  paginationList.forEach((item) => {
    if (item.querySelector(".page-link").innerText == currentPage) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}


function fetchDataAndDisplay() {
  const url = `${apiUrl}/repos?per_page=${reposPerPage}&page=${currentPage}`;
  fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((repos) => {
      console.log(repos);
      displayRepositories(repos);
    })
    .catch((error) => console.error("Error fetching repositories:", error));
}

document.getElementById("prev-page").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchDataAndDisplay();
  }
});

document.getElementById("next-page").addEventListener("click", () => {
  if (currentPage < 9) {
    currentPage++;
    fetchDataAndDisplay();
  }
});

for (let i = 1; i <= 9; i++) {
  document.getElementById(`page-${i}`).addEventListener(
    "click",
    ((page) => {
      return () => {
        console.log(`Clicked on page ${page}`);
        currentPage = page;
        fetchDataAndDisplay();
      };
    })(i)
  );
}
const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
