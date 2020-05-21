import React, {useState} from "react";

export default function ListItem({title, hasSublist, estimatedHours, hoursTaken, addSublist, updateItem, deleteItem}) {
    const [isEditing, setIsEditing] = useState(!title);
    const [showOptions, setShowOptions] = useState(false);
    const [inputTitle, setInputTitle] = useState(title);

    let mainComponent = <span onClick={() => setIsEditing(!isEditing)}>{title}</span>;

    if(isEditing){
        mainComponent = (
            <>
                <input value={inputTitle} onChange={(e) => setInputTitle(e.target.value)}/>
                <button onClick={() => {updateItem("title", inputTitle);setIsEditing(false);}}>&#x02713;</button>
                <button onClick={() => title? setIsEditing(false): deleteItem()}>&#x02717;</button>
            </>
        );
    }

    return (
        <li>
            <div className="row">
                <div className="list-item" onMouseEnter={() => setShowOptions(true)}
                     onMouseLeave={() => setShowOptions(false)}>
                    {mainComponent}
                    {showOptions && !isEditing && <div className="controls">
                        {!hasSublist && <button onClick={addSublist}>Add Sublist</button>}
                        <button onClick={deleteItem}>Delete</button>
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