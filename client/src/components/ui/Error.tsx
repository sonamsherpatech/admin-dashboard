interface ErrorType {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Error(errors : ErrorType) {
    return (<>
        {errors}
    </>)
}
