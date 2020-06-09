import React, {useState, useEffect} from "react";
import {Container, Header, Content, Navbar, Nav, Icon, Grid, Row, Col} from "rsuite";
import List from "./List";

//traverses all tasks and calls a function for each task
function traverseAndCall(items, callback){
    items.forEach((item) => {
        callback(item);
        if(item.items){
            return {...item, items: traverseAndCall(item.items, callback)};
        }else{
            return item;
        }
    });
}
//returns a cloned items array with the required "key" set to "value" for the "targetId"
function traverseAndReplace(items, targetId, key, value){
    return items.map((item) => {
        if(item.id === targetId){
            return {...item, [key]: value};
        }else{
            if(item.items){
                return {...item, items: traverseAndReplace(item.items, targetId, key, value)};
            }else{
                return item;
            }
        }
    });
}

const loadedItems = localStorage.getItem("list");
const initialItems = [
    {id: "0", title: "Item 1", estimatedHours: 0, hoursTaken: 0, checked: false, items: []}
];

export default function App() {
    const [items, setItems] = useState(loadedItems? JSON.parse(loadedItems): initialItems);
    const [totalEstimatedHours, setTotalEstimatedHours] = useState(0);
    const [totalHoursTaken, setTotalHoursTaken] = useState(0);
    const [checked, setChecked] = useState(0);
    const [unchecked, setUnchecked] = useState(0);

    useEffect(() => {
        let totalEstimatedHours = 0;
        let totalHoursTaken = 0;
        let checked = 0;
        let unchecked = 0;
        traverseAndCall(items, (item) => {
            totalEstimatedHours+= item.estimatedHours;
            totalHoursTaken+= item.hoursTaken;

            if(item.checked){
                checked++;
            }else{
                unchecked++
            }
        })
        setTotalEstimatedHours(totalEstimatedHours);
        setTotalHoursTaken(totalHoursTaken);
        setChecked(checked);
        setUnchecked(unchecked);

        //save the list to localStorage
        localStorage.setItem("list", JSON.stringify(items));
    }, [items]);

    //itemId refers to the ID of the item who's key we need to set to value
    //if there is no itemID we set items to the given value
    function updateItem(itemId, key, value){
        if(itemId){
            const updatedItems = traverseAndReplace(items, itemId, key, value);
            setItems(updatedItems);
        }else{
            setItems(value);
        }
    }
    return (
        <Container>
            <Header>
                <Navbar id="navbar" appearance="inverse">
                    <Navbar.Header>

                    </Navbar.Header>
                    <Navbar.Body>
                        <Nav pullRight>
                            <Nav.Item icon={<Icon fixedWidth icon="github" size="lg"/>}/>
                        </Nav>
                    </Navbar.Body>
                </Navbar>
            </Header>
            <Content id="main-content">
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <h5>{checked + unchecked} items</h5>
                            <p>{checked} done, {unchecked} remaining</p>
                        </Col>
                        <Col xs={12}>

                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col xs={24}>
                            <List items={items} updateItem={updateItem}/>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col xs={24}>
                            <h5>Total Estimated Hours: {totalEstimatedHours}</h5>
                            <h5>Total Hours Taken: {totalHoursTaken}</h5>
                        </Col>
                    </Row>
                </Grid>
            </Content>
        </Container>
    );
}