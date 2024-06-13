import { useEffect, useState } from "react";
import './homePage.styles.css';

import { CiEdit } from "react-icons/ci";

const HomePage = () => {
    const [todoTitle, setTodoTitle] = useState('');
    const [todoDate, setTodoDate] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [sortedList, setSortedList] = useState([]);
    const [filterMethod, setFilterMethod] = useState('defaultFilter');
    const [sortMethod, setSortMethod] = useState('sortDefault');
    //const [getIndexOfCheckedTodo, setIndexOfCheckedTodo] = useState(null);
    const [completedTodos, setCompletedTodos] = useState([]);
    const [transitionClasses, setTransitionClasses] = useState({});
    const [transitionClasses2, setTransitionClasses2] = useState({});
    const [noTodoDeco, setNoTodoDeco] = useState('');
    const [editClassed, setEditClasses] = useState({});



    const dt = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD format
    const savedData = JSON.parse(localStorage.getItem('todoList'));
    const savedData2 = JSON.parse(localStorage.getItem('completedTodos'));

    //getitem from local Storage once-at starting using useEffect
    useEffect(() => {
        if (Array.isArray(savedData)) {
            setTodoList(savedData);
            setSortedList(savedData);
        }
        if (Array.isArray(savedData2)) {
            setCompletedTodos(savedData2);
        }
    }, [])

    //add todo to todoList
    const AddTodo = (e) => {
        if (e) e.preventDefault();

        if (todoTitle.length > 0) {
            let todoId = '';
            const dt = new Date();
            todoId = dt.getDate() + "" + dt.getMonth() + "" + dt.getFullYear() + "" + dt.getHours() + "" + dt.getMinutes() + "" + dt.getSeconds();

            const dateToUse = todoDate ? todoDate : new Date().toLocaleDateString('en-CA');

            const newTodo = { title: todoTitle, date: dateToUse, id: todoId, edit: false };
            setTodoList([...todoList, newTodo]);
            setTodoTitle('');
            setTodoDate('');
        } else if (!todoTitle) {
            console.log('triggered');
            setNoTodoDeco('borderAlert');
            setTimeout(() => {
                setNoTodoDeco('');
            }, 1000);
        }
    };

    //delete todo from todoList
    const deleteTodo = (index) => {
        const newTodoList = todoList.filter((todo) => todo.id !== index);
        setTodoList(newTodoList);
    };

    //using useEffect to filter out sortedList, getting value of <select> from handleFilterMethod
    useEffect(() => {
        let newFilteredList = [...todoList];
        ///let newCompleteFilteredList = [...completedTodos];
        if (filterMethod === 'todayFilter') {
            newFilteredList = newFilteredList.filter((todo) => todo.date === dt);
            //newCompleteFilteredList = newCompleteFilteredList.filter((todo) => todo.date === dt);
        } else if (filterMethod === 'upComingFilter') {
            newFilteredList = newFilteredList.filter((todo) => todo.date >= dt);
            //newCompleteFilteredList = newCompleteFilteredList.filter((todo) => todo.date >= dt);
        } else if (filterMethod === 'missedFilter') {
            newFilteredList = newFilteredList.filter((todo) => todo.date < dt);
            //newCompleteFilteredList = newCompleteFilteredList.filter((todo) => todo.date < dt);
        }

        let newSortedList = [...newFilteredList];
        //let newCompleteSortedList = [...newCompleteFilteredList];
        if (sortMethod === 'sortByAscdn') {
            newSortedList.sort((a, b) => a.title.localeCompare(b.title));
            //newCompleteSortedList.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortMethod === 'sortByDesdn') {
            newSortedList.sort((a, b) => b.title.localeCompare(a.title));
            //newCompleteSortedList.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortMethod === 'sortByDate') {
            newSortedList.sort((a, b) => new Date(a.date) - new Date(b.date));
            //newCompleteSortedList.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
        //console.log('setSortedList -> newSoretedList   (in useEffect)')
        setSortedList(newSortedList);
        //setCompletedTodos(newCompleteSortedList);

    }, [todoList, filterMethod, sortMethod, dt.completedTodos]);

    // getting value of sortMethod to be used from <select>
    const handleSortMethod = (e) => {
        setSortMethod(e.target.value);
    };

    // getting value of filter to be used from  <select>
    const handleFilterMethod = (e) => {
        setFilterMethod(e.target.value);
    };

    // setItem to localStorage every time todolist is changed
    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoList));
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
    }, [todoList, completedTodos]);

    //the function below will always triger for todoList
    const checkBoxHandler = (e, todoId) => {
        const isChecked = e.target.checked;
        setTransitionClasses((prev) => ({
            ...prev,
            [todoId]: 'fade-out'
        }))
        setTimeout(() => {
            if (isChecked) {
                const checkedTodo = sortedList.find((todo) => todo.id === todoId);
                const newList = sortedList.filter((todo) => todo.id !== todoId);
                setCompletedTodos([...completedTodos, checkedTodo]);
                //console.log('setTodoList -> newList   (in addCompletedTodo)')
                setTodoList([...newList]);
                //console.log(sortedList)
            }
            setTransitionClasses((prev) => ({
                ...prev,
                [todoId]: ''
            }))
            setTransitionClasses2((prev) => ({
                ...prev,
                [todoId]: 'fade-in'
            }))
            setTimeout(() => {
                setTransitionClasses2((prev) => ({
                    ...prev,
                    [todoId]: ''
                }))
            }, 500)
        }, 500);
    }

    //the function below will always triger for completed list
    const unCheckBoxHandler = (e, todoId) => {
        const isChecked = e.target.checked;
        setTransitionClasses2((prev) => ({
            ...prev,
            [todoId]: 'fade-out'
        }))
        setTimeout(() => {
            if (!isChecked) {
                // Find the unchecked todo in the completedTodos list
                const unCheckedTodo = completedTodos.find((todo) => todo.id === todoId);

                // Remove the unchecked todo from the completedTodos list
                const newCompletedList = completedTodos.filter((todo) => todo.id !== todoId);

                // Add the unchecked todo back to the todoList
                setCompletedTodos(newCompletedList);
                setTodoList([...todoList, unCheckedTodo]);
            }
            setTransitionClasses2((prev) => ({
                ...prev,
                [todoId]: ''
            }))
            setTransitionClasses((prev) => ({
                ...prev,
                [todoId]: 'fade-in'
            }))
            setTimeout(() => {
                setTransitionClasses((prev) => ({
                    ...prev,
                    [todoId]: ''
                }))
            }, 500)
        }, 500);
    };

    const deleteCompletedTodo = (e, todoId) => {
        e.preventDefault();
        const newCompleteList = completedTodos.filter((todo) => todo.id !== todoId);
        setCompletedTodos(newCompleteList);
    }

    const editHandler = () => {

    }
    //main rendering
    return (
        <div className="homePageContainer">
            <h1 className="title">Todo List</h1> {/*title*/}
            {/*Followed by Input and Ouput area*/}
            <div className="inputAndAddTodoContainer">
                <input type="text" placeholder='add Todo' value={todoTitle} className={`todoInput ${noTodoDeco ? 'borderAlert' : ''}`} onChange={(e) => setTodoTitle(e.target.value)} />
                <div className="dateAndAddButton">
                    <input type="date" value={todoDate} className="dateInputButton" onChange={(e) => setTodoDate(e.target.value)} />
                    <button type="button" className="addButton" onClick={AddTodo}>Add Todo</button>
                </div>
            </div>
            {/* sort and filter section */}
            <div className="sortAndFilterContainer">
                <div className="sortContainer">
                    <span className="sortTitle">Sort :</span>
                    <select className='selectInput' defaultValue={'sortDefault'} onChange={handleSortMethod}>
                        <option value='sortDefault'>default</option>
                        <option value='sortByAscdn'>ascending</option>
                        <option value='sortByDesdn'>descending</option>
                        <option value='sortByDate'>date</option>
                    </select>
                </div>
                <div className="filterContainer">
                    <span className="filterTitle">Filter :</span>
                    <select className='selectInput' defaultValue='defaultFilter' onChange={handleFilterMethod}>
                        <option value='defaultFilter'>default</option>
                        <option value='todayFilter'>today</option>
                        <option value='upComingFilter'>Upcoming</option>
                        <option value='missedFilter'>missed</option>
                    </select>
                </div>
            </div>
            {/*Followed by Todo list rendering*/}
            <div className="listsContainer">
                {/*mapping of todolist*/}
                {
                    sortedList.length > 0 ? sortedList.map((todo) => todo && (
                        <div key={todo.id} className={`todoListContainer ${transitionClasses[todo.id] || ''}`}>
                            <div className="checkPlusTodo">
                                <input type='checkBox' onChange={(e) => checkBoxHandler(e, todo.id)} />
                                {todo.title}
                            </div>
                            <span>{todo.date}<CiEdit style={{ marginLeft: '0.5rem', cursor: 'pointer' }} onClick={editHandler} /></span>
                            <button className='deleteButton' onClick={() => deleteTodo(todo.id)}>Delete</button>
                        </div>
                    )) : (<span style={{ textAlign: 'center' }}>No Todos</span>)
                }
                <div className="completedTodoTitle">{completedTodos.length > 0 ? <span><hr /><br />Completed</span> : ""}
                </div>
                <div className="completedTodoContainer">
                    {
                        completedTodos.map((todo) => todo && (
                            <div key={todo.id} className={`completedTodoList ${transitionClasses2[todo.id] || ''}`} >
                                <div className="checkPlusTodo" >
                                    <input defaultChecked type='checkBox' onChange={(e) => unCheckBoxHandler(e, todo.id)} />
                                    {todo.title}
                                </div>
                                <span>{todo.date}<CiEdit style={{ marginLeft: '0.5rem', cursor: 'pointer' }} onClick={editHandler} /></span>
                                <button className='deleteButton' onClick={(e) => deleteCompletedTodo(e, todo.id)}>Delete</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default HomePage;
