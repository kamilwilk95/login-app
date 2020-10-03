import React, { useState } from 'react';
import { Avatar, Button, Grid, makeStyles, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { VpnKey } from '@material-ui/icons';
import { pink } from '@material-ui/core/colors';

type LoginFormData = {
    login: string;
    password: string;
}

const useStyles = makeStyles((theme) => ({
    icon: {
        backgroundColor: pink[500],
        margin: "0 auto"
    },
    input: {
        marginBottom: theme.spacing(2)
    },
    wrapper: {
        padding: theme.spacing(3, 0)
    },
    formWrapper: {
        maxWidth: "300px"
    }
}));

const validate = (values: LoginFormData): Partial<LoginFormData> => {
    const errors: Partial<LoginFormData> = {};

    if (!values.login) {
        errors.login = "Login is required";
    }

    if (values.password.length < 8) {
        errors.password = "Password required at least 8 characters";
    } else if (!RegExp('(?=.*[A-Z])').test(values.password)) {
        errors.password = "Password required at least one capital letter";
    } else if (!RegExp('(?=.*[0-9])').test(values.password)) {
        errors.password = "Password required at least one number";
    }

    return errors;
}

const LoginForm = (): JSX.Element => {
    const classes = useStyles();

    const [submitted, setSubmitted] = useState(false);

    const formik = useFormik({
        initialValues: {
            login: '',
            password: ''
        },
        onSubmit: values => {
            setSubmitted(true);
            console.log(values);
        },
        validate
    });
    return <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.wrapper}
    >
        <Grid item xs={12}>
            <Avatar className={classes.icon}>
                <VpnKey color="primary" />
            </Avatar>    
            <h1>Login</h1>
        </Grid>
        <Grid item 
            container
            justify="center"
            className={classes.formWrapper}
            spacing={2}
            direction="column" 
            xs={12} 
            component="form" 
            onSubmit={formik.handleSubmit}>
                <TextField 
                    label="Login" 
                    name="login" 
                    value={formik.values.login} 
                    className={classes.input} 
                    error={!!formik.errors.login && submitted}
                    helperText={submitted && formik.errors.login}
                    onChange={formik.handleChange}/>
                <TextField 
                    label="Password" 
                    name="password" 
                    className={classes.input} 
                    value={formik.values.password} 
                    error={!!formik.errors.password && submitted}
                    helperText={submitted && formik.errors.password}
                    onChange={formik.handleChange}
                    type="password" />
                <Button variant="contained" onClick={() => setSubmitted(true)} color="primary" type="submit" disabled={!formik.isValid && submitted}>
                    Login
                </Button>
        </Grid>
    </Grid>
}

export default LoginForm;