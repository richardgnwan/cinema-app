import React from 'react'
import { Box } from '@mui/system';
import { Backdrop, CircularProgress, Stack, Typography } from '@mui/material';
import { useNavigate } from "react-router"
import { useAuth } from '../../hooks/auth';

const RouteMiddleware = (Page) => {
	return function Middleware(props) {
		const { userNow } = useAuth()
		const navigate = useNavigate();

		if (userNow) {
			if (userNow.email === "admin@gmail.com") {
				return <Page {...props} />
			} else {
				navigate("/");

				return <Box>
					<Backdrop
					sx={{ color: 'secondary.main', zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={true}
					// onClick={handleClose}
					>
						<Stack direction="row" spacing={2}>
							<CircularProgress color="inherit" />
							<Typography fontSize={28} fontWeight={600} color="primary.contrastText"></Typography>
						</Stack>
					</Backdrop>
				</Box>;
			}
		}
		else {
			navigate("/login");

			return <Box>
				<Backdrop
        sx={{ color: 'secondary.main', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        // onClick={handleClose}
				>
					<Stack direction="row" spacing={2}>
						<CircularProgress color="inherit" />
						<Typography fontSize={28} fontWeight={600} color="primary.contrastText"></Typography>
					</Stack>
				</Backdrop>
			</Box>;
		}
	}
}

export default RouteMiddleware;
