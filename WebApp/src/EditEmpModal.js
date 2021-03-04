import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import Form1 from './FormCust'; 
import EmpJSON from './EmployeeJSON.json';

export class EditEmpModal extends Component{
    constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleFileSelected=this.handleFileSelected.bind(this);
    
        this.state={
            qid:this.props.qid,
            fn:this.props.fn,
            ln:this.props.ln,
            ph:this.props.ph,
            add:this.props.add,
            city:this.props.city,
            state:this.props.state,
            country:this.props.country,
            imageURL:this.props.imageURL};
}
    


    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Employee',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmployeeID : this.props.empid,
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
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }
    
    handleFileSelected(event)
    {
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );
        fetch(process.env.REACT_APP_API+'Employee/SaveFile',{
            method:'Put',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
            EmpJSON.ImageURL=this.imagesrc;
        },
        (error)=>{
            alert('Failed');
        })
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
                Edit Employee
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form>
                                <Form.Group controlId="EmployeeId">
                                <Form.Label>EmployeeId</Form.Label>
                                <Form.Control type="text" name="EmployeeId" required
                                value={this.props.empid}
                                disabled
                                defaultValue={this.props.empid}
                               />
                                </Form.Group>
                                <Form1 
                                    fn={this.state.fn}
                                    ln={this.state.ln}
                                    ph={this.state.ph}
                                    add={this.state.add}
                                    city={this.state.city}
                                    state={this.state.state}
                                    country={this.state.country}
                                    imageURL={this.state.imageURL}
                                />
                            </Form>
                        </Col>

                        <Col sm={6}>
                            <Image width="200px" height="200px"
                            src={process.env.REACT_APP_PHOTOPATH+this.props.photofilename}/>
                            <input onChange={this.handleFileSelected} type="File"/>
                        </Col>
                        <Form.Group>
                                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                                    Update Employee
                                </Button>
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