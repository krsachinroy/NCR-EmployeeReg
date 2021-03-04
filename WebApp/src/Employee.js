import React,{Component} from 'react';
import {Table,Image} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';

import './Emp.css';

export class Employee extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false,empid:null,qid:null,fn:null,ln:null,ph:null,add:null,city:null,state:null,country:null,imageURL:null}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Employee')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(empid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'Employee/'+empid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    //, 
    render(){
        const {emps}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Profile Photo</th>
                            <th>EmployeeId</th>
                        <th>QuickLook ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                            <tr key={emp.EmployeeID}>
                                <td >{<Image className="photo" src={emp.ImageURL}/>}</td>
                                <td>{emp.EmployeeID}</td>
                                <td>{emp.QuickLookId}</td>
                                <td>{emp.FirstName}</td>
                                <td>{emp.LastName}</td>
                                <td>{emp.PhoneNumber}</td>
                                <td>{emp.Address}</td>
                                <td>{emp.City}</td>
                                <td>{emp.State}</td>
                                <td>{emp.Country}</td>
                            
                            <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,empid:emp.EmployeeID,
                                                                                            fn:emp.FirstName,
                                                                                            qid:emp.QuickLookId,
                                                                                            ln:emp.LastName,
                                                                                            ph:emp.PhoneNumber,
                                                                                            add:emp.Address,
                                                                                            city:emp.City,
                                                                                            state:emp.State,
                                                                                            country:emp.Country,
                                                                                            imageURL:emp.ImageURL})}>
                                        Edit
                                    </Button>

                                    <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteEmp(emp.EmployeeID)}>
                                        Delete
                                    </Button>

                                    <EditEmpModal show={this.state.editModalShow}
                                            empid={emp.EmployeeID}
                                            fn={emp.FirstName}
                                            qid={this.state.qid}
                                            
                                            ln={emp.LastName}
                                            ph={emp.PhoneNumber}
                                            add={emp.Address}
                                            city={emp.City}
                                            state={emp.State}
                                            country={emp.Country}
                                            imageURL={emp.ImageURL}
                                            onHide={editModalClose}
                                    />
                                </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Employee</Button>
                    
                    <AddEmpModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}