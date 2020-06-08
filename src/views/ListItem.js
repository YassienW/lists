import React, {useState} from "react";
import {Button, IconButton, Icon, Input} from "rsuite";

export default function ListItem({title, hasSublist, estimatedHours, hoursTaken, addSublist, updateItem, deleteItem}) {
    const [isEditing, setIsEditing] = useState(!title);
    const [showOptions, setShowOptions] = useState(false);
    const [inputTitle, setInputTitle] = useState(title);

    let mainComponent = <span onClick={() => setIsEditing(!isEditing)}>{title}</span>;

    if(isEditing){
        mainComponent = (
            <>
                <Input value={inputTitle} onChange={(value) => setInputTitle(value)}/>
                <IconButton icon={<Icon icon="check"/>} color="green"
                            onClick={() => {updateItem("title", inputTitle);setIsEditing(false);}}/>
                <IconButton icon={<Icon icon="close"/>} color="red"
                            onClick={() => title? setIsEditing(false): deleteItem()}/>
            </>
        );
    }

    return (
        <li>
            <div className="row">
                <div className="list-item" onMouseEnter={() => setShowOptions(true)}
                     onMouseLeave={() => setShowOptions(false)}>
                    {mainComponent}
                    {showOptions && !isEditing &&
                    <div>
                        {!hasSublist && <Button onClick={addSublist}>Add Sublist</Button>}
                        <Button onClick={deleteItem}>Delete</Button>
                    </div>}
                </div>
                <div className="hours-input">
                    <input type="number" value={estimatedHours}
                           onChange={(e) => updateItem("estimatedHours", Number(e.target.value))}/>
                    <input type="number" value={hoursTaken}
                           onChange={(e) => updateItem("hoursTaken", Number(e.target.value))}/>
                </div>
            </div>
        </li>
    );
}