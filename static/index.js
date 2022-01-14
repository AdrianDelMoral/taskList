class Task {
    constructor(name, desc, cats) {
        this.name = name;
        this.description = desc;
        this.categories = cats ?? [];
    }

    addCategories(...categories) {
        for (const cat of categories) {
            this.categories.push(cat);
        }
    }
}

class TaskList {
    _tasks = [];

    constructor(tasks) {
        this._tasks = tasks;
    }

    add(task) {
        this._tasks.push(task);
    }

    get(filter) {
        return this._tasks;
    }

    getCategories() {
        let todas = [];

        this.get().forEach(element => {
            todas.push(element.categories);
        });

        let tareas = [];
        for (let i = 0; i < todas.length; i++) {
            tareas = tareas.concat(todas[i]);
        }

        let unicos = [];
        tareas.forEach((elemento) => {
            if (!unicos.includes(elemento)) {
                unicos.push(elemento);
            }
        });

        return unicos;
    }
}

class TaskListView {
    constructor(rootElement) {
        this._rootElement = rootElement;
    }

    printTask(task) {
        //console.log(task); // muestra las tareas que hay en el array creadas
        const li = document.createElement('li');
        li.classList.add('tarea');
        this._rootElement.append(li);

        li.append(
            this._genTaskName(task.name),
            this._genTaskDesc(task.description),
            this._genTaskCats(task.categories)
        );
    }

    printTaskList(taskList) { // imprime por pantalla creandolo en el DOM
        //console.log(taskList.get(), ' imprime la lista de tareas ');
        this._clearTaskList();
        for (let task of taskList.get()) {
            this.printTask(task);
        }
    }

    printFilterTaskList(taskList, clase) {
        this._clearTaskList();
        for (let task of taskList.get()) {
            task.categories.forEach(element => {
                if (clase === element) {
                    this.printTask(task);
                }
            });
        }
    }

    _clearTaskList() {
        for (let li of this._rootElement.querySelectorAll('li')) {
            li.remove();
        }
    }

    _genTaskName(name) {
        const taskName = document.createElement('h2');
        taskName.textContent = name;
        return taskName;
    }

    _genTaskDesc(desc) {
        const taskDesc = document.createElement('p');
        taskDesc.textContent = desc;
        return taskDesc;
    }

    _genTaskCats(cats) {
        const taskCats = document.createElement('div');
        taskCats.classList.add('categories');
        for (const cat of cats) {
            taskCats.append(this._genTaskCat(cat));
        }
        return taskCats;
    }

    _genTaskCat(cat) {
        const taskCat = document.createElement('div');

        const taskCatName = document.createElement('span');
        taskCatName.textContent = cat;

        const taskCatDel = document.createElement('span');
        taskCatDel.classList.add('del-cat');
        taskCatDel.textContent = 'X';

        taskCat.append(taskCatDel, taskCatName);
        return taskCat;
    }
}

const taskList = new TaskList([
    new Task('Tarea 1', 'Descripción de la tarea 1', ['Clase', 'Personal']),
    new Task('Tarea 2', 'Descripción de la tarea 2', ['Religioso']),
]);

const task = new Task('Tarea 3', 'Descripción de la tarea 3');
task.addCategories('Trabajo', 'Estudios');
taskList.add(task);

const view = new TaskListView(
    document.body.querySelector('#tareas')
);
view.printTaskList(taskList);

/* ---------------------------------------------------------------------Filtrador--------------------------------------------------------------------- */
console.log('');
console.log('Funcion de Sacar Lista de tareas:');


let listaTareasENTERA = taskList.getCategories(taskList.getCategories());

let selector = document.querySelector('#selector');
listaTareasENTERA.forEach(element => {
    let option = document.createElement('option');
    option.textContent = element;
    selector.append(option);
});

let select = document.querySelector('#selector');

select.addEventListener('change', function () {
    let selectedOption = this.options[select.selectedIndex];
    // console.log(selectedOption.value + ': ' + selectedOption.text);
    console.log('Devolverá: ', selectedOption.text);
    view.printFilterTaskList(taskList, selectedOption.text);
});

let boton = document.querySelector('#mostrarTodos');
boton.addEventListener('click', () => {
    view.printTaskList(taskList);
});

/* ------------------------------------------------------------------añadir tarea------------------------------------------------------------------ */
let botonAnyadir = document.querySelector("#button-add");
botonAnyadir.onclick = function (event) {
    let titulo = document.querySelector('#input-add').value;
    let descripcion = document.querySelector('#input-add2').value;
    let secciones = document.querySelector('#input-add3').value;

    secciones = secciones.split(",");
    if (secciones == '') {
        alert('No puedes añadir una tarea vacia');
    } else {
        console.log(titulo);
        console.log(descripcion);

        let task_new = new Task(titulo, descripcion, secciones);
        console.log(task_new);

        taskList.add(task_new);

        secciones.forEach(seccionComp => {
            if (!listaTareasENTERA.includes(seccionComp)) {
                listaTareasENTERA.push(seccionComp)
                let option = document.createElement('option');
                option.textContent = seccionComp;
                selector.append(option);
            };
        });

        view.printTaskList(taskList);
    }
}

/* --------------------------------------------------------------eliminar la categoria-------------------------------------------------------------- */
// eliminar la categoria
let tar = document.querySelectorAll(".categories");
for (const i of tar) {
    console.log(i);
    i.onclick = function (event) {
        if (event.target.className != 'del-cat') return;

        let pane = event.target.closest('.categories>div');
        console.log(event)
        pane.remove();
    };
}