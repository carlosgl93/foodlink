import React from 'react';
import { Link } from 'react-router-dom';

import { FlexBox, HeaderIconImage } from '@/components/styled';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

const MobileHeaderContent = () => {
  return (
    <FlexBox sx={{ alignItems: 'center' }}>
      <IconButton
        onClick={sidebarActions.toggle}
        size="large"
        edge="start"
        color="primary"
        aria-label="menu"
        sx={{ mr: 1 }}
      >
        <MenuIcon />
      </IconButton>
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <HeaderIconImage src={`/images/blui-new.png`} alt="Blui logo" />
      </Link>
    </FlexBox>
  );
};

export default MobileHeaderContent;
