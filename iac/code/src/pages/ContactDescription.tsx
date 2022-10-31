import { ListItem, Typography } from '@mui/material';

interface ContactDescriptionProps {
  title: string;
  descriptor: string;
}
export const ContactDescription = (props: ContactDescriptionProps) => {
  return (
    <ListItem
      className="contact-description-li"
      sx={{
        mt: '1rem',
        pr: '1rem',
        lineHeight: '2.25rem',
        transform: 'translate(-1rem, 0rem)',
        transition: 'all 0.4s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      <Typography
        variant="h4"
        className="contact-column-header-l"
        sx={{
          fontSize: '3rem',
          textRendering: 'geometricPrecision',
          textAlign: 'right',
          fontWeight: 150,
          color: 'ivory',
          padding: '.25rem 0',
        }}
      >
        {props.title}
      </Typography>
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
    </ListItem>
  );
};
