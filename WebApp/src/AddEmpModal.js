import React,{Component} from 'react';
import {Modal,Button, Row, Col,Form, Image} from 'react-bootstrap';
// import { Employee } from './Employee';
import Form1 from './FormCust';
import EmpJSON from './EmployeeJSON.json';
//import Select from 'react-select'
export class AddEmpModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            quick: null,
            firstname: null,
            lastname: null,
            phone: null,
            address: null,
            city: null,
            state: null,
            country: null,
            errors: {
              quick: '',
            firstname: '',
            lastname: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            country: '',
            }
          };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    // componentDidMount(){
    //     fetch(process.env.REACT_APP_API+'department')
    //     .then(response=>response.json())
    //     .then(data=>{
    //         this.setState({deps:data});
    //     });
    // }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Employee',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                QuickLookId : EmpJSON.QuickLookId,
                FirstName : EmpJSON.FirstName,
                LastName : EmpJSON.LastName,
                PhoneNumber : EmpJSON.PhoneNumber,
                Address : EmpJSON.Address,
                City : EmpJSON.City,
                State : EmpJSON.State,
                Country : EmpJSON.Country,
                ImageURL : EmpJSON.ImageURL
            })
        })
        .then(res=>res.json())
        .then((result)=>{
               EmpJSON.EmployeeID = null;
               EmpJSON.QuickLookId = null;
               EmpJSON.FirstName= null;
               EmpJSON.LastName = null;
               EmpJSON.PhoneNumber = null;
               EmpJSON.Address = null;
               EmpJSON.City = null;
               EmpJSON.State = null;
               EmpJSON.Country = null;
               EmpJSON.ImageURL = null;
               EmpJSON.saveClick= false;
               this.imagesrc=null;
                alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }


    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        var Photo = this.photofilename.toString();
        var sub = Photo.substring(Photo.indexOf('.')+1,Photo.length);
        if(sub.toLowerCase() === 'png' || sub.toLowerCase() === 'jpeg' || sub.toLowerCase() === 'jpg'){
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'Employee/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
            EmpJSON.ImageURL=this.imagesrc;
        },
        (error)=>{
            alert('Failed');
        })}
        else
        {
           
            alert("Please Upload proper Image in png/jpeg/jpg format");
            this.photofilename=null;
        }
        
    }

    render(){
        return (
            <div className="container">

    <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add Employee
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
               
                 <Form1 Imageurl={this.imagesrc}/>
                 
            </Col>

             <Col sm={6}>
                <Image width="200px" height="200px" src={this.imagesrc}/>
                <input onChange={this.handleFileSelected} type="File"/>
            </Col> 
            <Form.Group>
                <Button variant="primary" type="submit" onClick={this.handleSubmit} disabled={!EmpJSON.saveClick}>Add Employee</Button>
            </Form.Group>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}