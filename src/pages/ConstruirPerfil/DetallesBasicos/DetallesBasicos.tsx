// import { TextField, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
// import { useForm } from 'react-hook-form';
// import { styled } from '@mui/system';
// import { SaveButton } from '@/components/SaveButton';
// import { useDetallesBasicos } from './useDetallesBasicos';
// import Loading from '@/components/Loading';
// import BackButton from '@/components/BackButton';

export interface IDetallesBasicosInputs {
  email: string;
  companyName: string;
  representativeName: string;
  dob: string;
  phone: string;
  address: string;
}

// const StyledForm = styled('form')(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   gap: theme.spacing(4),
//   maxWidth: '80%',
//   margin: '0 auto',
// }));

// const StyledTitle = styled('h1')(({ theme }) => ({
//   fontSize: '1.75rem',
//   fontWeight: 'bold',
//   marginBottom: '0.5rem',
//   color: theme.palette.primary.main,
//   textAlign: 'start',
// }));

// const StyledSelect = styled(Select)(() => ({
//   minWidth: '220px',
// }));

// const FormHelperText = styled('p')(({ theme }) => ({
//   color: theme.palette.error.main,
// }));

// const StyledTextField = styled(TextField)(() => ({}));

export const DetallesBasicos = () => {
  return <></>;
};
//   const { prestador, updatePrestadorLoading, onSubmit } = useDetallesBasicos();

//   const { register, handleSubmit, formState } = useForm<IDetallesBasicosInputs>({
//     defaultValues: {
//       email: prestador?.email || '',
//       companyName: prestador?.companyName || '',
//       representativeName: prestador?.representativeName || '',
//       phone: prestador?.phone || '',
//       address: prestador?.address || '',
//     },
//   });

//   const { errors, isDirty } = formState;

//   return (
//     <Box>
//       <BackButton
//         ignoreMargin
//         displayText
//         style={{
//           margin: '1rem',
//           marginBottom: '0rem',
//         }}
//       />
//       <StyledForm onSubmit={handleSubmit(onSubmit)}>
//         {updatePrestadorLoading ? (
//           <Loading />
//         ) : (
//           <>
//             <StyledTitle>Actualizar Perfil</StyledTitle>
//             <StyledTextField
//               {...register('email', { required: 'Email es requerido' })}
//               label="Email"
//               variant="outlined"
//               error={Boolean(errors.email)}
//               helperText={errors.email?.message}
//             />
//             <StyledTextField
//               {...register('companyName', { required: 'Nombre empresa es requerido' })}
//               label="Nombre"
//               variant="outlined"
//               error={Boolean(errors.companyName)}
//               helperText={errors.companyName?.message}
//             />
//             <StyledTextField
//               {...register('lastname', { required: 'Apellido es requerido' })}
//               label="Apellido"
//               variant="outlined"
//               error={Boolean(errors.lastname)}
//               helperText={errors.lastname?.message}
//             />
//             {/* <FormControl variant="outlined">
//               <InputLabel id="gender-label">Género</InputLabel>
//               <StyledSelect
//                 labelId="gender-label"
//                 label="Género"
//                 {...register('gender', { required: 'Género es requerido' })}
//                 error={Boolean(errors.gender)}
//                 defaultValue={prestador?.gender}
//               >
//                 <MenuItem value="">Selecciona tu genero</MenuItem>
//                 <MenuItem value="Masculino">Masculino</MenuItem>
//                 <MenuItem value="Femenino">Femenino</MenuItem>
//                 <MenuItem value="Otro">Otro</MenuItem>
//               </StyledSelect>
//               {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
//             </FormControl> */}
//             <StyledTextField
//               {...register('dob', { required: 'Fecha de Nacimiento es requerida' })}
//               label="Fecha de Nacimiento"
//               type="date"
//               InputLabelProps={{ shrink: true }}
//               variant="outlined"
//               error={Boolean(errors.dob)}
//               helperText={errors.dob?.message}
//               sx={{
//                 minWidth: '220px',
//               }}
//               // fullWidth
//             />
//             <StyledTextField
//               {...register('telefono', { required: 'Teléfono es requerido' })}
//               label="Teléfono"
//               variant="outlined"
//               error={Boolean(errors.telefono)}
//               helperText={errors.telefono?.message}
//             />
//             <StyledTextField
//               {...register('address', { required: 'Dirección es requerida' })}
//               label="Dirección"
//               variant="outlined"
//               error={Boolean(errors.address)}
//               helperText={errors.address?.message}
//             />
//             <SaveButton
//               disabled={!isDirty}
//               style={{
//                 marginBottom: '2rem',
//               }}
//             />
//           </>
//         )}
//       </StyledForm>
//     </Box>
//   );
// };
