import React, { useState } from 'react';
import axios
 from 'axios';
const PasswordValidator = () => {
  const [password, setPassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [id,setId]=useState('')
  const [token,setToken]=useState('')

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setPassword(e.target.value);
    
    console.log(password)
   
    setErrorMessage('');
  };
  const handleChangeNewP=(e)=>{
    setNewpassword(e.target.value)
    console.log(newpassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const consecutiveCharsRegex = /012|123|234|345|456|567|678|789|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|ABC|BCD|CDE|DEF|EFG|FGH|GHI|HIJ|IJK|JKL|KLM|LMN|MNO|NOP|OPQ|PQR|QRS|RST|STU|TUV|UVW|VWX|WXY|XYZ/;
    const consecutiveDigitsRegex = /(\d)\1\1/;
    setId(localStorage.getItem('id'))
    setToken(localStorage.getItem('token'))
    if (newpassword.length < 8) {
      setErrorMessage('Parola en az 8 karakter olmalıdır.');
    } else if (consecutiveCharsRegex.test(newpassword)) {
      setErrorMessage('Parola ardışık üç rakam veya üç harf içeremez.');
    } else if (consecutiveDigitsRegex.test(newpassword)) {
      setErrorMessage('Parola ardışık üç rakam içeremez.');
    } else {
        try {
            const response = await axios.post('https://localhost:7069/User/ChangePassword', {
              currentPassword: password,
              newPassword: newpassword,
              id:id,
              token:token
            });
            
            if (response.data === 'Password changed successfully') {
              
            } else {
              setErrorMessage(response.data);
            }
          } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred while changing password');
          }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Current Password:
          <input type="password" value={password} onChange={handleChange} />
          <br></br>
          New Password:
          <input type="password" value={newpassword} onChange={handleChangeNewP} />
        </label>
        <button type="submit">Şifre Değiş</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default PasswordValidator;
