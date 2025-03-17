
import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService'
import { AuthContext } from "../../context/AuthContext";
import { getLoggedInRole } from "../../services/utilService";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext)

    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginUser({ email, password });
        
        if (response.success) {
            
            // console.log(response.data.data) // userdata
            // console.log(response.data.data.role)
             const role = getLoggedInRole(response.data.token);
            console.log(`Decoded role in login: ${role}`)
            login( response.data.token,  response.data.refreshToken, response.data.data.role, response.data.data);
            navigate('/');
        }
        else {           
            // alert(response.message);
            // // setError(error?.response?.data?.message || 'An error occured.');
            setError(response.message || "An error occured")
        }

    }

    return (
        <div className="auth-wrapper auth-inner mt-20" style={ {  marginTop: '50px' }  }   >
          
            {/*   <h1>Login</h1> <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form> */}

            <form  onSubmit={handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" 
                     value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" 
                     value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
 

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
                {error && <span className='text-center text-danger mt-1'>{error}</span>}
            </form>

        </div>

    )
}

export default Login;