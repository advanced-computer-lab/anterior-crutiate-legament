import React, {useState} from 'react';

import NavBar from '..//templates/NavBar';
import Footer from '../templates/Footer';
import TextField from '@mui/material/TextField';
import Form from '@mui/material/FormGroup';
import SubmitButton from '../basic components/SubmitButton';
import Progress from "../basic components/Progress";
import axios from 'axios';

function ContactForm(props) {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const [senderInfo, setSenderInfo] = useState(
        {
            name: "",
            email: "",
            subject: "",
            userMessage: ""
        }
    );

    const [sending, setSending] = useState(false);


    const send = async (e) => {
        if (await isValidEmail(senderInfo.email)) {
            setSubmitted(true);
            setError(false);

        await axios.post(`http://localhost:8000/api/user/contactUs`, senderInfo);
        }
        else{
            setSubmitted(false);
            setError(true);
            setMessage("Please Enter valid mail")
        }

    };


    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <h6>Message sent successfully!!</h6>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = (message) => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h6>{message}</h6>
            </div>
        );
    };


    return (

        <>
            <Form>
                <TextField
                    value={senderInfo.name}
                    onChange={(e) => setSenderInfo({...senderInfo, name: e.target.value})}
                    id="outlined-basic" label="Name" margin="dense" variant="outlined"/>
                <TextField
                    value={senderInfo.email}
                    onChange={(e) => setSenderInfo({...senderInfo, email: e.target.value})}
                    id="outlined-basic" label="Email" margin="dense" variant="outlined"/>
                <TextField
                    value={senderInfo.subject}
                    onChange={(e) => setSenderInfo({...senderInfo, subject: e.target.value})}
                    id="outlined-basic" label="Subject  " margin="dense" variant="outlined"/>
                <TextField
                    value={senderInfo.userMessage}
                    onChange={(e) => setSenderInfo({...senderInfo, userMessage: e.target.value})}
                    id="outlined-basic" label="Message" margin="dense" variant="outlined"/>

                {sending ?
                    <Progress/> :
                    <SubmitButton buttonText={"Send"} click={send}/>
                }
            </Form>
            <div className="messages">
                {errorMessage(message)}
                {successMessage()}
            </div>

        </>

    );
}
async function isValidEmail  (email){

        var re = /\S+@\S+\.\S+/;
        return re.test(email);


}


export default ContactForm;