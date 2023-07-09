import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PostListPage } from "./PostListPage";

const useClasses = () => ({
    gradientCustom: {
        borderRadius: "1rem"
    },
    errorText: {
        marginBottom: "2rem !important",
        color: "red !important",
    }
})

export const LoginPage = (props: any | undefined) => {
    const classes = useClasses();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState(false);
    const [postListPage,setPostListPage] = useState(false);

    //Typing username
    const userNameOnChange = (event: any) => {
        setErrorMessage(false)
        let value = event.target.value;
        console.log(value);
        setUsername(value)
    }

    //Typing password
    const passwordOnChange = (event: any) => {
        setErrorMessage(false)
        let value = event.target.value;
        console.log(value);
        setPassword(value)
    }

    //Login button click
    const loginClick = () => {
        if((username && username == "admin") && (password && password == "admin@123"))
        {
            setPostListPage(true)
        }
        else{
            setErrorMessage(true)
        }
    }

    // Enter click to login
    const loginEnter = (event: any) => {
        if (event.charCode === 13) {
            event.preventDefault();
            loginClick()
        }
    }

    
    return(
        <div>
        {!postListPage ? <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white" style={classes.gradientCustom}>
                    <div className="card-body p-5 text-center">

                        <div className="mb-md-5 mt-md-4 pb-5">

                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                        <p className="text-white-50 mb-5">Please enter your login and password!</p>

                        {errorMessage? <p className="text-danger">Please enter valid username or password</p>:null}

                        <div className="form-outline form-white mb-4">
                            <label className="form-label">Username</label>
                            <input type="text" id="typeUsername" onKeyPress={(event) => loginEnter(event)} className="form-control form-control-lg" value={username} onChange={userNameOnChange}/>
                        </div>

                        <div className="form-outline form-white mb-4">
                            <label className="form-label">Password</label>
                            <input type="password" id="typePassword" onKeyPress={(event) => loginEnter(event)} className="form-control form-control-lg" value={password} onChange={passwordOnChange}/>
                        </div>
                        <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={loginClick}>Login</button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>: <PostListPage/>}
        </div>
    )
}