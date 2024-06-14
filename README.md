## Testing is being successfully completed using Jest ( JS testing module)
##
## present in src/App.test.js

## Test Cases
1. Task Addition
  Test Case: Add a New Task

  Description: Verify that a new task can be added successfully.  
  Steps:  
  
    1.Render the To-Do List component.  
    2.Enter a todo title in the input field & select date(optional- takes todays date as default).  
    3.Click the "Add Todo" button.
    4.Assert that the new task appears in the task list.
  ##
2. Task Removal
  Test Case: Remove a Task

  Description: Verify that a task can be removed successfully.  
  Steps:  
  
    1.Render the To-Do List component with initial tasks.
    2.Click the "Delete" button next to a task.
    3.Assert that the task is no longer in the to-do list.
  ##
3. Task Completion Marking
  Test Case: Mark a Task as Completed and vice-versa

  Description: Verify that a task can be marked as completed.  
  Steps:  
  
    1.Render the To-Do List component with initial tasks.
    2.Click the checkbox next to a task to mark it as completed.
    3.Assert that the task is moved to the completed tasks list with a marked checkbox.
    4.One can uncheck the checkbox next to completed todo to bring it back to due todos.
   ## 
4. Input Validation
  Test Case: Validate Task Input

  Description: Verify that invalid task inputs are handled.  
  Steps:  
  
    1.Render the To-Do List component.
    2.Enter an invalid task title (e.g., an empty string) in the input field.
    3.Click the "Add Todo" button.
    4.User is notified by a blue border in the input container that no title is mentioned
    5.Assert that no task is added.
    6.Similar feature can be seen in edit todo option.
##
5. Sorting and Filtering
   
  Test Case: Sort Tasks

  Description: Verify that tasks can be sorted by name & date.  
  Steps:  
  
    1.Render the To-Do List component with unsorted tasks.
    2.Click the "Sort" button.
    3.Select appropriate sorting technique.
    4.Assert that the tasks are sorted correctly.
  
  Test Case: Filter Tasks

  Description: Verify that tasks can be filtered by status (all, active, completed).  
  Steps:  
  
    1. Render the To-Do List component with mixed tasks.
    2. Click the "Filter" button and select a filter option.
    3. Assert that the tasks are filtered correctly.
##
6. LocalStorage Integration
  Test Case: LocalStorage Persistence

  Description: Verify that tasks are persisted in localStorage.  
  Steps:  
  
    1.Render the To-Do List component and add a task.
    2.Reload the page.
    3.Assert that the added task is persisted and displayed.
##
7. LocalStorage Integration
  Test Case: Edit Existing Todo

  Description: Verify that todo is update correctly  
  Steps:  
  
    1.Render the To-Do List component and add a task.
    2.Click on the edit icon next to the date.
    3.Observe you have a new set of inputs ( date is optional as usual and title is mandatory )
    4.After mentioning title click 'save' if you wish to update the todo, click 'cancel' is not.
    5.Assert that the todo is updated and displayed.
    6.Note that this feature is not available in Completed Todo.
