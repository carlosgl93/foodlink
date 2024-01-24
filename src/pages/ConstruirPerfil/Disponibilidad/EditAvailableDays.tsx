import { Box, Button, Switch, styled } from '@mui/material';

import { DisponibilidadFromFront } from '@/api/disponibilidad/getDisponibilidadByPrestadorId';
import { useEditAvailableDays } from './useEditAvailableDays';
import { StyledDayName } from './ListAvailableDays';
import { CenteredDivider } from '@/components/StyledDivider';

const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '1rem 0',
}));

const StyledEditableDay = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'start',
}));

const StyledToggleContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const StyledTimePickerContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '2rem',
}));

const StyledTimerContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledSelect = styled('select')(() => ({
  width: '100%',
  padding: '0.5rem',
  borderRadius: '0.5rem',
  border: '1px solid black',
  margin: '0.5rem 0rem',
  // style the openned list:
}));

const StyledTimeTitle = styled(StyledDayName)(() => ({
  marginLeft: '0',
}));

export const EditAvailableDays = () => {
  const { disponibilidad, handleToggleDay, handleSave, handleTimeChange, times, error } =
    useEditAvailableDays();

  return (
    <Container>
      <CenteredDivider />
      {disponibilidad &&
        disponibilidad?.map((day) => {
          const { dayName, id, isAvailable } = day;
          return (
            <>
              <CenteredDivider />
              <StyledEditableDay key={id}>
                <StyledToggleContainer>
                  <Switch checked={isAvailable} onClick={() => handleToggleDay(dayName)} />
                  <StyledDayName>{dayName}</StyledDayName>
                </StyledToggleContainer>
                {isAvailable && (
                  <StyledTimePickerContainer>
                    <StyledTimerContainer>
                      {/* Start Time */}

                      <StyledTimeTitle>Hora de inicio:</StyledTimeTitle>
                      <StyledSelect
                        onChange={(e) => handleTimeChange(e, 'startTime')}
                        value={day.startTime}
                        name={`startTime${dayName}`}
                      >
                        {times.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </StyledSelect>
                    </StyledTimerContainer>
                    <StyledTimerContainer>
                      {/* End Time */}
                      <StyledTimeTitle>Hora de termino:</StyledTimeTitle>
                      <StyledSelect
                        onChange={(e) => handleTimeChange(e, 'endTime')}
                        value={day.endTime}
                        name={`endTime${dayName}`}
                      >
                        {times.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </StyledSelect>
                    </StyledTimerContainer>
                  </StyledTimePickerContainer>
                )}
              </StyledEditableDay>
            </>
          );
        })}

      <CenteredDivider />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          my: '1rem',
        }}
        onClick={() => handleSave(disponibilidad as DisponibilidadFromFront[])}
        disabled={error !== ''}
      >
        Guardar
      </Button>
    </Container>
  );
};
