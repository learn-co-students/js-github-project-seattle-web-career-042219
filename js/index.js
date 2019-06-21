document.addEventListener("DOMContentLoaded", (e) => {
    addSomeListeners()
})
const userUrl = 'https://api.github.com/search/users?q='
const repoUrl = `https://api.github.com/users`
const keywordUrl = `https://api.github.com/search/repositories`

function addSomeListeners() {
    let toggleSearchVal = document.getElementById("toggle-search")
    document.getElementById("github-form").addEventListener("submit", (e) => {
        e.preventDefault()
        toggleSearchVal === "users" ? userSearchCall() : keywordSearchCall()
    })
}
function userSearchCall() {
    let searchBox = document.getElementById("search").value
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
    console.log(users)
    users.items.forEach(user => showUser(user))
}

function showUser(user) {

    let userList = document.getElementById("user-list")

    let li = document.createElement("li")
    li.setAttribute("class", "li-user")

    // let pUser = document.createElement("p")
    // pUser.innerText = user.login

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

    // li.appendChild(pUser)
    li.appendChild(a)
    li.appendChild(br)
    li.appendChild(avatar)

    userList.appendChild(li)
}

function userReposSearch(user) {
    console.log("userReposSearch fires")
    fetch(repoUrl + '/' + user.login + '/' + "repos")
        .then(res => res.json())
        // .then(repos => console.log(repos))
        .then(repos => displayRepos(repos))
        .catch(err => console.log(err))
}

function displayRepos(repos) {
    document.getElementById("repos-list").innerHTML = ''
    repos.forEach(repo => displayRepo(repo))

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

function keywordSearchCall() {
    console.log("keywordSearchCall fires")
}