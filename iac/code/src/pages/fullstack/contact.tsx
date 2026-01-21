import { Box, List } from '@mui/material'
import { useMobileBrowserCheck } from '@shared/globalUtils'

import { ContactDescription } from '../../features/ContactComponents/ContactDescription'

const ContactForm = (props: { mobileBrowser: boolean }) => {
	const mobileBrowserState = useMobileBrowserCheck()
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
		)
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
					<Box sx={{ flex: 1, backgroundColor: 'transparent' }}>
						<List sx={{ display: 'flex', flexDirection: 'column' }}>
							<ContactDescription
								title="Location"
								descriptor="Boulder, Colorado"
							/>

							<ContactDescription
								title="E-Mail"
								isLink
								descriptor="mailto:jameshrivnak4@gmail.com"
							/>
							<ContactDescription
								title="Phone"
								descriptor="tel:303-517-2085"
								isLink
							/>
						</List>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default ContactForm
