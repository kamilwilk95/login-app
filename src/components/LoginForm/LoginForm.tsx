import React, { useState } from 'react';
import { Avatar, Button, Grid, makeStyles, TextField, Theme } from '@material-ui/core';
import { useFormik } from 'formik';
import { VpnKey } from '@material-ui/icons';
import { pink } from '@material-ui/core/colors';
import { LoginFormData } from '../../helpers/types';
import { useDispatch } from 'react-redux';
import { logInUser } from '../../helpers/reducer';

const useStyles = makeStyles((theme: Theme) => ({
    icon: {
        backgroundColor: pink[500],
        margin: '0 auto'
    },
    input: {
        marginBottom: theme.spacing(2)
    },
    wrapper: {
        padding: theme.spacing(3, 0)
    },
    formWrapper: {
        maxWidth: '300px'
    }
}));

const validate = (values: LoginFormData): Partial<LoginFormData> => {
    const errors: Partial<LoginFormData> = {};

    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(values.email)) {
        errors.email = 'Email have incorrect format';
    }

    if (values.password.length < 8) {
        errors.password = 'Password required at least 8 characters';
    } else if (!/(?=.*[A-Z])/.test(values.password)) {
        errors.password = 'Password required at least one capital letter';
    } else if (!/(?=.*[0-9])/.test(values.password)) {
        errors.password = 'Password required at least one number';
    }

    return errors;
}

const LoginForm = (): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [submitted, setSubmitted] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            dispatch(logInUser(values));
        },
        validate
    });

    return (
        <Grid
            container={true}
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.wrapper}
        >
            <Grid item={true} xs={12}>
                <Avatar className={classes.icon}>
                    <VpnKey color="primary" />
                </Avatar>
                <h1>Login</h1>
            </Grid>
            <Grid
                item={true}
                container={true}
                justify="center"
                className={classes.formWrapper}
                spacing={2}
                direction="column"
                xs={12}
                component="form"
                onSubmit={formik.handleSubmit}
            >
                <TextField
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    className={classes.input}
                    error={!!formik.errors.email && submitted}
                    helperText={submitted && formik.errors.email}
                    onChange={formik.handleChange}
                    inputProps={{"data-testid": "email-input"}}
                />
                <TextField
                    label="Password"
                    name="password"
                    className={classes.input}
                    value={formik.values.password}
                    error={!!formik.errors.password && submitted}
                    helperText={submitted && formik.errors.password}
                    onChange={formik.handleChange}
                    type="password"
                    inputProps={{'data-testid': 'password-input'}}
                />
                <Button variant="contained" onClick={() => setSubmitted(true)} color="primary" type="submit" disabled={!formik.isValid && submitted}>
                    Login
                </Button>
            </Grid>
        </Grid>
    )
}

export default LoginForm;