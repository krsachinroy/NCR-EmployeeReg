import React, { Component } from 'react';
import FormErrors from './FormError';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import EmpJSON from './EmployeeJSON.json';
//import './Emp.css';
import './Form.css';

class FormCust extends Component {
  constructor (props) {
    super(props);
    this.state = {
            Id:null,
            quick: this.props.qid,
            firstname: this.props.fn,
            lastname: this.props.ln,
            phone: this.props.ph,
            address: this.props.add,
            city: this.props.city,
            state: this.props.state,
            country: this.props.country,
            imageURL:this.props.imageURL,
            formErrors: {
            Id: '',
            quick: '',
            firstname: '',
            lastname: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            country: '',
            imageURL:''},
      IdValid: true,
      quickValid: false,
      firstValid: false,
      lastValid: false,
      phoneValid: false,
      addressValid: false,
      cityValid: false,
      stateValid: false,
      countryValid: false,
      imageValid:false,
      formValid: false
    }
    this.handleSubmit=this.handleSubmit.bind(this);
  }
 

  handleUserInput = (e) => {
    
    // const quick = e.target.quick;
    // const firstname = e.target.firstname;
    // const lastname = e.target.lastname;
    // const phone = e.target.phone;
    // const address = e.target.address;
    // const city = e.target.city;
    // const state = e.target.state;
    // const country = e.target.country;
    // const Id = e.target.Id;
    const fieldName = e.target.name.toString();
    const fieldValue = e.target.value.toString();
    // this.setState({[Id]: this.Id,[quick]:this.quick,[firstname]:this.firstname,[lastname]:this.lastname,[phone]:this.phone,[address]:this.address,[city]:this.city,[state]:this.state,[country]:this.country},
    //               () => { this.validateField(Id, value) });
    this.setState({[fieldName]:fieldValue},
        () => { this.validateField(fieldName, fieldValue) });
  }

