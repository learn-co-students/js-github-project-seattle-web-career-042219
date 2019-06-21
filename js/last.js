window.onload = function () {
    document.getElementById("github-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const searchTerm = document.getElementById("search").value;
        getUsers(searchTerm);
    });
    document.getElementById("repoSearch").addEventListener("click", function () {
        const searchTerm = document.getElementById("search").value;
        getRepos(searchTerm);
    });
};

function getUsers(searchTerm) {
    resetContainer();
    if (searchTerm) {
        fetch(`https://api.github.com/search/users?q=${searchTerm}`)
            .then(response => response.json())
            .then(json => {
                json.items.forEach(item => {
                    const newUserItem = `
                <li class="li-user">
                <p class="loginName">User name: ${item.login}</p>
                <p name="link">Link: <a href="${item.html_url}">${
                        item.html_url
                        }</a></p>
              <img src=${item.avatar_url} alt="avatar"/>
              <br>
              <button type="button" class="userBtn" id=${
                        item.login
                        } >User's Repos</button>
                </li>
                <hr>
                `;
                    document.getElementById("user-list").innerHTML += newUserItem;
                });
                addListeners();
            })
            .catch(err => console.error("Error in user search=", err));
    }
    resetSearchBox();
}

function addListeners() {
    var btns = document.getElementsByClassName("userBtn");
    Array.from(btns).forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            //   getRepos(this.id);
            getRepos(e.target.id);
        });
    });
}

function getRepos(userName) {
    if (userName) {
        fetch(`https://api.github.com/users/${userName}/repos`)
            .then(response => response.json())
            .then(json => {
                json.forEach(item => {
                    const newRepoItem = `
                <li class="li-repo">
                <p class="repo-link">Repo Link: <a href="${item.html_url}">${
                        item.html_url
                        }</a></p>
                </li>
                `;
                    document.getElementById("repos-list").innerHTML += newRepoItem;
                });
            })
            .catch(err => console.error("Error in repo search=", err));
    }
    resetSearchBox();
}

function resetSearchBox() {
    document.getElementById("search").value = "";
}

function resetContainer() {
    document.getElementById("user-list").innerHTML = "";
    document.getElementById("repos-list").innerHTML = "";
}


