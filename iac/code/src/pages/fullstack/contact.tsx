import axios from 'axios';
import { Box, Button, List, ListItem, OutlinedInput } from '@mui/material';
import { useEffect, useState } from 'react';
import { ContactDescription } from '../../features/ContactComponents/ContactDescription';
import { ContactInput } from '../../features/ContactComponents/ContactInput';
import { useMobileBrowserCheck } from '@shared/globalUtils';

const ContactForm = (props: { mobileBrowser: boolean }) => {
  useEffect(() => {
    document.getElementById('minesweeper-proxy-root')?.remove();
  }, []);

  const [formValues, setFormValues] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    linkedin: '',
    message: '',
  });

  const valCallback = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    indicator: string
  ) => {
    setFormValues((ex) => {
      return { ...ex, [indicator]: ev.target.value };
    });
  };

  // const handleRecommendations = async () => {
  //   const { data: serverRecommendationsResponse } = await axios.get(
  //     "/api/recommendations"
  //   );
  //   console.log(JSON.stringify(serverRecommendationsResponse));
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data: serverSubmitResponse } = await axios.post(
        '/api/sendemail',
        null,
        {
          params: formValues,
        }
      );
      console.log('serverReponse-> ', serverSubmitResponse);
    } catch (err) {
      console.log(err);
    }
    setFormValues(() => {
      return {
        fullName: '',
        phoneNumber: '',
        email: '',
        linkedin: '',
        message: '',
      };
    });
  };

  const mobileBrowserState = useMobileBrowserCheck();
  if (mobileBrowserState) {
    return (
      <Box
        className="contact-container--Mobile"
        sx={{ height: '95vh', display: 'flex', alignItems: 'center' }}
      >
        <Box
          className={`contact-root contact-root--Mobile`}
          sx={{ width: '100%', margin: '0 auto' }}
        >
          <Box
            className="contact-wrapper"
            sx={{
              boxSizing: 'border-box !important',
              width: '100%',
              bgColor: 'red',
              display: 'flex',
            }}
          >
            <Box
              className="contact-column contact-column-l"
              sx={{
                flex: 1,
                backgroundColor: 'transparent',
                textAlign: 'center',
              }}
            >
              <List>
                <ContactDescription
                  title="Location"
                  descriptor="Boulder, Colorado"
                  mobileBrowserState={mobileBrowserState}
                />

                <ContactDescription
                  title="E-Mail"
                  descriptor="mailto:jameshrivnak4@gmail.com"
                  mobileBrowserState={mobileBrowserState}
                  isLink={true}
                />
                <ContactDescription
                  title="Phone"
                  descriptor="tel:303-517-2085"
                  mobileBrowserState={mobileBrowserState}
                  isLink={true}
                />
                <ContactDescription
                  title="linkedin"
                  descriptor="https://linkedin.com/in/james-hrivnak"
                  mobileBrowserState={mobileBrowserState}
                  isLink={true}
                />
              </List>

              {/* <p style={{ color: "ivory", lineHeight: 1.5 }}>
            https://foundationinc.co/contact
          </p> */}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
  return (
    <Box>
      <Box
        className={
          props.mobileBrowser
            ? `contact-root contact-root--Mobile`
            : `contact-root`
        }
        sx={{ width: '75%', margin: '0 auto' }}
      >
        <Box
          className="contact-wrapper"
          sx={{
            boxSizing: 'border-box !important',
            width: '100%',
            display: 'flex',
          }}
        >
          <Box
            className="contact-column contact-column-l"
            sx={{ flex: 1, backgroundColor: 'transparent' }}
          >
            <List>
              <ContactDescription
                title="Location"
                descriptor="Boulder, Colorado"
              />

              <ContactDescription
                title="E-Mail"
                descriptor="jameshrivnak4@gmail.com"
              />
              <ContactDescription title="Phone" descriptor="303-517-2085" />
            </List>

            {/* <p style={{ color: "ivory", lineHeight: 1.5 }}>
              https://foundationinc.co/contact
            </p> */}
          </Box>

          <Box
            className={`contact-column contact-column-r`}
            sx={{
              flex: 1,
              display: 'flex',
              zIndex: 1,
              backgroundColor: 'transparent',
            }}
          >
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="contact-column-form-r"
              style={{ width: '100%', borderLeft: '1px solid ivory' }}
            >
              <Box className="contact-column-form-container-r">
                <List
                  className="contact-column-form-ul-r"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <ContactInput
                    labelName="Name"
                    inputType="input"
                    localValue={formValues.fullName}
                    valCallback={valCallback}
                    indicator="fullName"
                  />
                  <ContactInput
                    labelName="Phone Number"
                    inputType="input"
                    localValue={formValues.phoneNumber}
                    valCallback={valCallback}
                    indicator="phoneNumber"
                  />
                  <ContactInput
                    labelName="Email Address"
                    inputType="input"
                    localValue={formValues.email}
                    valCallback={valCallback}
                    indicator="email"
                  />
                  <ContactInput
                    labelName="LinkedIn"
                    inputType="input"
                    localValue={formValues.linkedin}
                    valCallback={valCallback}
                    indicator="linkedin"
                  />
                  <ContactInput
                    labelName="Your Message: "
                    inputType="textArea"
                    localValue={formValues.message}
                    valCallback={valCallback}
                    indicator="message"
                  />
                  {/* <li className={`contact-li-r contact-li-submit`}>
                    <input type='button' value='test' onClick={handleRecommendations}/>
                  </li> */}
                  <ListItem
                    className={`contact-li-r contact-li-submit`}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      pr: '0.25rem',
                      pt: 0,
                      textIndent: '0.75em',
                      justifyContent: 'center',
                    }}
                  >
                    <Button
                      type="submit"
                      className="contact-submit-r"
                      sx={{
                        color: '#b7b7b7',
                        border: 'none',
                        height: '2.5rem',
                        width: '35%',
                        borderBottom: '1.5px solid rgba(183, 183, 183, 0.3)',
                        borderBottomLeftRadius: '15%',
                        borderBottomRightRadius: '15%',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          bgcolor: 'ivory',
                          opacity: 0.75,
                          color: 'darkslategray',
                          borderBottom: '3px inset #b7b7b7',
                          borderRadius: 0,
                        },
                      }}
                    >
                      Submit
                    </Button>
                  </ListItem>
                </List>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactForm;

{
  /* <AdminFormStoreProvider>
<AdminForm/>
</AdminFormStoreProvider> */
}
