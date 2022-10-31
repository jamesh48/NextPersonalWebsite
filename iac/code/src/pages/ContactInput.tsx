import { Box, FormLabel, ListItem } from '@mui/material';
import { useState } from 'react';

interface ContactInputProps {
  labelName: string;
  inputType: string;
  valCallback: (ev: React.ChangeEvent<HTMLInputElement>, ind: string) => void;
  indicator: string;
  localValue: string;
}
export const ContactInput = (props: ContactInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!props.localValue) {
      setIsFocused(false);
    }
  };

  return (
    <ListItem
      className={
        isFocused ? `contact-li-r contact-li-r-is-active` : `contact-li-r`
      }
      sx={
        !isFocused
          ? {
              pr: '.25rem',
              pt: 0,
              textIndent: '.75rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }
          : {
              pr: '.25rem',
              pt: 0,
              textIndent: '.75rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              mt: '.75rem',
              '.contact-label-r': {
                transform: 'translate(0)',
                fontSize: '1.15rem',
              },
              '.contact-child-container-r': {
                '.contact-input-r': {
                  borderColor: '#b7b7b7',
                },
              },
            }
      }
    >
      <FormLabel
        className="contact-label-r"
        sx={{
          color: '#b7b7b7',
          display: 'block',
          fontSize: '1.5rem',
          fontWeight: 200,
          textRendering: 'geometricPrecision',
          transform: 'translate(0.5rem, 2rem)',
          transition: 'all 0.4s ease-in-out',
        }}
      >
        {props.labelName}
      </FormLabel>
      <Box className="contact-child-container-r" sx={{ width: '100%' }}>
        {props.inputType === 'input' ? (
          <input
            className="contact-input-r"
            type="text"
            value={props.localValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(ev) => props.valCallback(ev, props.indicator)}
            style={{
              backgroundColor: 'transparent',
              outline: 'none',
              border: 'none',
              borderBottom: '4px solid rgba(183, 183, 183, 0.3)',
              width: '90%',
              color: '#b7b7b7',
              padding: '2rem 1rem',
              height: 0,
              fontSize: '1.25vw',
            }}
          />
        ) : (
          <textarea
            className={`contact-input-r contact-input-r-textarea`}
            style={{
              backgroundColor: 'transparent',
              outline: 'none',
              resize: 'none',
              border: 'none',
              borderBottom: '4px solid rgba(183, 183, 183, 0.3)',
              width: '90%',
              color: '#b7b7b7',
              padding: '2rem 1rem',
              height: 0,
              minHeight: '18vh',
              maxHeight: '18vh',
              fontSize: '1.3rem',
            }}
            value={props.localValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(ev) => props.valCallback(ev, 'message')}
          />
        )}
      </Box>
    </ListItem>
  );
};
