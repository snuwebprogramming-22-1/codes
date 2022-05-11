import './App.css';
import { useState } from "react";

function Todo({title, id, removeTodo, createdAt}) {
    return <li>
        {title}
        <button onClick={()=> removeTodo(id)}>삭제</button>
    </li>;
}

function App() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');
    const [lastTodoId, setLastTodoId] = useState(0);

    const addTodo = (e) => {
        setLastTodoId(lastTodoId + 1);
        setTodos([...todos, {title: text, id: lastTodoId}]);
        setText('');
        e.preventDefault();
    }

    const removeTodo = (id) => {
        return setTodos(todos.filter(todo => todo.id !== id));
    }

    return (
        <div>
            <h1>오늘의 할 일</h1>
            { todos.length === 0 ?
                <div>할 일이 없습니다.</div> :
                <ul>
                    {todos.map(todo  => <Todo {...todo} removeTodo={removeTodo}/>)}
                </ul>
            }

            <form onSubmit={addTodo}>
                <h3>할 일을 입력하세요</h3>
                <input type="text" value={text}
                       onChange={e => setText(e.target.value)}/>
                <input type="submit"  value="입력"/>
            </form>
        </div>
    );
}

export default App;
