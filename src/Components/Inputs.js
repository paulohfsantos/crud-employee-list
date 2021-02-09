import React, {useState} from 'react'
import axios from 'axios'
import '../style/Inputs.css'

function Inputs() {

    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [country, setCountry] = useState('')
    const [position, setPosition] = useState('')
    const [wage, setWage] = useState(0)

    //CRUD - update
    const [newWage, setNewWage] = useState(0)

    const [employeeList, setEmployeeList] = useState([])

    const addEmployee = () => {
        axios.post('http://localhost:3001/Create', {
            //key: value
            name: name,
            age: age,
            country: country,
            position: position,
            wage: wage
        }).then(()=>{
            console.log('success!')
            setName('')
            setAge('')
            setCountry('')
            setPosition('')
            setWage('')
            setEmployeeList([
                ...employeeList,
                {
                    name: name,
                    age: age,
                    country: country,
                    position: position,
                    wage: wage
                }
            ])
            console.log(name)
        })
    }

    const getEmployees = () => {
        axios.get('http://localhost:3001/Employees').then((response)=>{
            console.log(response)
            setEmployeeList(response.data)
        })
    }

    const updateEmployeeWage = (id) => {
        axios.put('http://localhost:3001/Update', { wage: newWage, id: id }).then(
            (response)=>{
            setEmployeeList(
                employeeList.map((val)=>{
                    return val.id == id ?
                        {
                            id: val.id,
                            name: val.name,
                            country: val.country,
                            age: val.age,
                            position: val.position,
                            wage: newWage
                        }
                    : val
                })
            )
        })
    }

    const deleteEmployee = (id) => {
        axios.delete(`http://localhost:3001/Delete/${id}`).then((response)=>{
            setEmployeeList(employeeList.filter((val)=>{
                return val.id != id
            }))
        })
    }

    return (
        <div className="container">
            <div className="main">
                <h1>Become a Employee</h1>
                
                <label>Name:</label>
                <input type="text" value={name} onChange={(event) => {setName(event.target.value)}} />

                <label>Age:</label>
                <input type="number" value={age} onChange={(event) => {setAge(event.target.value)}} />

                <label>country:</label>
                <input type="text" value={country} onChange={(event) => {setCountry(event.target.value)}} />

                <label>Position:</label>
                <input type="text" value={position} onChange={(event) => {setPosition(event.target.value)}} />

                <label>Wage /year:</label>
                <input type="number" value={wage} onChange={(event) => {setWage(event.target.value)}} />

                <button onClick={addEmployee}>Add Employee</button>
            </div>
            <hr />
            <div className="main">
                <button onClick={getEmployees}>Get Employee</button>
                <div className="list-emp">
                    <ul style={{textAlign: 'center'}}>
                        {
                            employeeList.map((val, key)=>{
                                return(
                                    <li key={key}>
                                        <div className="employee-card">
                                            <div className="employee-name">
                                                Name: <span>{val.name}</span>
                                            </div>
                                            <div className="employee-age">
                                                Age: <span>{val.age} Years old</span>
                                            </div>
                                            <div className="employee-country">
                                                Country: <span>{val.country}</span>
                                            </div>
                                            <div className="employee-position">
                                                Position: <span>{val.position}</span>
                                            </div>
                                            <div className="employee-wage">
                                                Wage <em>per year:</em> <span style={{color: '#333'}}>{val.wage}</span>
                                            </div>
                                        </div>
                                        <div className="update-box">
                                            <input type="text" placeholder="Update Wage" onChange={(event) => {setNewWage(event.target.value)}} />
                                            <button onClick={()=>{updateEmployeeWage(val.id)}}>Update</button>
                                            <button onClick={() =>{deleteEmployee(val.id)}}>Delete</button>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Inputs