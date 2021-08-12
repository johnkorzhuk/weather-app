import { useSettingsState } from '@/store/settings/state';
import React, { createContext, useContext, useMemo } from 'react';

const SettingsContext = createContext(
  {} as ReturnType<typeof useSettingsState>,
);

interface SettingsProviderProps {}

const SettingsProvider: React.FC<SettingsProviderProps> = (props) => {
  const store = useSettingsState();
  const value = useMemo(() => store, [store]);

  return <SettingsContext.Provider {...props} value={value} />;
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      'useSettingsContext must be used within a SettingsContextProvider',
    );
  }

  return context;
};

export default SettingsProvider;
