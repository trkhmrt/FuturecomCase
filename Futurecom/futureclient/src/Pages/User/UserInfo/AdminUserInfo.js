import axios from "axios";
import React, { useEffect, useState } from 'react'

const NormalUserInfo = ({ user }) => {
    const [phone, setPhone] = useState(user.phone);
    const [mail, setMail] = useState(user.mail);
    const [status, setStatus] = useState(user.status);

    const updateUser = async () => {
        const userToUpdate = {
            id: user.id,
            phone: phone,
            mail: mail,
            status: status
        };
        try {
            const response = await axios.post("https://localhost:7069/User/update", userToUpdate);
            console.log(response.data); 
        } catch (error) {
            console.error(error.message); 
        }
    };

    useEffect(() => {
        setPhone(user.phoneNumber); 
        setMail(user.email); 
        setStatus(user.status)
    }, [user]); 

    return (
        <div>
            <h1>{user.firstName} {user.lastName}</h1>
            <label>Phone:</label>
            <br />
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <br />
            <label>Mail:</label>
            <br />
            <input type="text" value={mail} onChange={(e) => setMail(e.target.value)} />
            <br />
            <div>
                <label>Aktiflik Durumu:</label>
                <br />
                <label>
                    <input type="radio" value="Active" checked={status === true} onChange={() => setStatus(true)} />
                    Aktif
                </label>
                <label>
                    <input type="radio" value="Passive" checked={status === false} onChange={() => setStatus(false)} />
                    Pasif
                </label>
            </div>
            <br />
            <button onClick={updateUser}>GÜNCELLE</button>
        </div>
    )
}

export default NormalUserInfo;
