import BackButton from '@/components/BackButton';
import { Controller } from 'react-hook-form';
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
import { useCuentaBancaria } from '@/hooks/useCuentaBancaria';
import Loading from '@/components/Loading';

export type CuentaBancariaInputs = {
  banco: string;
  tipoCuenta: string;
  numeroCuenta: string;
  titular: string;
  rut: string;
};

const bancos = [
  'Banco Santander',
  'Banco de Chile',
  'Banco Estado',
  'Banco BCI',
  'Banco Falabella',
  'Banco Ripley',
  'Banco Itau',
  'Banco Security',
  'Banco Consorcio',
  'Banco Internacional',
  'Banco Corpbanca',
  'Banco Scotiabank',
  'Banco Paris',
  'Banco HSBC',
  'Banco CrediChile',
  'Banco BBVA',
  'Banco BICE',
  'Banco Penta',
];

export const CuentaBancaria = () => {
  const {
    postCuentaPrestador,
    postCuentaPrestadorLoading,
    getCuentaPrestadorLoading,
    prestadorCuentaBancaria,
  } = useCuentaBancaria();

  const isLoading = postCuentaPrestadorLoading || getCuentaPrestadorLoading;

  console.log(
    'TODO: make default values the repsonse from prestadorCuentaBancaria',
    prestadorCuentaBancaria,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CuentaBancariaInputs>({
    defaultValues: {
      // TODO: Remove this default values after finished testing
      titular: 'Carlos',
      banco: 'Banco Santander',
      tipoCuenta: 'Corriente',
      numeroCuenta: '123512351235',
      rut: '18445810-1',
    },
  });

  const onSubmit: SubmitHandler<CuentaBancariaInputs> = (data) => postCuentaPrestador(data);

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
        {isLoading ? (
          <Loading />
        ) : (
          <>
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
              <Controller
                name="banco"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  validate: (value) => bancos.includes(value) || 'Banco no válido',
                }}
                render={({ field }) => (
                  <StyledSelect {...field} name="banco">
                    <StyledOption value="">Seleccione un banco</StyledOption>
                    {bancos.map((banco) => (
                      <StyledOption key={banco} value={banco}>
                        {banco}
                      </StyledOption>
                    ))}
                  </StyledSelect>
                )}
              />
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
          </>
        )}
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
  backgroundColor: theme.palette.background.default,
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

const StyledSelect = styled('select')(() => ({
  padding: '1rem 8px',
  width: '100%',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontFamily: 'inherit',
  fontSize: '1rem',
}));

const StyledOption = styled('option')(() => ({
  padding: '10px 5px',
}));
