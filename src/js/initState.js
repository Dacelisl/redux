 const todos = [{
         id: 1,
         completed: true,
         title: 'Task 1',
     },
     {
         id: 2,
         completed: false,
         title: 'Task 2',
     },
     {
         id: 3,
         completed: true,
         title: 'Task 3',
     },
     {
         id: 4,
         completed: true,
         title: 'Task 4',
     },
 ]

 const todosState = {
     data: [],
     loading: false,
     error: []
 }


 export const initialState = {
     todosState,
     filter: 'ALL'
 };