const USER_URL = "https://api.github.com/search/users?q="
const USER_REPO_URL = "https://api.github.com/users"
const REPO_URL = "https://api.github.com/search/repositories?q="


document.addEventListener('DOMContentLoaded', () => {


    function main() {
        attachListeners()
    }

    main()


    function fetchUser(name) {
        fetch(USER_URL + name)
        .then(resp => resp.json())
        .then(json => {
            displayUsers(json.items)
        })
    }

    function fetchUserRepo(user) {
        fetch(USER_REPO_URL + `/${user.login}/repos`)
        .then(resp => resp.json())
        .then(json => {
            displayUserRepos(json)
        })
    }

    function fetchRepos(search) {
        let config = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'
            }
        }

        fetch(REPO_URL + search, config)
        .then(resp => resp.json())
        .then(json => {
            displayUserRepos(json.items)
        })
    }

    function attachListeners() {
        let ul = document.getElementById('user-list')
        let searchField = document.getElementById('search')
        let ulRepo = document.getElementById('repos-list')

        searchField.setAttribute('search-type', 'user')

        form = document.getElementById('github-form')
        form.addEventListener('submit', (ev) => {
            ev.preventDefault()
            let search = ev.target.elements["search"].value
            if (searchField.attributes[4].value === "user") {
                ul.innerHTML = ""
                ulRepo.innerHTML = ""
                fetchUser(search)
            } else {
                ul.innerHTML = ""
                ulRepo.innerHTML = ""
                fetchRepos(search)
            }
            
            
            
        })

        
        let button = document.getElementById("toggle-button")
        button.addEventListener('click', () => {
           if (searchField.attributes[4].value === 'user') {
                searchField.attributes[4].value = "repo"
                searchField.value = "Search Repositories"
            } else {
                searchField.attributes[4].value = "user"
                searchField.value = "Search Users"
            }
        })

    }

    function displayUsers(items) {
        items.forEach((user) => {
            displayUser(user)
        })
    }

    function displayUser(user) {
        let ul = document.getElementById('user-list')
        let li = document.createElement('li')
        let h2 = document.createElement('h2')
        let img = document.createElement('img')
        let div = document.createElement('div')
        let a = document.createElement('a')
        let repoUL = document.getElementById('repos-list')

        

        ul.appendChild(li)
        li.appendChild(h2)

        li.appendChild(img)

        div.appendChild(a)
        li.appendChild(div)

        h2.textContent = user.login
        img.src = user.avatar_url
        a.href = user.html_url
        a.textContent = "Profile"

        h2.addEventListener('click', () => {
            repoUL.innerHTML = ""
            fetchUserRepo(user)
        })

    }

    function displayUserRepos(json) {
        json.forEach((repo) => {
            displayUserRepo(repo)
        })
    }

    function displayUserRepo(repo) {
        let ul = document.getElementById('repos-list')
        let li = document.createElement('li')
        let a = document.createElement('a')
        a.textContent = repo.name
        a.href = repo.html_url

        li.appendChild(a)
        ul.appendChild(li)

    }

})

