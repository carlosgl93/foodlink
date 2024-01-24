import { SubTitle } from '@/pages/PrestadorDashboard/StyledPrestadorDashboardComponents';
import { List, ListItem, styled } from '@mui/material';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { DisponibilidadFromFront } from '@/api/disponibilidad/getDisponibilidadByPrestadorId';
import { CenteredDivider } from '@/components/StyledDivider';
import { Text } from '@/components/StyledComponents';

const StyledList = styled(List)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'start',
  width: '100%',
}));

const StyledListItem = styled(ListItem)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'start',
}));

export const StyledDayName = styled(SubTitle)(() => ({
  marginLeft: '1rem',
  marginBottom: 0,
  fontSize: '1rem',
}));

const StyledAvailableTimes = styled(Text)(() => ({
  marginLeft: '1rem',
  marginBottom: 0,
  fontSize: '0.8rem',
}));

const StyledAvailableIcon = styled(DoneOutlinedIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const StyledUnAvailableIcon = styled(CloseOutlinedIcon)(({ theme }) => ({
  color: theme.palette.error.main,
}));

type ListAvailableDaysProps = {
  disponibilidad: DisponibilidadFromFront[];
};

export const ListAvailableDays = ({ disponibilidad }: ListAvailableDaysProps) => {
  return (
    <StyledList>
      {disponibilidad.map((day) => {
        const { id, dayName, isAvailable, startTime, endTime } = day;

        let availableAllDay = false;

        if (startTime === '00:00' && endTime === '00:00') availableAllDay = true;

        return (
          <>
            <StyledListItem key={id}>
              {isAvailable ? <StyledAvailableIcon /> : <StyledUnAvailableIcon />}
              <StyledDayName>{dayName}</StyledDayName>
              {isAvailable && (
                <StyledAvailableTimes>
                  {availableAllDay ? 'Todo el día' : 'De ' + startTime + ' a ' + endTime}
                </StyledAvailableTimes>
              )}
            </StyledListItem>
            <CenteredDivider />
          </>
        );
      })}
    </StyledList>
  );
};
