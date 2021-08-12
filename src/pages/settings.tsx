import Settings from '@/components/Settings/index';
import Typography from '@material-ui/core/Typography';
import { PageProps } from 'gatsby';
import React from 'react';

const SettingsPage: React.FC<PageProps> = () => {
  return (
    <>
      <Typography variant="h1">Settings</Typography>
      <Settings />
    </>
  );
};

export default SettingsPage;
