import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { Http } from '../../api';

const SelectAutoComplete = ({ apiUrl, label, onChange, defaultValue, ...props }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const fetchOptions = async (query = '', page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const params = {
        search: query,
        page,
        pageSize,
      };
      const response = await Http.get(`/${apiUrl}`, { params });

   
      const fetchedOptions = response.data.agendas || response.data.users || [];
      setOptions(fetchedOptions);

    
      if (defaultValue && !selectedOption && fetchedOptions.length > 0) {
        const defaultOption = fetchedOptions.find(option => option.id === defaultValue.id);
        if (defaultOption) {
          setSelectedOption(defaultOption);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchOptions = useCallback(
    debounce((query) => fetchOptions(query), 300),
    []
  );

  useEffect(() => {
    fetchOptions(); // Busca inicial
  }, []);

  useEffect(() => {
    if (inputValue) {
      debouncedFetchOptions(inputValue);
    }
  }, [inputValue, debouncedFetchOptions]);

  useEffect(() => {
    if (defaultValue && !selectedOption) {
      setSelectedOption(defaultValue);
    }
  }, [defaultValue, selectedOption]);

  return (
    <Autocomplete
      options={options}
      loading={loading}
      value={selectedOption}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(event, newValue) => {
        setSelectedOption(newValue);        
        if (newValue) {
          onChange(newValue.id);
        }
      }}
      size='small'
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name || ''}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          {...props}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default SelectAutoComplete;
