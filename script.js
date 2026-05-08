// get Elements >>
let goalTitle = document.getElementById("goalTitle");
let description = document.getElementById("description");
let priority = document.getElementById("priority");
let add = document.getElementById("add");
let searchData = document.getElementById("searchData");
let showData = document.getElementById("showData");
let sureDelete = document.getElementById("sureDelete");
let sureDeletebtn = document.getElementById("sureDeletebtn");
let closeIconDelete = document.getElementById("closeIconDelete");
let goalRow = document.getElementsByClassName("goalRow");
let neverBtn = document.getElementById("neverBtn");
// ================================== <<
// general variables >>
let goals = [];
let currentObj = {};
let titleRegex = /^[a-zA-z]{2,3}[a-z A-Z0-9]{0,15}$/;
// ================================== <<
// collect data from local storage >>
if (localStorage.getItem("goals") != null) {
    goals = JSON.parse(localStorage.getItem("goals"));
    showDataFn();
}
// ================================== <<
// functions >>
// addGoalfunction >>
function addGoal() {
    let goalObj = {                        // add object
        title: goalTitle.value,
        description: description.value,
        priority: priority.value,
    }
    goals.push(goalObj);                    // push object in the array    
}
// ============================== <<
// updateLocalStoragefunction >>
function updateLocalStorage() {
    localStorage.setItem("goals", JSON.stringify(goals));
}
// ============================== <<
// showDatafunction >>
function showDataFn() {
    updateLocalStorage(); // Update local storage before show data
    let dataContainer = '';
    for (let i = 0; i < goals.length; i++) {
        if (goals[i].description == '') { goals[i].description = '* - *' };
        dataContainer += `
        <tr class="goalRow">
            <td>${i + 1}</td>
            <td>${goals[i].title}</td>
            <td>${goals[i].description}</td>
            <td>${goals[i].priority}</td>
            <td><i onclick="goalEdit(${i})" class="fa-solid fa-pen"></i>    <i onclick="goalDelete(${i})" class="fa-solid fa-trash"></i></td>
        </tr>
        `;
    }
    if (dataContainer == "") {
        dataContainer = `<tr>
                        <td colspan="5">No goals have been added yet ... <br>Add a goal <i class="fa-solid fa-circle-plus"></i></td>
                         </tr> `;
    }
    showData.innerHTML = dataContainer;
}
// ============================== <<
// searchfunction >>
function searchfn() {
    let dataContainer = '';
    for (let i = 0; i < goals.length; i++) {
        if (goals[i].title.toLowerCase().includes(searchData.value.toLowerCase())) {
            dataContainer +=
                `<tr class="goalRow" >
                <td>${i + 1}</td>
                <td>${goals[i].title}</td>
                <td>${goals[i].description}</td>
                <td>${goals[i].priority}</td>
                <td><i onclick="goalEdit(${i})" class="fa-solid fa-pen"></i>    <i onclick="goalDelete(${i})" class="fa-solid fa-trash"></i></td>
            </tr>
            `;
        }
    }
    if (dataContainer == "") {
        dataContainer = `<tr>
                        <td colspan="5" style="color:red;">${searchData.value} - Not Exist</td>
                         </tr> `;
    }
    showData.innerHTML = dataContainer;
}
// ============================== <<
// goalEditfunction >>
function goalEdit(i) {
    goalRow[i].innerHTML = `<td colspan="5" >
                            <div>
                            <table style="width:100%">
                            <thead>
                            <tr>
                            <td>Title</td>
                            <td>Description</td>
                            <td>Priority</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                            <td><input id="editTitle" value="${goals[i].title}"></td>
                            <td><input id="editDescription" value="${goals[i].description}"></td>
                            <td><select id="editpriority" value="${goals[i].priority}">
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                            </td>
                            </tr>
                            <tr>
                            <td colspan="5" >
                            <button onclick='confirmUpdate(${i})' id="editBtn">Update</button>
                            <button onclick='showDataFn()' id="neverBtn">Never</button>
                            </td>
                            </tr>
                            </tbody>
                            </table>
                            </div>
                            </td>
                            `;
    // -------------------  set Update
    let editTitle = document.getElementById("editTitle");
    let editDescription = document.getElementById("editDescription");
    let editpriority = document.getElementById("editpriority");
    let editBtn = document.getElementById("editBtn");
    // updateValidation----
    editTitle.onkeyup=function(){
        if(titleRegex.test(editTitle.value)){
            editBtn.removeAttribute("disabled");
        }else{
            editBtn.setAttribute("disabled","true");
        }
    }
    // --------------------
    currentObj = {                  //recollect Data after update
        title: editTitle.value,
        description: editDescription.value,
        priority: editpriority.value,
    };
}
// -------- get Update
function confirmUpdate(i) {
    goals[i].title = editTitle.value;
    goals[i].description = editDescription.value;
    goals[i].priority = editpriority.value;
    showDataFn();
}
// ============================== <<
// goalDeletefunction >>
function goalDelete(i) {
    sureDelete.classList.remove("closeDelete");
    sureDelete.classList.add("openDelete");
    // ...
    sureDeletebtn.onclick = function () {
        sureDelete.classList.remove("openDelete");
        sureDelete.classList.add("closeDelete");
        goals.splice(i, 1);
        showDataFn();
    };
    // ...
    closeIconDelete.onclick = function () {
        sureDelete.classList.remove("openDelete");
        sureDelete.classList.add("closeDelete");
    };
}
// ============================== <<
// clearFormfunction
function clearForm() {
    goalTitle.value = "";
    description.value = "";
    priority.value ="Select Priority";
}
// ================================== <<
// events >>
add.onclick = function () {
    if (priority.value == 'Select Priority')                //validation 
    {
        priority.style.outline = 'red 3px solid';
        add.style.border = 'red 3px solid';
    } else {
        priority.style.outline = 'grey 3px solid';          //return style
        add.style.border = 'black 3px solid';
        goalTitle.style.outline = 'gray 2px solid';
        addGoal();                                          //call functions
        showDataFn();
        clearForm();
        add.setAttribute("disabled","true");
    }
}
// =====================================================================<<>>
searchData.onkeyup = function () {
    searchfn();
}
// ================================== <<
// inputValidation >>
add.setAttribute("disabled", "true");
// =============
goalTitle.onkeyup = function () {
    if (titleRegex.test(goalTitle.value)) {
        add.removeAttribute("disabled");
        goalTitle.style.outline = 'green 2px solid';
    } else {
        add.setAttribute("disabled", "true");
        goalTitle.style.outline = 'gray 2px solid';
    }
    if (goalTitle.value == "") { goalTitle.style.outline = 'gray 2px solid'; }
}
// =============
priority.onmouseleave = function(){
    if(priority.value!="Select Priority"){priority.style.outline = 'green 3px solid';}
}

// =====(JS_style)=====( open closed input field )================================
let label = document.getElementsByClassName("label");
function open() {
    this.classList.remove("close");
    this.classList.add("open");
}
for (let i = 0; i < label.length; i++) {
    label[i].addEventListener('mouseenter', open);
}
