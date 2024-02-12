function Login ({usernameInput, setUsernameInput, loginHandler}) {
    return (
        <div>
            <p>Set a username and login</p>
            <input type="text" className="me-3" onChange={e => setUsernameInput(e.target.value)} value={usernameInput}/>
            <button className="btn btn-primary" onClick={loginHandler}>Login</button>
        </div>
    )
}
export default Login