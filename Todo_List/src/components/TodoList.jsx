import React from "react";
import Button from "@atlaskit/button";
import Todo from "./Todo";

export default function TodoList({todoList, onCheckButtonClick, onDeleteButtonClick, onEditButtonClick}){
    return(
        <>
        {
            todoList.map((todo) => (
                <Todo key={todo.id} todo={todo} 
                    onCheckButtonClick={onCheckButtonClick}
                    onDeleteButtonClick={onDeleteButtonClick}
                    onEditButtonClick={onEditButtonClick}
                />
            ))
        }
        </>
    )
}