import { darkThemeToggleElement,
    appElement,
    inputElement,
    taskListElement,
    getDeleteIcons,
    getCheckboxElements, 
    taskListLink} from "./scripts/elements";

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

const deleteTask = (e, index) => {
    const answer = confirm("هل أنت متأكد من حذف المهمة؟");

    if (answer === false) return;

    const tasks = fetchData("Tasks");

    tasks.splice(index, 1);
    saveToDB("Tasks", tasks);
    initTaskList(tasks);
};

const initTaskListeners = () => {
    getDeleteIcons().forEach((icon, index) => {
        icon.addEventListener("click", (e) => deleteTask(e, index));
    });
    getCheckboxElements().forEach((box, index) => {
        box.addEventListener("click", (e) => toggleTask(e, index));
        box.addEventListener("keydown", (e) => e.key === "Enter" && toggleTask(e, index));
    })
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

    initTaskList(tasks);

    inputElement.value = "";
};

const saveToDB = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

taskSearchBarButton.addEventListener("click", addTask);

const initDataOnStartup = () => {
    fetchData("darkModeFlag") && toggleDarkMode();
};

const renderEmptyState = () => {
    taskListElement.innerHTML = `<li class='EmptyList'>
        <img class='EmptyList__img' src="./assets/icon-empty.svg" alt="list is empty" />
        <p>قائمة المهام فارغة</p>
    </li>`;
};

const initTaskList = (tasks) => {
    if (tasks?.length) {
        renderTaskList(tasks);
        initTaskListeners();
    } else {
        renderEmptyState();
    }
};

taskListLink.addEventListener("click", () => {
    taskListElement.classList.toggle("TaskList__list--hideCompleted");
    taskListLink.classList.toggle("TaskList__link--isActive");
})

const toggleTask = (e, index) => {
    const tasks = fetchData("Tasks");

    e.currentTarget.parentElement.classList.toggle("TaskList__taskContent--isActive");
    tasks[index].isCompleted = !tasks[index].isCompleted;
    saveToDB("Tasks", tasks);
};

initDataOnStartup();


/*
    - DarkTheme
        [x] toggleDarkMode
    - Tasks
        [x] saveToDB
        [x] initDataOnStartup
        [x] initTaskList
        [x] addTask
        [x] deleteTask
        [x] toggleTask
        [x] toggleTask
        [x] toggleCompletedTask
        [ ] Empty State
*/