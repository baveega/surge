import {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../context/UserContext';

const Register = () => {
    const {registerUser, wait} = useContext(UserContext);
    const [errMsg, setErrMsg] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:''
    });

    const onChangeInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();

        if(!Object.values(formData).every(val => val.trim() !== '')){
            setSuccessMsg(false);
            setErrMsg('Please Fill in all Required Fields!');
            return;
        }

        const data = await registerUser(formData);
        if(data.success){
            e.target.reset();
            setSuccessMsg('You have successfully registered.');
            setErrMsg(false);
        }
        else if(!data.success && data.message){
            setSuccessMsg(false);
            setErrMsg(data.message);
        }
        
    }

    return (
        <div className="myform">
            <h2>Register</h2>
            <form onSubmit={submitForm}>
                <label htmlFor="name"></label>
                <input type="text" name="name" onChange={onChangeInput} placeholder="Full Name" id="name" value={formData.name} required />
                <label htmlFor="email"></label>
                <input type="email" name="email" onChange={onChangeInput} placeholder="Email" id="email" value={formData.email} required />
                <label htmlFor="username"></label>
                <input type="text" name="username" onChange={onChangeInput} placeholder="Username" id="username" value={formData.username} required />
                <label htmlFor="password"></label>
                <input type="password" name="password" onChange={onChangeInput} placeholder="Password" id="password" value={formData.password} required />
                <label htmlFor="confirmpassword"></label>
                <input type="password" name="confirmpassword" onChange={onChangeInput} placeholder="Confirm Password" id="confirmpassword" value={formData.confirmpassword} required />
                {successMsg && <div className="success-msg">{successMsg}</div>}
                {errMsg && <div className="err-msg">{errMsg}</div>}
                <button type="submit" disabled={wait}>Register</button>
                <div className="bottom-link"><Link to="/login">Login</Link></div>
            </form>
        </div>
    )
}

export default Register;