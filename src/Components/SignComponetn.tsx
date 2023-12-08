import React, { useState, ChangeEvent, FormEvent } from 'react';
// import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { TextField, FormGroup } from '@mui/material';
import useValidate from '../Hook/useValidate';
import { useNavigate } from 'react-router-dom';


interface FormData {
    name: string;
    email: string;
    phoneno: string;
}

const SignInComponent: React.FC = () => {
    const [validateData, validData, validateError] = useValidate()
    const navigate = useNavigate()
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phoneno: '',
    });

    const handleChange = (field: keyof FormData) => (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({ ...formData, [field]: event.target.value });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await validateData(formData).then(()=>{
            localStorage.setItem('formData', JSON.stringify(validData));
            return navigate('/data')
        }).catch(err=>console.log(err))
      
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5" align="center">
                Enter Your Details
            </Typography>
            <form onSubmit={handleSubmit} className=''>

                <FormGroup sx={{ mb: 3 }}>
                    <TextField
                        label="User Name"
                        onChange={handleChange('name')}
                        required
                        variant="outlined"
                        fullWidth
                        id="name"
                        error={validateError.name && validateError.name ? true : false}
                        type="string"
                        value={formData.name}
                    />
                    {validateError.name && <small>{validateError.name}</small>}
                </FormGroup>
                <FormGroup sx={{ mb: 3 }}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        error={validateError.email && validateError.email ? true : false}
                        label="Email Address"
                        
                        type="email"
                        value={formData.email}
                        onChange={handleChange('email')}
                    />
                    {validateError.email && <small>{validateError.email}</small>}
                </FormGroup>
                <FormGroup sx={{ mb: 3 }}>
                    <TextField
                        required
                        fullWidth
                        id="phoneno"
                        label="Phone No"
                        error={validateError.phoneno && validateError.phoneno ? true : false}
                        name='phoneno'
                        type="number"
                        value={formData.phoneno}
                        onChange={handleChange('phoneno')}
                    />
                    {validateError.phoneno && <small>{validateError.phoneno}</small>}
                </FormGroup>
                <Button type="submit" fullWidth variant="contained" color="primary">
                    Sign In
                </Button>
            </form>
        </Container>
    );
};

export default SignInComponent;
