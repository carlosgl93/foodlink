import { SubTitle } from '@/pages/PrestadorDashboard/StyledPrestadorDashboardComponents';
import { List, ListItem, styled } from '@mui/material';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useConstruirPerfil } from '../useConstruirPerfil';

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

export const ListAvailableDays = () => {
  const { disponibilidad } = useConstruirPerfil();
  return (
    <List>
      {disponibilidad.map((day) => {
        const { id, dayName, isAvailable } = day;

        return (
          <StyledListItem key={id}>
            {isAvailable ? <DoneOutlinedIcon /> : <CloseOutlinedIcon />}
            <StyledDayName>{dayName}</StyledDayName>
          </StyledListItem>
        );
      })}
    </List>
  );
};
