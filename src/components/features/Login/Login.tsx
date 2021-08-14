import React from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid } from '@material-ui/core';
import { useFormik } from 'formik';

export const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: values => {
            alert(JSON.stringify(values))
        },
    })

    return <Grid container justify="center">
        <Grid item xs={4}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                            target={'_blank'}>here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"

                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"

                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        <FormControlLabel
                            label={'Remember me'}
                            control={
                                <Checkbox
                                
                                    name='rememberMe'
                                    checked={formik.values.rememberMe}
                                    onChange={formik.handleChange}

                                />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}
