import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink } from "react-router-dom"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { startCreatingUserWithEmailPassword } from "../../store/auth"

const formData = {
    email: '',
    password: '',
    displayName: '',
}

const formValidations = {
    email: [ (value) => value.includes('@'), 'El correo debe tener una @'],
    password: [ (value) => value.length >= 6, 'La contraseña debe tener más de 6 dígitos'],
    displayName: [ (value) => value.length >= 3, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {

    const dispatch = useDispatch();
    const [ formSumitted, setFormSumitted ] = useState( false );

    const { status, errorMessage } = useSelector( state => state.auth );
    const isCheckingAuthentication = useMemo( () => status === 'checking', [status]);

    const { 
        formState, displayName, email, password, onInputChange, 
        isFormValid, displayNameValid, emailValid, passwordValid 
    } = useForm( formData, formValidations );

    const onSubmit = ( e ) => {
        e.preventDefault();
        setFormSumitted( true );

        if ( !isFormValid ) return;

        dispatch( startCreatingUserWithEmailPassword( formState ) );
    }
    
    return (
        <AuthLayout title="Crear cuenta">
            <h1>FormValid { isFormValid ? 'Válido' : 'Inválido' }</h1>
            <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
                <Grid container>

                    <Grid item xs={ 12 } sx={{ mt: 1 }}>
                        <TextField 
                            label="Nombre completo" 
                            type="text" 
                            placeholder="Escribe tu nombre" 
                            fullWidth
                            name="displayName"
                            value={ displayName }
                            onChange={ onInputChange }
                            error={ !!displayNameValid && formSumitted }
                            helperText={ displayNameValid }
                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 1 }}>
                        <TextField
                            label="Correo"
                            type="email"
                            placeholder="Correo"
                            fullWidth
                            name="email"
                            value={ email }
                            onChange={ onInputChange }
                            error={ !!emailValid && formSumitted }
                            helperText={ emailValid }
                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 1 }}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            placeholder="Contraseña"
                            fullWidth
                            name="password"
                            value={ password }
                            onChange={ onInputChange }
                            error={ !!passwordValid && formSumitted }
                            helperText={ passwordValid }
                        />
                    </Grid>

                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }} >
                        <Grid 
                            item 
                            xs={ 12 }
                            display={ !!errorMessage ? '' : 'none'}
                            >
                            <Alert severity='error'>{ errorMessage }</Alert>
                        </Grid>

                        <Grid item xs={ 12 }>
                            <Button 
                                disable={ isCheckingAuthentication }
                                type="submit"
                                variant="contained" 
                                fullWidth>
                                Crear cuenta
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                        <Typography sx={{ mr: 1 }} >¿Ya tienes una cuenta?</Typography>
                        <Link component={ RouterLink } color="inherit" to="/auth/login">
                            Ingresar
                        </Link>
                    </Grid>
                    
                </Grid>
            </form>
        </AuthLayout>

    )
}