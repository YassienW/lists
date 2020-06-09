import React, {useState} from "react";
import {Button, IconButton, Icon, Input, FlexboxGrid, InputNumber} from "rsuite";

export default function ListItem({title, hasSublist, estimatedHours, hoursTaken, addSublist, updateItem, deleteItem}) {
    const [isEditing, setIsEditing] = useState(!title);
    const [showOptions, setShowOptions] = useState(false);
    const [inputTitle, setInputTitle] = useState(title);

    function commitUpdate(){
        updateItem("title", inputTitle);
        setIsEditing(false);
    }

    return (
        <li>
            <FlexboxGrid justify="space-between" align="middle">
                <FlexboxGrid className={`list-item ${isEditing? "editing": ""}`} align="middle"
                             onMouseEnter={() => setShowOptions(true)}
                             onMouseLeave={() => setShowOptions(false)}>
                    <FlexboxGrid.Item colspan={14} className="input" onClick={() => setIsEditing(true)}>
                        {!isEditing && <span>{title}</span>}
                        {isEditing && <Input autoFocus size="sm" value={inputTitle}
                                             onChange={(value) => setInputTitle(value)}/>}
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={10} className="controls">
                        {isEditing &&
                        <>
                            <IconButton size="sm" icon={<Icon icon="check"/>} color="green" onClick={commitUpdate}/>
                            <IconButton size="sm" icon={<Icon icon="close"/>} color="red"
                                        onClick={() => title? setIsEditing(false): deleteItem()}/>
                        </>}
                        {showOptions && !isEditing &&
                        <>
                            {!hasSublist && <Button size="sm" onClick={addSublist}>Add Sublist</Button>}
                            <Button size="sm" onClick={deleteItem} color="red">Delete</Button>
                        </>}
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <FlexboxGrid className="hours-input" align="middle">
                    <FlexboxGrid.Item colspan={10}>
                        <InputNumber value={estimatedHours} min={0} size="sm"
                                     onChange={(value) => updateItem("estimatedHours", Number(value))}/>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={4}/>
                    <FlexboxGrid.Item colspan={10}>
                        <InputNumber value={hoursTaken} min={0} size="sm"
                                     onChange={(value) => updateItem("hoursTaken", Number(value))}/>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </FlexboxGrid>
        </li>
    );
}