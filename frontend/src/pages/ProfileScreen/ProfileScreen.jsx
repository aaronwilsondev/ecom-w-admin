import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from '../../redux/actions/userActions';
import LoadingBox from "../../components/loadingbox/loadingbox";
import MessageBox from "../../components/messagebox/messagebox";
import { USER_UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants';


export default function ProfileScreen() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails; 
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {success: successUpdate, error: errorUpdate, loading: loadingUpdate} = userUpdateProfile;
    const dispatch = useDispatch();

useEffect(() => {
    if(!user){
        dispatch({type: USER_UPDATE_PROFILE_RESET})
        dispatch(detailsUser(userInfo._id));
    } else {
        setName(user.name);
        setEmail(user.email);
    }
}, [userInfo._id, dispatch, user]);

const submitHandler = (e) =>{
    e.preventDefault();
    if(password !== confirmPassword){
        alert("Password and Confirm Password do Not Match")
    } else {
        dispatch(updateUserProfile({
            userId: user._id,
            name, email, password
        }))
    }
}

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading? (<LoadingBox></LoadingBox>)
                    :
                    error? (<MessageBox variant="danger">{error}</MessageBox>)
                    :
                    <>
                    {
                        loadingUpdate &&( <LoadingBox></LoadingBox>) 
                    }
                    {
                        errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)
                    }
                    {
                        successUpdate && <MessageBox variant="success">
                            Profile Updates Successfully
                        </MessageBox>
                    }
                    <div>
                        <label htmlFor="name">Name</label>
                        <input 
                        id="name" 
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        >                          
                        </input>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input 
                        id="email" 
                        type="text"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                        >                          
                        </input>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input 
                        id="password" 
                        type="password"
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                        >                          
                        </input>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                        id="confirmPassword" 
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        >                          
                        </input>
                    </div>
                    <div>
                        <label/>
                        <button 
                        className="primary" 
                        type="submit"
                        >
                          Update
                        </button>                    
                    </div>
                    </>
                }
            </form>
        </div>
    )
}
