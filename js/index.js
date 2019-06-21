document.addEventListener("DOMContentLoaded", (e) => {
    addSomeListeners()
})
const userUrl = 'https://api.github.com/search/users?q='

function addSomeListeners() {
    document.getElementById("github-form").addEventListener("submit", (e) => {
        e.preventDefault()
        userSearchCall()
    })
}
function userSearchCall() {
    let searchBox = document.getElementById("search").value
    fetch(userUrl + searchBox, {
        method: "GET",
        headers: {
            "Accept": "application / vnd.github.v3 + json"
        }
    }).then(res => res.json()).then(users => showUsers(users)).catch(err => console.log(err))
}

function showUsers(users) {
    console.log(users)
    users.items.forEach(user => showUser(user))
}

function showUser(user) {

    let userList = document.getElementById("user-list")

    let li = document.createElement("li")
    li.setAttribute("class", "user")

    // let pUser = document.createElement("p")
    // pUser.innerText = user.login

    let a = document.createElement("a")
    a.setAttribute("href", user.html_url)
    a.innerText = user.login

    let avatar = document.createElement("img")
    avatar.src = user.avatar_url

    let br = document.createElement("br")

    // li.appendChild(pUser)
    li.appendChild(a)
    li.appendChild(br)
    li.appendChild(avatar)

    userList.appendChild(li)
}