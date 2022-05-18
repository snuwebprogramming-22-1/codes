import {useState} from "react";
import {signup} from "./Api";

const SignupForm = ({ completeSignup }) => {
    const [name, setName] = useState('');
    const sendSignup = (e) => {
        e.preventDefault();
        signup(name)
            .then(res => {
                console.log(res);
                completeSignup(res.data);
            })
            .catch(e => {
                console.error(e);
                completeSignup(null);
            })
    }
    return <form id="signForm" onSubmit={sendSignup}>
        <label>
            닉네임:<input type="text" value={name} onChange={e => setName(e.target.value)}/>
        </label>
        <label>
            <input type="submit" value="회원가입"/>
        </label>
    </form>
}

export default SignupForm;
