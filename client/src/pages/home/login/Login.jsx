
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, reset } from '../../../features/authentication/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // get the state values

    const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth);


    // check if error change 
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        else if (isSuccess) {
            navigate('/home')
        }

        dispatch(reset())
    }, [isError, message])


    const [formFields, setFormFields] = useState({
        email: '', password: ''
    });
    // destructure
    const { email, password } = formFields;

    // handle the change

    const handleChange = (e) => {
        setFormFields((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }))
    }


    const handleLogin = () => {
        const values = {
            email, password
        }

        dispatch(loginUser(values))
        if(isSuccess){
            navigate('/userpage')
        }

    }

    return (
        <>
            
           <h5>Welcome back,</h5>
              
                        <form>
                           
                            <input name='email' value={email} onChange={handleChange} className='form-control' type="text" placeholder='Enter your registed email' />
                           
                            <input name='password' value={password} onChange={handleChange} className='form-control' type="password" placeholder='Enter your password' />
                            <Button onClick={handleLogin} style={{
                                background: '#00A884'
                            }} className='w-100 my-2 border-0 fw-bold'>
                                Login
                            </Button>
                        </form>
                           
            
        </>
    )
}

export default Login
