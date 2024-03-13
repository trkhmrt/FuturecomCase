import axios from "axios";
import React, { useEffect, useState } from 'react'

const NormalUserInfo = ({ user }) => {
    const [phone, setPhone] = useState(user.phoneNumber);
    const [email, setEmail] = useState(user.email);
    const [id, setId] = useState(user.id);

    useEffect(() => {
        setPhone(user.phoneNumber); // user nesnesinden gelen telefon değeriyle state'i güncelle
        setEmail(user.email); // user nesnesinden gelen email değeriyle state'i güncelle
        setId(user.id); // user nesnesinden gelen id değeriyle state'i güncelle
    }, [user]); // user nesnesi değiştiğinde useEffect'in çalışmasını sağla

    const updateUser = async () => {
        const userToUpdate = {
            id: id,
            mail: email,
            phone: phone,
        };
        try {
            const response = await axios.post("https://localhost:7069/User/update", userToUpdate);
            console.log(response.data); 
        } catch (error) {
            console.error(error.message); 
        }
    };

    return (
        <div>
            <h1>{user.firstName} {user.lastName}</h1>
            <label>Phone</label>
            <br />
            <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <br />
            <br />
            <label>Mail</label>
            <br />
            <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <br></br>
            <button onClick={updateUser}>Update</button>
        </div>
    )
}

export default NormalUserInfo;
