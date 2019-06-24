document.addEventListener("DOMContentLoaded", e => {
  addSomeListeners();
});
const usersByKeywordUrl = "https://api.github.com/search/users?q=";
const userRepoUrl = `https://api.github.com/users`;
const reposByKeywordUrl = `https://api.github.com/search/repositories?q=`;

function addSomeListeners() {
  document.getElementById("github-form").addEventListener("submit", e => {
    e.preventDefault();
    toggleDetector();
  });
}

function toggleDetector() {
  let toggleSearchVal = document.getElementById("toggle-search").value;
  toggleSearchVal === "users" ? userSearchCall() : repoSearchCall();
}

function userSearchCall() {
  const searchBox = document.getElementById("search").value;
  fetch(usersByKeywordUrl + searchBox, {
    method: "GET",
    headers: {
      Accept: "application / vnd.github.v3 + json"
    }
  })
    .then(res => res.json())
    .then(users => showUsers(users))
    .catch(err => console.log(err));
}

function showUsers(users) {
  const userList = document.getElementById("user-list");
  userList.innerHTML = "";
  users.items.forEach(user => showUser(user));
}

function showUser(user) {
  const userList = document.getElementById("user-list");

  const li = document.createElement("li");
  li.setAttribute("class", "li-user");

  const a = document.createElement("a");
  a.setAttribute("href", user.html_url);
  a.innerText = user.login;

  const avatar = document.createElement("img");
  avatar.src = user.avatar_url;
  avatar.addEventListener("click", e => {
    e.preventDefault;
    userReposSearch(user);
  });

  const br = document.createElement("br");

  li.appendChild(a);
  li.appendChild(br);
  li.appendChild(avatar);

  userList.appendChild(li);
}

function userReposSearch(user) {
  fetch(userRepoUrl + "/" + user.login + "/" + "repos", {
    method: "GET",
    headers: {
      Accept: "application / vnd.github.v3 + json"
    }
  })
    .then(res => res.json())
    .then(repos => showRepos(repos))
    .catch(err => console.log(err));
}

function showRepos(repos) {
  document.getElementById("repos-list").innerHTML = "";
  repos.forEach(repo => showRepo(repo));
}

function showRepo(repo) {
  const reposList = document.getElementById("repos-list");

  const li = document.createElement("li");
  li.setAttribute("class", "li-repo");

  const aRepo = document.createElement("a");
  aRepo.setAttribute("href", repo.html_url);
  aRepo.innerText = repo.html_url;

  li.appendChild(aRepo);

  reposList.appendChild(li);
}

function repoSearchCall() {
  const searchBox = document.getElementById("search").value;
  fetch(reposByKeywordUrl + "/" + searchBox, {
    method: "GET",
    headers: {
      Accept: "application / vnd.github.v3 + json"
    }
  })
    .then(res => res.json())
    .then(repos => displayReposSearch(repos))
    .catch(err => console.log(err));
}

function displayReposSearch(repos) {
  repos.items.forEach(repo => showRepo(repo));
}
