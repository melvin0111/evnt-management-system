import { useNavigate } from 'react-router-dom' 
import '../signupForm/SignupForm.css'
import '../loginForm/LoginForm.css'

function SignupForm(){
        const navigate = useNavigate();
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [username, setUsername] = useState(''); 
        const [contactInfo, setContactInfo] = useState(''); 
      
        const SignUpFn = (e) => {
          e.preventDefault();
          // For now, we're assuming any login attempt is successful
          console.log("Signing up with:", email, password);
          // Redirect to a specific route on successful login
          navigate('/Dashboard'); 
        }; 
      
        return (
          <div className='flex-container2'>
            <form className='modal-form2' onSubmit={SignUpFn}>
              <h2>Sign Up</h2> 
              <div className='form-group2'>
                <label htmlFor='username'>Username</label>
                <input
                  type='username'
                  placeholder='Enter Username'
                  id='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className='form-group2'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  placeholder='Enter Email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='form-group2'>
                <label htmlFor='password'>Set Password</label>
                <input
                  type='password'
                  placeholder='Enter Password'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div> 
              <div className='form-group2'>
                <label htmlFor='contactInfo'>Contact Info</label>
                <input
                  type='contactInfo'
                  placeholder='Enter Contact Info'
                  id='contactInfo'
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                />
              </div>
              <button type='submit' className='btn-primary'>
                Sign Up 
              </button>
            </form>
          </div>
        );
      }; 
      
export default SignupForm;  