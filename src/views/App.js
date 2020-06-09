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
    {id: "0", title: "Item 1", estimatedHours: 0, hoursTaken: 0, items: []}
];

export default function App() {
    const [items, setItems] = useState(loadedItems? JSON.parse(loadedItems): initialItems);
    const [totalEstimatedHours, setTotalEstimatedHours] = useState(0);
    const [totalHoursTaken, setTotalHoursTaken] = useState(0);

    useEffect(() => {
        let totalEstimatedHours = 0;
        let totalHoursTaken = 0;
        traverseAndCall(items, (item) => {
            totalEstimatedHours+= item.estimatedHours;
            totalHoursTaken+= item.hoursTaken;
        })
        setTotalEstimatedHours(totalEstimatedHours);
        setTotalHoursTaken(totalHoursTaken);

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
                <Navbar appearance="inverse">
                    <Navbar.Header>

                    </Navbar.Header>
                    <Navbar.Body>
                        <Nav pullRight>
                            <Nav.Item icon={<Icon icon="github" size="lg"/>}/>
                        </Nav>
                    </Navbar.Body>
                </Navbar>
            </Header>
            <Content id="main-content">
                <Grid>
                    <Row>
                        <Col xs={24}>
                            <List items={items} updateItem={updateItem}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24}>
                            <h4>Total Estimated Hours: {totalEstimatedHours}</h4>
                            <h4>Total Hours Taken: {totalHoursTaken}</h4>
                        </Col>
                    </Row>
                </Grid>
            </Content>
        </Container>
    );
}