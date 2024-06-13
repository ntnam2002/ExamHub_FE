import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Chào mừng!</h3>
                <p>Nhập thông tin của bạn để đăng nhập</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
