import { Link, ListItem, Typography } from '@mui/material';
import { Else, If, Then } from 'react-if';

interface ContactDescriptionProps {
  title: string;
  descriptor: string;
  mobileBrowserState?: boolean;
  isLink?: boolean;
}

export const ContactDescription = ({
  title,
  descriptor,
  isLink,
  mobileBrowserState,
}: ContactDescriptionProps) => {
  return (
    <ListItem
      className="contact-description-li"
      sx={{
        mt: '1rem',
        pr: '1rem',
        lineHeight: '2.25rem',
        transform: mobileBrowserState ? 'unset' : 'translate(-1rem, 0rem)',
        transition: 'all 0.4s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        alignItems: mobileBrowserState ? 'center' : 'flex-end',
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
          ...(mobileBrowserState
            ? {
                width: '100%',
                textAlign: 'center',
              }
            : { textAlign: 'right' }),
        }}
      >
        {title}
      </Typography>
      {isLink ? (
        <Link href={descriptor} target="_blank" rel="noopener">
          <If condition={descriptor.indexOf('mailto:') > -1}>
            <Then>{descriptor.split('mailto:')[1]}</Then>
            <Else>
              <If condition={descriptor.indexOf('tel:') > -1}>
                <Then>{descriptor.split('tel:')[1]}</Then>
                <Else>{descriptor}</Else>
              </If>
            </Else>
          </If>
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
          {descriptor}
        </Typography>
      )}
    </ListItem>
  );
};
