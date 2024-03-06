import BackButton from '@/components/BackButton';
import {
  Container,
  StyledTitle,
  SubTitle,
  Wrapper,
} from '@/pages/PrestadorDashboard/StyledPrestadorDashboardComponents';
import { Box, TextField, styled } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SaveButton } from '@/components/SaveButton';

type Inputs = {
  banco: string;
  tipoCuenta: string;
  numeroCuenta: string;
  titular: string;
  rut: string;
};

export const CuentaBancaria = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Wrapper>
      <BackButton to="/construir-perfil" />
      <Container>
        <StyledTitle>Cuenta Bancaria</StyledTitle>
        <SubTitle>
          Para poder pagarte lo antes posible, ingresa tus datos bancarios para que Blui pueda
          procesar pagos para ti departe de tus clientes.
        </SubTitle>
        <StyledPrivacyContainer>
          <IconLockContainer>
            <LockIcon />
          </IconLockContainer>
          <SubTitle>
            Tus detalles bancarios no seran mostrados en tu perfil y solo seran usados para procesar
            tus pagos por el equipo de Blui.
          </SubTitle>
        </StyledPrivacyContainer>
        <SmallerTitle>Agrega tus datos bancarios</SmallerTitle>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledTextField
            label="Nombre del titular"
            {...(register('titular'), { required: true })}
          />
          <StyledTextField
            label="RUT"
            {...register('rut', {
              required: 'Debes indicar tu rut.',
              pattern: {
                value: /^[0-9]+-[0-9kK]{1}$/,
                message: 'RUT invalido: Ingresalo con este formato 12345678-9',
              },
            })}
            aria-invalid={errors.rut ? 'true' : 'false'}
          />
          <StyledTextField label="Banco" {...(register('banco'), { required: true })} />
          <StyledTextField
            label="Tipo de cuenta"
            {...register('tipoCuenta', {
              required: 'Debes indicar el tipo de cuenta.',
              pattern: {
                value: /^(Corriente|Vista|Ahorro|RUT|Wise)$/i,
                message: 'Tipos de cuenta aceptados: Corriente, Vista, RUT, Ahorro, Wise',
              },
            })}
          />
          <StyledTextField
            label="Número de cuenta"
            {...register('numeroCuenta', {
              required: 'Debes ingresar un numero de cuenta.',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Número de cuenta: Solo se aceptan numeros',
              },
            })}
          />
          {Object.values(errors).map((e) => (
            <ErrorMessage key={e.message}>*** {e.message} ***</ErrorMessage>
          ))}

          <SaveButton />
        </StyledForm>
      </Container>
    </Wrapper>
  );
};

const StyledPrivacyContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '2rem',
  backgroundColor: theme.palette.secondary.dark,
  '& > *': {
    marginBottom: '1rem',
  },
  borderRadius: '0.5rem',
  padding: '1rem',
  gap: '1rem',
}));

const IconLockContainer = styled(Box)(() => ({}));

const SmallerTitle = styled(StyledTitle)(() => ({
  fontSize: '1.25rem',
  margin: '1rem 0',
}));

const StyledTextField = styled(TextField)(() => ({}));

const StyledForm = styled('form')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}));

const ErrorMessage = styled('p')(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  color: theme.palette.error.main,
  fontSize: '1.15rem',
}));
