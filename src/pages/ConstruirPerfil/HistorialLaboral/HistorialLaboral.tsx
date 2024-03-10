import { TextField, Button, Box } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  Container,
  StyledTitle,
  SubTitle,
  Wrapper,
} from '@/pages/PrestadorDashboard/StyledPrestadorDashboardComponents';
import BackButton from '@/components/BackButton';
import { SaveButton } from '@/components/SaveButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { HistorialLaboralEntry, useHistorialLaboral } from '@/hooks/useHistorialLaboral';
import Loading from '@/components/Loading';
import { useEffect } from 'react';

export type HistorialLaboralInputs = {
  historialLaboral: HistorialLaboralEntry[];
};

export const HistorialLaboral = () => {
  const { register, handleSubmit, control } = useForm<HistorialLaboralInputs>();
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'historialLaboral',
  });

  const {
    prestadorHistorialLaboral,
    // getPrestadorHistorialLaboralError,
    getPrestadorHistorialLaboralLoading,
    postHistorialPrestadorLaboral,
    // postHistorialPrestadorLaboralError,
    postHistorialPrestadorLaboralLoading,
    // deleteHistorialEntryError,
    deleteHistorialEntryLoading,
    deleteHistorialEntryMutation,
  } = useHistorialLaboral();

  const onSubmit = (data: HistorialLaboralInputs) => {
    console.log(data);
    postHistorialPrestadorLaboral(data.historialLaboral);
  };

  useEffect(() => {
    if ((prestadorHistorialLaboral ?? []).length > 0) {
      replace(
        prestadorHistorialLaboral?.map((item) => ({
          ...item,
          dbId: item.id,
          inicio: item.inicio.split('T')[0],
          final: item.final.split('T')[0],
        })) as HistorialLaboralEntry[],
      );
    }
  }, [prestadorHistorialLaboral]);

  if (
    getPrestadorHistorialLaboralLoading ||
    postHistorialPrestadorLaboralLoading ||
    deleteHistorialEntryLoading
  )
    return <Loading />;

  return (
    <Wrapper>
      <BackButton to="/construir-perfil" />
      <Container>
        <StyledTitle>Historial Laboral</StyledTitle>
        <SubTitle>Ingresa tu experiencia laboral relevante a tus servicios.</SubTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          {prestadorHistorialLaboral?.length ? (
            fields?.map((field, index) => {
              console.log(field);
              return (
                <>
                  <TextField
                    {...register(`historialLaboral.${index}.empresa`)}
                    label="Empresa"
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    {...register(`historialLaboral.${index}.inicio`)}
                    label="Inicio"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    {...register(`historialLaboral.${index}.final`)}
                    label="Final"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    {...register(`historialLaboral.${index}.titulo`)}
                    label="Titulo"
                    fullWidth
                    margin="normal"
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Button
                      startIcon={<AddCircleOutlineOutlinedIcon />}
                      type="button"
                      onClick={() => append({ empresa: '', inicio: '', final: '', titulo: '' })}
                    >
                      Add More
                    </Button>
                    <Button
                      startIcon={<DeleteOutlineOutlinedIcon />}
                      type="button"
                      onClick={() => {
                        remove(index);
                        deleteHistorialEntryMutation(field.dbId as number);
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                </>
              );
            })
          ) : (
            <>
              <TextField
                {...register(`historialLaboral.${0}.empresa`)}
                label="Empresa"
                fullWidth
                margin="normal"
              />
              <TextField
                {...register(`historialLaboral.${0}.inicio`)}
                label="Inicio"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                {...register(`historialLaboral.${0}.final`)}
                label="Final"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                {...register(`historialLaboral.${0}.titulo`)}
                label="Titulo"
                fullWidth
                margin="normal"
              />
              <button
                type="button"
                onClick={() => append({ empresa: '', inicio: '', final: '', titulo: '' })}
              >
                Add More
              </button>
              {/* <button
                type="button"
                onClick={() => {
                  postHistorialPrestadorLaboral([]);
                  remove(0);
                }}
              >
                Remove
              </button> */}
            </>
          )}
          <SaveButton />
        </form>
      </Container>
    </Wrapper>
  );
};
