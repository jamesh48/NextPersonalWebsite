import { Link, ListItem, Typography } from '@mui/material';

interface ContactDescriptionProps {
  title: string;
  descriptor: string;
  mobileBrowserState?: boolean;
  isLink?: boolean;
}
export const ContactDescription = (props: ContactDescriptionProps) => {
  return (
    <ListItem
      className="contact-description-li"
      sx={{
        mt: '1rem',
        pr: '1rem',
        lineHeight: '2.25rem',
        transform: props.mobileBrowserState
          ? 'unset'
          : 'translate(-1rem, 0rem)',

        transition: 'all 0.4s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        alignItems: props.mobileBrowserState ? 'center' : 'flex-end',
      }}
    >
      <Typography
        variant="h4"
        className="contact-column-header-l"
        sx={{
          fontSize: '3rem',
          textRendering: 'geometricPrecision',
          fontWeight: 150,
          color: 'ivory',
          padding: '.25rem 0',
          ...(() => {
            if (props.mobileBrowserState) {
              return {
                width: '100%',
                textAlign: 'center',
              };
            }
            return {
              textAlign: 'right',
            };
          })(),
        }}
      >
        {props.title}
      </Typography>
      {props.isLink ? (
        <Link href={props.descriptor} target="_blank" rel="noopener">
          {(() => {
            if (props.descriptor.indexOf('mailto:') > -1) {
              return props.descriptor.split('mailto:')[1];
            }
            if (props.descriptor.indexOf('tel:') > -1) {
              return props.descriptor.split('tel:')[1];
            }
            return props.descriptor;
          })()}
        </Link>
      ) : (
        <Typography
          variant="h5"
          className="contact-column-descriptor-l"
          sx={{
            fontSize: '1.5rem',
            textRendering: 'geometricPrecision',
            textAlign: 'right',
            fontWeight: 150,
            color: 'ivory',
            padding: '.25rem 0',
          }}
        >
          {props.descriptor}
        </Typography>
      )}
    </ListItem>
  );
};
