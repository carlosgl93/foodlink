import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const FlexBox = styled(Box)({
  display: 'flex',
});

const CenteredFlexBox = styled(FlexBox)({
  justifyContent: 'center',
  alignItems: 'center',
});

const FullSizeCenteredFlexBox = styled(CenteredFlexBox)({
  width: '100%',
  minHeight: '75vh',
});

// make a styled image component that accepts src and alt props
const HeaderIconImage = styled('img')({
  width: '100px',
  height: '50px',
  margin: 4,
});

export { FlexBox, CenteredFlexBox, FullSizeCenteredFlexBox, HeaderIconImage };
