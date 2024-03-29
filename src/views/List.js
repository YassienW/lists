import React, {useState} from "react";
import ListItem from "./ListItem";
import {Input, Button, FlexboxGrid} from 'rsuite';

export default function List({parentItemId, items, updateItem}) {
    const [newItemTitle, setNewItemTitle] = useState("");

    const listComponents = items.map((item) => {
        const {id, title, items, estimatedHours, hoursTaken} = item;
        const itemComponent = <ListItem key={id} title={title} hasSublist={items.length}
                                        estimatedHours={estimatedHours} hoursTaken={hoursTaken}
                                        addSublist={() => appendToItems(id, items)}
                                        updateItem={(key, value) => updateItem(id, key, value)}
                                        deleteItem={() => deleteItem(id)}/>;

        if(item.items.length){
            return(
                <>
                    {itemComponent}
                    <List parentItemId={item.id} items={item.items} updateItem={updateItem}/>
                </>
            );
        }else{
            return itemComponent;
        }
    });

    function deleteItem(itemId){
        const newItems = items.filter((item) => item.id !== itemId);
        updateItem(parentItemId, "items", newItems);
    }
    //itemId refers to the item we want to append to its list
    function appendToItems(itemId, targetItems){
        const id = itemId? `${itemId}-${Date.now()}`: Date.now();
        const newItems = [...targetItems, {title: newItemTitle, id, estimatedHours: 0, hoursTaken: 0, checked: false, items: []}];

        updateItem(itemId, "items", newItems);
        setNewItemTitle("");
    }

    return (
        <ol>
            {listComponents}
            <FlexboxGrid align="middle" className="list-item">
                <FlexboxGrid.Item colspan={14}>
                    <Input value={newItemTitle} onChange={(value) => setNewItemTitle(value)} size="sm"
                           onKeyDown={(e) => e.keyCode === 13? appendToItems(parentItemId, items): null}/>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={10} className="controls">
                    <Button size="sm" appearance="primary"
                            onClick={() => appendToItems(parentItemId, items)}>Add item</Button>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </ol>
    );
}