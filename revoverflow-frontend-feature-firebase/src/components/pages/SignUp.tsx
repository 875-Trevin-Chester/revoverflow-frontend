import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../Input';
import Button from '../Button';
import Message from '../Message';
import { signup, setError } from '../../firebaseStore/actions/authActions';
import { RootState } from '../../firebaseStore/firebaseIndex';

const SignUp: FC = () => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        return () => {
            if (error) {
                dispatch(setError(''));
            }
        }
    }, [error, dispatch]);

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        dispatch(signup({ email, password, firstName }, () => setLoading(false)));
    }

    return (
        <section className="section">
            <div className="container">
                <h2 className="has-text-centered is-size-2 mb-3">Sign Up</h2>
                <form className="form" onSubmit={submitHandler}>
                    {error && <Message type="danger" msg={error} />}
                    <Input
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.currentTarget.value)}
                        placeholder="First name"
                        label="First name"
                    />
                    <Input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        placeholder="email address"
                        label="email address"
                    />
                    <Input
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        placeholder="Password"
                        label="Password"
                    />
                    <Button text={loading ? "Loading..." : "Sign up"} className="is-primary is-fullwidth mt-5" disabled={loading} />
                </form>
            </div>
        </section>
    )
}

export default SignUp;