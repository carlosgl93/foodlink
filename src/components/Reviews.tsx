import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { Box, useTheme } from '@mui/material';
import { Text } from './StyledComponents';

type ReviewsProps = {
  average: number;
  total_reviews: number;
};

const Reviews = ({ average, total_reviews }: ReviewsProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      {average ? (
        <>
          {Array.from(Array(average).keys()).map((i) => (
            <StarOutlinedIcon key={i} sx={{ color: theme.palette.primary.main }} />
          ))}
          {Array.from(Array(5 - average).keys()).map((i) => (
            <StarBorderOutlinedIcon key={i} sx={{ color: theme.palette.primary.main }} />
          ))}
          <Text
            sx={{
              ml: '0.5rem',
              color: theme.palette.background.paper,
            }}
          >
            {average}{' '}
            {`(${
              total_reviews > 1 && total_reviews !== 0
                ? `${total_reviews} reseñas`
                : `${total_reviews} reseña`
            })`}
          </Text>
        </>
      ) : (
        <>
          {Array.from(Array(5).keys()).map((i) => (
            <StarBorderOutlinedIcon key={i} sx={{ color: theme.palette.primary.main }} />
          ))}
        </>
      )}
    </Box>
  );
};

export default Reviews;
