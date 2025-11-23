import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import Textfield from '@atlaskit/textfield'
import Button from '@atlaskit/button'
import { v4 } from 'uuid'

const TODO_LIST_APP_STORAGE_KEY = "TODO_LIST_APP";

function App() {
  const [editingTodo, setEditingTodo] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");
  const hasLoaded = useRef(false);

  useEffect(() => {
    console.log("Bước 1: Đang ĐỌC từ localStorage...");////
    const storageTodoList = localStorage.getItem(TODO_LIST_APP_STORAGE_KEY);
    console.log("Dữ liệu lấy ra được:", storageTodoList);////
    if (storageTodoList && !hasLoaded.current) {
      setTodoList(JSON.parse(storageTodoList));
      console.log("Đã parse thành công:");//////
    }
    hasLoaded.current = true;
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_LIST_APP_STORAGE_KEY, JSON.stringify(todoList));
    console.log("Bước 2: Đang GHI vào localStorage...");////
  },[todoList]);

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onAddButtonClick = useCallback((e) => {
    setTodoList([
      { id: v4(), name: textInput, isCompleted: false },
      ...todoList
    ]);
    setTextInput("");
  }, [textInput, todoList]);  // update textInput và todoList mỗi lần thêm, không nó sẽ giữ nguyên textInput và todoList từ lần tạo trước

  const onCheckButtonClick = useCallback((id) => {
    setTodoList(prev => prev.map((todo) => 
      todo.id === id ? {...todo, isCompleted: ! todo.isCompleted} : todo ))
  }, []);

  const onDeleteButtonClick = useCallback((id) => {
    setTodoList(prev => prev.filter(todo => todo.id !== id));
  },[]);

  const onEditButtonClick = useCallback((id) => {
    const todo = todoList.find(todo => todo.id === id);
    if(!todo) return;
    setEditingTodo(todo);
    setTextInput(todo.name);
    setShowModal(true);
  }, [todoList]);

  return (
    <div className="todo-app-container">
      <h2 className="todo-header">Danh sách việc cần làm</h2>
      <div className="add-button-container">
        <Button
          appearance="primary"
          onClick={() => setShowModal(true)}
        >
          Thêm công việc
        </Button>
      </div>
      <TodoList todoList={todoList} 
        onCheckButtonClick={onCheckButtonClick} 
        onDeleteButtonClick={onDeleteButtonClick}
        onEditButtonClick={onEditButtonClick}
      />

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Thêm việc cần làm</h3>
            <Textfield
              name="add-todo"
              placeholder="Nhập công việc..."
              value={textInput}
              onChange={onTextInputChange}
            />
            <div style={{ marginTop: '8px' }}>
              <Button
                appearance="primary"
                isDisabled={!textInput}
                onClick={() => {
                  if(editingTodo){
                    setTodoList(prev => prev.map((todo) => 
                      todo.id === editingTodo.id ? { ...todo, name: textInput} : todo));
                  }
                  else {
                    onAddButtonClick();
                  }
                  setShowModal(false); // đóng modal sau khi thêm
                  setEditingTodo(null);
                  setTextInput("");
                }}
              >
                {editingTodo ? "Lưu" : "Thêm"}
              </Button>
              
              <Button
                appearance="subtle"
                onClick={() => {
                  setShowModal(false);
                  setEditingTodo(null);
                  setTextInput(null);
                }}
                style={{ marginLeft: '8px' }}
              >
                Hủy
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default App