  validateField(fieldName, fieldValue) {
    let fieldValidationErrors = this.state.formErrors;
    let IdValid= this.state.IdValid;
    let quickValid= this.state.quickValid;
    let firstValid= this.state.firstValid;
    let lastValid= this.state.lastValid;
    let phoneValid= this.state.phoneValid;
    let addressValid= this.state.addressValid;
    let cityValid= this.state.cityValid;
    let stateValid= this.state.stateValid;
    let countryValid= this.state.countryValid;
    let imageValid = this.state.imageValid;

    switch(fieldName) {
        case 'quick':
            var re1 = /^[a-zA-Z0-9]+$/;
            quickValid=false;
            if(fieldValue.length===10 && re1.test(fieldValue))
            quickValid=true;
            fieldValidationErrors.quick = quickValid ? '': ' is invalid. Please enter correct QLID';
        break;
        case 'firstname':
            var re2 = /^[a-zA-Z]+$/;
            firstValid=false;
            if(fieldValue.length<=10 && re2.test(fieldValue))
            firstValid=true;
            fieldValidationErrors.firstname = firstValid ? '': ' is invalid. Please enter correct First Name';
        break;
        case 'lastname':
            var re3 = /^[a-zA-Z]+$/;
             lastValid=false;
            if(fieldValue.length<=10 && re3.test(fieldValue))
            lastValid=true;
            fieldValidationErrors.lastname = lastValid ? '': ' is invalid. Please enter correct Last Name';
        break;
        case 'phone':
            var re4 = /^[0-9]+$/;
             phoneValid=false;
            if(fieldValue.length===10 && re4.test(fieldValue))
            phoneValid=true;
            fieldValidationErrors.phone =phoneValid ? '': ' is invalid. Please enter correct Phone Number';
        break;
        case 'address':
            addressValid=false;
            if(fieldValue.length<=50)
            addressValid=true;
            fieldValidationErrors.address =addressValid ? '': ' is too long. Please enter Address upto 50 characters only.';
        break;
        case 'city':
            var re5 = /^[a-zA-Z\s]+$/;
            cityValid=false;
            if(fieldValue.length<=20 && re5.test(fieldValue))
            cityValid=true;
            fieldValidationErrors.city = cityValid ? '': ' is invalid. Please enter correct City Name';
        break;
        case 'state':
            var re6 = /^[a-zA-Z\s]+$/;
            stateValid=false;
            if(fieldValue.length<=20 && re6.test(fieldValue))
            stateValid=true;
            fieldValidationErrors.state = stateValid ? '': ' is invalid. Please enter correct State Name';
        break;
        case 'country':
            var re7 = /^[a-zA-Z\s]+$/;
            countryValid=false;
            if(fieldValue.length<=20 && re7.test(fieldValue))
            countryValid=true;
            fieldValidationErrors.country = countryValid ? '': ' is invalid. Please enter correct country Name';
        break;
        case 'imageURL':
            var sub = fieldValue.subString(fieldValue.indexOf('.')+1,fieldValue.length);
            imageValid=false;
            if(sub.toLowerCase() === 'png' || sub.toLowerCase() === 'jpeg' || sub.toLowerCase() === 'jpg')
            imageValid=true;
            fieldValidationErrors.imageURL = imageValid ? '': ' is invalid. Please enter proper Image in png/jpeg/jpg format';
            break;
        default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    IdValid: IdValid,
                    quickValid: quickValid,
                    firstValid: firstValid,
                    lastValid: lastValid,
                    phoneValid: phoneValid,
                    addressValid: addressValid,
                    cityValid: cityValid,
                    stateValid: stateValid,
                    countryValid: countryValid,
                    imageValid:imageValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid:
        this.state.IdValid
        && this.state.quickValid
        &&  this.state.firstValid
        && this.state.lastValid
        && this.state.phoneValid
        && this.state.addressValid
        && this.state.cityValid
        &&  this.state.stateValid
        && this.state.countryValid
        && this.state.imageValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

//   handleSubmit(event){
//     event.preventDefault();
//     fetch(process.env.REACT_APP_API+'Employee',{
//         method:'POST',
//         headers:{
//             'Accept':'application/json',
//             'Content-Type':'application/json'
//         },
//         body:JSON.stringify({
//             QuickLookId : event.target.quick.value,
//             FirstName : event.target.firstname.value,
//             LastName : event.target.lastname.value,
//             PhoneNumber : event.target.phone.value,
//             Address : event.target.address.value,
//             City : event.target.city.value,
//             State : event.target.state.value,
//             Country : event.target.country.value,
//             ImageURL : this.props.Imageurl
//         })
//     })
//     .then(res=>res.json())
//     .then((result)=>{
//         alert(result);
//     },
//     (error)=>{
//         alert('Failed');
//     })
//}
        handleSubmit=(event)=>{
          event.preventDefault();
          EmpJSON.FirstName = this.state.firstname;
          EmpJSON.QuickLookId = this.state.quick;
          EmpJSON.LastName = this.state.lastname;
          EmpJSON.PhoneNumber = this.state.phone;
          EmpJSON.Address = this.state.address;
          EmpJSON.City = this.state.city;
          EmpJSON.State = this.state.state;
          EmpJSON.Country = this.state.country;
          EmpJSON.ImageURL = null;
        }
        handleLoad()
        {
            EmpJSON.ImageURL = null;
        }
  render () {
    return (
        
        <Form onLoad={this.handleLoad}>
            <FormErrors className= "error" style={{color:"red"}} formErrors={this.state.formErrors} />
            <Form.Group controlId="quick">
                <Form.Label>QuickLook ID</Form.Label>
                <Form.Control type="text" name="quick" required 
                 placeholder="Ex:AB12345678" 
                 value={this.state.quick}
                 onChange={this.handleUserInput}/>
            </Form.Group>
                <Form.Group controlId="firstname">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="firstname" required 
                placeholder="xyz"
                value={this.state.firstname}
                onChange={this.handleUserInput}/>
            </Form.Group>
            <Form.Group controlId="lastname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastname" required 
                placeholder="xyz"
                value={this.state.lastname}
                onChange={this.handleUserInput} />
            </Form.Group>
            <Form.Group controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" name="phone" required 
                placeholder="9874563210"
                value={this.state.phone}
                onChange={this.handleUserInput} />
            </Form.Group>
            <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" required 
                placeholder="max upto 10 words"
                value={this.state.address}
                onChange={this.handleUserInput}/>
            </Form.Group>
            <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name="city" required 
                placeholder="city"
                 value={this.state.city}
                 onChange={this.handleUserInput}/>
            </Form.Group>
            <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" name="state" required 
                placeholder="state"
                 value={this.state.state}
                 onChange={this.handleUserInput}/>
            </Form.Group>
            <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control  name="country" required 
                value={this.state.country}
                onChange={this.handleUserInput}/>
            </Form.Group>
            <Form.Group>
                <Button variant="primary" onClick={(e)=>this.handleSubmit(e)}>Save</Button>
            </Form.Group>
        </Form>
        
    )
  }
}

export default FormCust;