import { darkThemeToggleElement, appElement } from "./scripts/elements";

darkThemeToggleElement.addEventListener("click", () => {
    appElement.classList.toggle("App--isDark");
});


const taskSearchBarButton = document.querySelector(".TaskSearchBar__button");

const fetchData = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : false;
}

const addTask = (e) => {
    e.preventDefault();
    const inputElement = document.querySelector(".TaskSearchBar__input");
    const taskValue = inputElement.value;

    if (!taskValue) return;

    const task = {
        value: taskValue,
        isCompleted: false,
    };

    const tasks = fetchData("Tasks") || [];

    tasks.push(task);

    saveToDB("Tasks", tasks);

    const taskListElement = document.querySelector(".TaskList__list");

    let taskList = "";
    tasks.forEach(task => {
        taskList += `
        <li class="TaskList__taskContent ${task.isCompleted ? "TaskList__taskContent--isActive" : ""}">
        <div class='TaskList__checkbox' tabindex="0" role="button">
            <img class='TaskList__checkboxImg' src="./assets/icon-checkmark.svg" alt="checkmark" />
        </div>
        <div class='TaskList__valueContent'>
            <p class='TaskList__value'>${task.value}</p>
            <img src="./assets/icon-basket.svg" class='TaskList__deleteIcon' alt="basket-icon"/>
        </div>
        </li>
        `;
    });

    taskListElement.innerHTML = taskList;
    inputElement.value = "";
};


const saveToDB = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

taskSearchBarButton.addEventListener("click", addTask);

/*
    - DarkTheme
        [x] toggleDarkMode
    - Tasks
        [ ] saveToDB
        [ ] initDataOnStartup
        [ ] renderTaskList
        [ ] addTask
        [x] deleteTask
        [x] toggleTask
        [ ] toggleCompletedTask
*/