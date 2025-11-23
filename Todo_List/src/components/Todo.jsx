import Button from "@atlaskit/button"
import React from "react"
import styled, { css } from "styled-components"
import CheckIcon from "@atlaskit/icon/glyph/check"
import TrashIcon from '@atlaskit/icon/glyph/trash';
import EditIcon from '@atlaskit/icon/glyph/edit';


const ButtonStyled = styled(Button)`
  margin-top: 5px; 
  text-align: left;


  &, &:hover {
    ${p => p.iscompleted && css`
      text-decoration: line-through;
      ` }
  }




  &:hover {
    .check-icon{
        display: inline-block;
    }
  }

  .check-icon {
    display: none;

    &:hover {
        background-color: #e2e2e2;
        border-radius: 3px;
    }
  }
`;

export default function Todo({ todo, onCheckButtonClick, onDeleteButtonClick, onEditButtonClick}) {
    return (
        <ButtonStyled
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                marginBottom: '10px',
                backgroundColor: '#7765dcff',           
                color: 'white',                        
                borderRadius: '12px',           //bo góc
                fontWeight: '500',
            }}
            iscompleted={todo.isCompleted}
            shouldFitContainer

            iconBefore={
                <span
                    className="check-icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        onCheckButtonClick(todo.id);
                    }}
                >
                    <CheckIcon primaryColor="#4fff4f" />
                </span>
            }
            
            iconAfter={
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span
                        className="edit-icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEditButtonClick(todo.id);
                        }}
                    >
                        <EditIcon primaryColor="#4512deff" />
                    </span>
                    <span
                        className="delete-icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteButtonClick(todo.id);
                        }}
                    >
                        <TrashIcon primaryColor="#ff4f4f" />
                    </span>
                </div>
            }
        >
            {todo.name}
        </ButtonStyled>
    )
}