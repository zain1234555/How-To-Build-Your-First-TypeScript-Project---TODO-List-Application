#! /usr/bin/env node

import inquirer from "inquirer";

//create a class for  todo app
class Todo {
  todo_list: string[]; // an array which contain our tasks

  constructor() {
    this.todo_list = [];
  }
  //this  method  show  our all tasks . we using  for each method to display this array elements
  show_todo_list() {
    console.log(`\n\t## tode task list ##\n`);
    this.todo_list.forEach((item) => {
      console.log(`\n\t * ${item}\n`);
    });
  }
  //this  method  add a  task in todo list  using push method .
  add_to_list(input: string) {
    this.todo_list.push(input);
    console.log(`\n\t#task: ${input}\n`);
    console.log(`\n\t\t]-task has been added successfully...[\n`);
  }
  //this  method  remove   our choosen  task . here we use splice method
  remove_from_list(task: string) {
    this.todo_list.splice(this.todo_list.indexOf(task), 1);
    console.log(`\n\t##${task}##  it has been removed from task list\n`);
  }
  //this  method  update or rename tasks . here we also use splice method
  update_task(new_input: string, previous_task: string) {
    this.todo_list.splice(this.todo_list.indexOf(previous_task), 1, new_input);
    console.log(
      `\n\tyour previous task has been updated with **${new_input}**\n`
    );
  }
  //this  method  delete  all tasks in todo list . we using  while loop ,  until array length is not = 0  this while loop, pop task
  delete_all() {
    while (this.todo_list.length > 0) {
      let remove = this.todo_list.pop();
      console.log(`=> ${remove}... deleted`);
    }
    console.log(`\n\tyour all task have deleted...\n`);
  }
  // method  exiting message
  end_program() {
    setTimeout(() => {
      console.log(`\n\tplease wait...`);
      console.log(`exit`);
    }, 2000);
  }
}

// get input from user accordingly this array
let option: string[] = [
  "Add",
  "Remove",
  "Update",
  "Veiw",
  "Delete_All",
  "Exit",
];

// asker function ask questions and choice and return user's input
async function asker(
  name: string,
  type: "input" | "number" | "list",
  message: string,
  choices?: string[]
) {
  let ask = await inquirer.prompt({
    name: name,
    type: type,
    message: message,
    choices: choices,
  });
  let answer: string = ask[name];
  return answer;
}

// create an  object  with todo class
let todo = new Todo();
// while
while (true) {
  //call asker function
  let ask = await asker("Option", 'list', "What Would You Like To Do?", option);

  if (ask == "add") {
    let ask_add = await asker(
      "add",
      "input",
      "What Would You Like To Do List"
    );
    todo.add_to_list(ask_add);
  } else if (ask == "remove") {
    if (todo.todo_list.length == 0) {
      console.log(`\n\tyou have nothing to remove in your todo list\n`);
    } else {
      let ask_remove = await asker(
        "remove",
        "list",
        "what would you like to remove from todo list",
        todo.todo_list
      );
      todo.remove_from_list(ask_remove);
    }
  } else if (ask == "update") {
    if (todo.todo_list.length !== 0) {
      let ask_pre = await asker(
        "pre",
        "list",
        "what would you like to remove from todo list",
        todo.todo_list
      );
      let ask_new_input = await asker(
        "new_input",
        "input",
        "what would you like to remove from todo list"
      );
      todo.update_task(ask_new_input, ask_pre);
    } else {
      console.log(`\n\tyou have nothing to update in your todo list\n`);
    }
  } else if (ask == "veiw") {
    if (todo.todo_list.length == 0) {
      console.log(`\n\tyour todo list is empty\n`);
    } else {
      todo.show_todo_list();
    }
  } else if (ask == "delete_all") {
    if (todo.todo_list.length == 0) {
      console.log(`\n\tyour todo list is already empty\n`);
    } else {
      todo.delete_all();
    }
  } else if (ask == "exit") {
    todo.end_program();

    break;
  }
}
