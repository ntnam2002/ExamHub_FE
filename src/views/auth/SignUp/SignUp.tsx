import SignUpForm from './SignUpForm'

const SignUp = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Đăng ký tài khoản</h3>
                <p></p>
            </div>
            <SignUpForm disableSubmit={false} />
        </>
    )
}

export default SignUp
