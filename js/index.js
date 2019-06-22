document.addEventListener("DOMContentLoaded", (e) => {
    addSomeListeners()
})
const userUrl = 'https://api.github.com/search/users?q='
const userRepoUrl = `https://api.github.com/users`
const repoByuKeywordUrl = `https://api.github.com/search/repositories?q=`

function addSomeListeners() {
    document.getElementById("github-form").addEventListener("submit", (e) => {
        e.preventDefault();
        toggleDetector()
    })
}

function toggleDetector() {
    let toggleSearchVal = document.getElementById("toggle-search").value
    toggleSearchVal === "users" ? userSearchCall() : repoSearchCall()
}

function userSearchCall() {
    console.log("userSearchCall fires")
    const searchBox = document.getElementById("search").value
    fetch(userUrl + searchBox, {
        method: "GET",
        headers: {
            "Accept": "application / vnd.github.v3 + json"
        }
    }).then(res => res.json())
        .then(users => showUsers(users))
        .catch(err => console.log(err))
}

function showUsers(users) {
    users.items.forEach(user => showUser(user))
}

function showUser(user) {
    let userList = document.getElementById("user-list")

    let li = document.createElement("li")
    li.setAttribute("class", "li-user")

    let a = document.createElement("a")
    a.setAttribute("href", user.html_url)
    a.innerText = user.login

    let avatar = document.createElement("img")
    avatar.src = user.avatar_url
    avatar.addEventListener("click", e => {
        e.preventDefault
        userReposSearch(user)
    })

    let br = document.createElement("br")

    li.appendChild(a)
    li.appendChild(br)
    li.appendChild(avatar)

    userList.appendChild(li)
}

function userReposSearch(user) {
    console.log("userReposSearch fires")
    fetch(userRepoUrl + '/' + user.login + '/' + "repos", {
        method: "GET",
        headers: {
            "Accept": "application / vnd.github.v3 + json"
        }
    })
        .then(res => res.json())
        // .then(repos => console.log(repos))
        .then(repos => showRepos(repos))
        .catch(err => console.log(err))
}

function showRepos(repos) {
    document.getElementById("repos-list").innerHTML = ''
    repos.forEach(repo => showRepo(repo))
}

function showRepo(repo) {
    let reposList = document.getElementById("repos-list")

    let li = document.createElement("li")
    li.setAttribute("Class", "li-repo")

    let aRepo = document.createElement("a")
    aRepo.setAttribute("href", repo.html_url)
    aRepo.innerText = repo.html_url

    li.appendChild(aRepo)

    reposList.appendChild(li)
}

function repoSearchCall() {
    console.log("repoSearchCall fires")
    const searchBox = document.getElementById("search").value
    fetch(repoByuKeywordUrl + '/' + searchBox)
        .then(res => res.json())
        // .then(repos => console.log(repos))
        .then(repos => displayReposSearch(repos))
        .catch(err => console.log(err))
}

function displayReposSearch(repos) {
    repos.items.forEach(repo => displayRepo(repo))
}

function displayRepo(repo) {

    let reposList = document.getElementById("repos-list")

    let li = document.createElement("li")
    li.setAttribute("Class", "li-repo")

    let aRepo = document.createElement("a")
    aRepo.setAttribute("href", repo.html_url)
    aRepo.innerText = repo.html_url

    li.appendChild(aRepo)

    reposList.appendChild(li)
}