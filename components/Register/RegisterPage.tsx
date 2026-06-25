import React from 'react';
import Stepper from './Stepper';
import PersonalDetails from './PersonalDetails';
import MoreAbout from './MoreAbout';
import Security from './Security';
import Review from './Review';
import { useSelector } from 'react-redux';
import Verify from './Verify';
import RegistrationSuccess from './registration-success';

const RegisterPage = () => {
	const { activeStep } = useSelector((state: any) => state.stepper);

	return (
		<>
			{activeStep === 1 && <PersonalDetails />}
			{activeStep === 2 && <MoreAbout />}
			{activeStep === 3 && <Security />}
			{activeStep === 4 && <Review />}
			{activeStep === 5 && <Verify />}
			{activeStep === 6 && <RegistrationSuccess />}
		</>
	);
};

export default RegisterPage;
