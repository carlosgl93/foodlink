import { Button, Card, CardContent } from '@mui/material';
import { StyledTitle, SubTitle, Text } from './StyledComponents';

interface CardComponentProps {
  title: string;
  subTitle?: string;
  text: string;
  ctaText: string;
  onButtonClick: () => void;
}

export const GeneralCard: React.FC<CardComponentProps> = ({
  title,
  subTitle,
  text,
  ctaText,
  onButtonClick,
}) => {
  return (
    <Card sx={{ margin: '1rem 0', borderRadius: '1rem' }}>
      <CardContent>
        <StyledTitle>{title}</StyledTitle>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
        <Text>{text}</Text>
        <Button fullWidth variant="contained" onClick={onButtonClick} sx={{ mt: 2 }}>
          {ctaText}
        </Button>
      </CardContent>
    </Card>
  );
};
