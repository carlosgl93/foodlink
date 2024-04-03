import { SubTitle } from '@/pages/PrestadorDashboard/StyledPrestadorDashboardComponents';
import { Box, List, ListItem, styled } from '@mui/material';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Text } from '@/components/StyledComponents';

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

interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface AvailabilityData {
  day: string;
  times: TimeSlot[];
}

type ListAvailableDaysProps = {
  availability: AvailabilityData[] | undefined;
};

export const ListAvailableDays = ({ availability }: ListAvailableDaysProps) => {
  if (!availability) return null;

  const daysOfWeek = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

  const sortedAvailability = [...availability].sort((a, b) => {
    return daysOfWeek.indexOf(a.day.toLowerCase()) - daysOfWeek.indexOf(b.day.toLowerCase());
  });

  return (
    <List>
      {sortedAvailability.map((d) => {
        const { day, times } = d;
        return (
          <StyledListItem key={day}>
            {times.length > 0 ? <DoneOutlinedIcon /> : <CloseOutlinedIcon />}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '50vw',
              }}
            >
              <StyledDayName
                sx={{
                  textTransform: 'capitalize',
                }}
              >
                {day}
              </StyledDayName>
              {times.find((time) => time.startTime === '00:00' && time.endTime === '24:00') ? (
                <Text sx={{ fontSize: '0.8rem' }}>Todo el dia</Text>
              ) : null}
            </Box>
          </StyledListItem>
        );
      })}
    </List>
  );
};
