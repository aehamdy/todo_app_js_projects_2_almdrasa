import {
    darkThemeToggleElement,
    appElement,
    inputElement,
    getDeleteIcons,
    getCheckboxElements, 
    taskListElement,
    taskListLink,
    taskSearchBarButton,
} from "./scripts/elements";

import { initListeners, initTaskListeners } from "./scripts/eventListeners";
import { initDataOnStartup } from "./scripts/utils";

initDataOnStartup();
initListeners();