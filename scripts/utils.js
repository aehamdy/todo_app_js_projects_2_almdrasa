import { appElement, taskListElement, inputElement } from "./elements";
import { initTaskListeners } from "./eventListeners"

export const fetchData = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : false;
};

export const toggleDarkMode = () => {
    appElement.classList.toggle("App--isDark");
    saveToDB("darkModeFlag", appElement.classList.contains("App--isDark"));
};

export const renderTaskList = (tasks) => {
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

export const deleteTask = (e, index) => {
    const answer = confirm("هل أنت متأكد من حذف المهمة؟");

    if (answer === false) return;

    const tasks = fetchData("Tasks");

    tasks.splice(index, 1);
    saveToDB("Tasks", tasks);
    initTaskList(tasks);
};

export const addTask = (e) => {
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

export const saveToDB = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const initDataOnStartup = () => {
    fetchData("darkModeFlag") && toggleDarkMode();
    initTaskList(fetchData("Tasks"));
};

export const renderEmptyState = () => {
    taskListElement.innerHTML = `<li class='EmptyList'>
        <img class='EmptyList__img' src="./assets/icon-empty.svg" alt="list is empty" />
        <p>قائمة المهام فارغة</p>
    </li>`;
};

export const initTaskList = (tasks) => {
    if (tasks?.length) {
        renderTaskList(tasks);
        initTaskListeners();
    } else {
        renderEmptyState();
    }
};

export const toggleTask = (e, index) => {
    const tasks = fetchData("Tasks");

    e.currentTarget.parentElement.classList.toggle("TaskList__taskContent--isActive");
    tasks[index].isCompleted = !tasks[index].isCompleted;
    saveToDB("Tasks", tasks);
};