import { useLocationsContext } from '@/store/locations/provider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import debounce from 'lodash/debounce';
import React, { useEffect, useState } from 'react';
import { LocationResponseData, usePlacesSearch } from '../hooks/api';

const useStyles = makeStyles((theme) => ({
  searchIcon: {
    position: 'absolute',
    right: theme.spacing(2),
  },
}));

const INPUT_ID = 'search-input-id';

const PlacesAutocomplete = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<LocationResponseData[]>([]);
  const [search, setSearch] = useState('');
  const [value, setValue] = useState(null);
  const classes = useStyles();
  const { actions } = useLocationsContext();
  const handleInputChange = debounce(
    (_: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
      setSearch(newValue);
    },
    300,
  );

  const handleItemSelect = (
    _: React.ChangeEvent<any>,
    newValue: LocationResponseData,
  ) => {
    if (newValue && newValue.id) {
      actions.addSavedLocation(newValue);
    }

    // using React.useRef doesnt work as TextField inputProps.ref isn't overridable
    const inputRef = document.getElementById(INPUT_ID);

    if (inputRef) {
      inputRef.blur();
    }

    setOpen(false);
    setValue(null);
    setSearch('');
  };

  const { data, isLoading } = usePlacesSearch(search);

  useEffect(() => {
    if (Array.isArray(data) && data.length) {
      setOptions(data);
    }
  }, [data]);

  useEffect(() => {
    if (!open || search.length === 0) {
      setOptions([]);
    }
  }, [open, search]);

  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(option) =>
        `${option.name}, ${option.state || option.country}`
      }
      options={options}
      fullWidth
      onChange={handleItemSelect}
      onInputChange={handleInputChange}
      loading={isLoading}
      size="small"
      clearOnBlur
      value={value}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label="Location Search"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              ...params.InputLabelProps,
              shrink: true,
            }}
            inputProps={{
              ...params.inputProps,
              id: INPUT_ID,
              // error when I try assigning me own ref
              // ref: inputRef,
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}

                  <SearchIcon
                    color="inherit"
                    // fontSize="large"
                    className={classes.searchIcon}
                  />
                </>
              ),
            }}
          />
        );
      }}
    />
  );
};

export default PlacesAutocomplete;
