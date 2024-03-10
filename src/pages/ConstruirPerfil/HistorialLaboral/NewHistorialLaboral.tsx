import { useForm, useFieldArray } from 'react-hook-form';

export type HistorialLaboralInputs = {
  historialLaboral: {
    empresa: string;
    inicio: string;
    final: string;
    titulo: string;
  }[];
};

export const NewHistorialLaboral = () => {
  const { register, handleSubmit, control } = useForm<HistorialLaboralInputs>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'historialLaboral',
  });

  const onSubmit = (data: HistorialLaboralInputs) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`historialLaboral.${index}.empresa`)} placeholder="Empresa" />
          <input {...register(`historialLaboral.${index}.inicio`)} placeholder="Inicio" />
          <input {...register(`historialLaboral.${index}.final`)} placeholder="Final" />
          <input {...register(`historialLaboral.${index}.titulo`)} placeholder="Titulo" />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ empresa: '', inicio: '', final: '', titulo: '' })}
      >
        Add More
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};
