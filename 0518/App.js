import './App.css';
import {useState, useEffect} from "react";
import SignupForm from "./SignupForm";
import {login} from "./Api";

function App() {
  const [user, setUser] = useState(null);
  const [showSignupForm, setShowSignupForm] = useState(false);
  useEffect( ()=> {
    const callLogin = async () => {
      const res = await login();
      setUser({name: res.data.name});
    }
    callLogin();
  }, []);
  const completeSignup = (newUser) => {
    if (!newUser) {
      alert('회원가입에 실패했습니다.');
      setShowSignupForm(false);
      return;
    }
    setUser(newUser);
    localStorage.setItem('key', newUser.key);
    setShowSignupForm(false);
  };

  return (
    <div className="App">
      <div id="snuChat">
        <div id="userInfo">
          {user ? <div>{user.name}님 환영합니다.</div>
          : <button onClick={()=> setShowSignupForm(!showSignupForm)}>회원가입</button>
          }
        </div>
        <div id="chatContainer">
          <div id="rooms">
            방들이 보입니다.
          </div>
          <div id="chats">
            채팅 목록이 보입니다.
          </div>
        </div>
      </div>
      {showSignupForm ? <SignupForm completeSignup={completeSignup} /> : ''}

    </div>
  );
}

export default App;
