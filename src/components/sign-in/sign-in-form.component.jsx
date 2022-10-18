import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import { 
    signInWithGooglePopUp, 
    signInAuthUserWithEmailAndPassword 
    } from "../../utils/firebase/firebase.utils";
import './sign-in-form.styles.scss';



const defaultformFields = {
    email: '',
    password: ''
};


const SignInForm = () => {

    const [formFields, setformFields] = useState(defaultformFields);
    const { email, password } = formFields;

    const resetFormfields = () => {
        setformFields(defaultformFields);
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopUp();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(
                email,
                password
                );
         resetFormfields();
                
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for this email!');
                    break
                case 'auth/user-not-found':
                    alert('No user associated with this email!');
                    break;
                default:
                    console.log(error)
            }
            // if (error.code === "auth/wrong-password") {
            //     alert('Password is incorrect!');
            // } else if (auth / user - not - found);
            // console.log(error);
        };
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setformFields({ ...formFields, [name]: value })
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign In Email and Password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    label='Name' 
                    type="email" 
                    required onChange={handleChange} 
                    name="email" 
                    value={email} />

                <FormInput 
                    label='Password' 
                    type="password" 
                    required onChange={handleChange} 
                    name="password" 
                    value={password} />

                <div className="buttons-container">
                    <Button type="submit"> Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type= 'button'
                        onClick={signInWithGoogle}>
                            Sign In With Google
                        </Button>
                </div>

            </form>

        </div>
    )
}

export default SignInForm;