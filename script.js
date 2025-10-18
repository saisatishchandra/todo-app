let API="https://server-for-todoapplication.onrender.com/todoList"

async function display(){
    
    let res=await fetch(API);
    let todoArr=await res.json();
    let str=``;
    for(let data of todoArr){
        str+=`
        <tr>
        <td>${data.id}</td>
        <td>${data.task}</td>
        <td>${data.time}</td>
        <td>
        <button type="button" onclick="deleteTask(${data.id})">delete </button>
        </td>
         <td>
        <button type="button" onclick="editTask(${data.id})"  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">edit </button>
        </td>
        </tr>
        `
    }
    let todotable=`
    <table>${str}</table>`;
    let todoEle=document.getElementById("todos");
todoEle.innerHTML=todotable;
}
display();

async function deleteTask(index){

  let delrep = await fetch(`${API}/${index}`, { method: "DELETE" });

  if (!delrep.ok) {
    console.error("Failed to delete:", index);
    return;
  }

  console.log("Deleted successfully.");
 
await  indexup();
  
  
  await display();

}

async function addTask(e){
    e.preventDefault();
    let Allfroms=document.forms;
    let taskFormE=Allfroms.taskForm;
    let taskE=taskFormE.task.value;
    let timeE=taskFormE.time.value;
    if(taskE==""||timeE==""){
        alert("enter data");
        return ;
    }
     let res=await fetch(API);
    let todoArr=await res.json();
    let len=todoArr.length;
    let obj={
        id:`${len+1}`,
        task:taskE,
        time:timeE
    }
    let addrep=await fetch(API,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(obj)
    });
    display();
}
let i=0;
async function editTask(ind){
    i=ind;
    console.log(i);
    let taskel=document.getElementById("task");
    let timel=document.getElementById("time");
    // console.log(todoArr[ind].task);
    let delrep=await fetch(API+"/"+(ind));
    let obj=await delrep.json();
    console.log(delrep);
    taskel.value=obj.task;
    timel.value=obj.time;
   
}

async function savec(){
    let taskel=document.getElementById("task");
    let timeele=document.getElementById("time");
    let obj={
        id:i,
        task:taskel.value,
        time:timeele.value
    }
    let rep=await fetch((API+"/"+i),{
        method:"PUT",
        headers:{
             "Content-Type": "application/json"
        },
        body:JSON.stringify(obj)
    });
    display();
}

async function indexup() {
    let i = 1;
   let res = await fetch(API);
    let todoArr = await res.json();

    
    for (let data of todoArr) {
        let obj = {
            id: `${i}`,
            task: data.task,
            time: data.time
        };

          let delrep = await fetch(`${API}/${data.id}`, { method: "DELETE" });
        // await fetch(API+"/"+(data.id), {
        //     method: "PUT",
        //      headers:{
        //      "Content-Type": "application/json"
        // },
        // body:JSON.stringify(obj)
        // });



        let addrep=await fetch(API,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(obj)
        });
        console.log(addrep);
        i++;
    }

   

    // await display();
}
