import React, { useEffect, useState } from 'react'
import "./style.css"

const getLocalData = () => {
    const lists = localStorage.getItem("ToDo-List")

    if (lists) {
        return JSON.parse(lists)
    } else {
        return []
    }
}

function Todo() {
    const [inputData, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData())
    const [editedItem, setEditedItem] = useState("")
    const [toggleButton, setToggleButton] = useState(false)

    // add item function
    const addItem = () => {
        if (!inputData) {
            alert("oops nothing to be add")
        } else if (inputData && toggleButton) {
            setItems(
                items.map((currElement) => {
                    if (currElement.id === editedItem) {
                        return { ...currElement, name: inputData };
                    }
                    return currElement;
                })
            );
            setInputData([])
            setEditedItem(null);
            setToggleButton(false);
        } else {

            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            };
            // setItems([...items, inputData])
            setItems([...items, myNewInputData])
            setInputData("")
        }
    }

    // Edit Items
    const editItem = (index) => {
        const editedItems = items.find((currElement) => {
            return currElement.id === index;
        });
        setInputData(editedItems.name)
        setEditedItem(index);
        setToggleButton(true);
    }
    // Delete item
    const deleteItem = (index) => {
        const updatedItem = items.filter((currElement) => {
            return currElement.id !== index;
        });
        setItems(updatedItem);
    }

    // remove all elemets

    const removeAll = () => {
        setItems([]);
    };

    // adding data to local storage

    useEffect(() => {
        localStorage.setItem("ToDo-List", JSON.stringify(items));
    }, [items]);

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="https://tse3.mm.bing.net/th?id=OIP.uqi4Pm5s5qLc2GCCtZ7_ygHaHa&pid=Api&P=0&h=180" alt="todo Logo" />
                        <figcaption>Add Your List Here 🤞</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" name="" id=""
                            placeholder='Add list Items 📃'
                            className='form-control'
                            value={inputData}
                            onChange={(event) => setInputData(event.target.value)}
                        />
                        <i className="fa fa-plus add-btn" onClick={addItem}></i>
                    </div>

                    {/* show items */}
                    <div className="showItems">
                        {items.map((currElement) => {
                            return (

                                <div className="eachItem" key={currElement.id}>
                                    <h3>{currElement.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit add-btn" onClick={() => editItem(currElement.id)}></i>
                                        <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(currElement.id)}></i>
                                    </div>
                                </div>
                            );

                        })}
                    </div>

                    {/* Remove all items */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>Check List</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;
