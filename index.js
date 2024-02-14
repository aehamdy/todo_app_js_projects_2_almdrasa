import { darkThemeToggleElement, appElement, inputElement, taskListElement, getDeleteIcons } from "./scripts/elements";

const toggleDarkMode = () => {
    appElement.classList.toggle("App--isDark");
    saveToDB("darkModeFlag", appElement.classList.contains("App--isDark"));
};

darkThemeToggleElement.addEventListener("click", toggleDarkMode);


const taskSearchBarButton = document.querySelector(".TaskSearchBar__button");

const fetchData = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : false;
};

const renderTaskList = (tasks) => {
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
};

const initTaskListeners = () => {
    getDeleteIcons().forEach((icon, index) => {

        icon.addEventListener("click", (e, index) => deleteTask(e, index));
    });
};

const addTask = (e) => {
    e.preventDefault();
    
    const taskValue = inputElement.value;

    if (!taskValue) return;

    const task = {
        value: taskValue,
        isCompleted: false,
    };

    const tasks = fetchData("Tasks") || [];

    tasks.push(task);

    saveToDB("Tasks", tasks);

    renderTaskList(tasks);

    inputElement.value = "";
    initTaskListeners();
};

const saveToDB = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const deleteTask = (e, index) => {
    const answer = confirm("هل أنت متأكد من حذف المهمة؟");

    if (answer === false) return;

    const tasks = fetchData("Tasks");

    tasks.splice(index, 1);
    saveToDB("Tasks", tasks);
    renderTaskList(tasks);
};

taskSearchBarButton.addEventListener("click", addTask);

const initDataOnStartup = () => {
    fetchData("darkModeFlag") && toggleDarkMode();
};

initDataOnStartup();


/*
    - DarkTheme
        [x] toggleDarkMode
    - Tasks
        [ ] saveToDB
        [ ] initDataOnStartup
        [ ] renderTaskList
        [x] addTask
        [x] deleteTask
        [x] toggleTask
        [ ] toggleCompletedTask
*/