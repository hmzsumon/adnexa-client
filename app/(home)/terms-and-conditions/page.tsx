import ContactUs from '@/components/PrivacyPolicy/ContactUs';
import PrivacyBanner from '@/components/PrivacyPolicy/PrivacyBanner';
import React from 'react';

const TermsAndConditions = () => {
	return (
		<div>
			<div className='mt-0.3'>
				<PrivacyBanner title='Terms And Conditions' />
			</div>
			<div className='px-10 py-4 grid md:grid-cols-5 gap-4 bg-white '>
				<div className=' md:col-span-3 space-y-4'>
					<div>
						<h2 className='text-xl text-gray-700 font-bold my-2'>
							Click By Cash Terms and Conditions
						</h2>
					</div>

					<div>
						<h2 className='text-xl text-gray-700 font-bold my-2'>
							1. Acceptance of Terms
						</h2>
						<p className=' text-xs text-gray-600'>
							By registering with Click By Cash, you agree to be bound by these
							Terms and Conditions. If you do not agree with any part of these
							terms, you must not use our services.
						</p>
					</div>

					<div>
						<h2 className='text-xl text-gray-700 font-bold my-2'>
							2. Eligibility
						</h2>
						<p className=' text-xs text-gray-600'>
							To be eligible to use Click By Cash, you must be at least 18 years
							old or the age of majority in your jurisdiction. By using our
							services, you represent and warrant that you meet this age
							requirement.
						</p>
					</div>

					<div>
						<h2 className='text-xl text-gray-700 font-bold my-2'>
							3. Account Registration
						</h2>
						<p className=' text-xs text-gray-600'>
							You must provide accurate and complete information during
							registration. You are responsible for maintaining the
							confidentiality of your account and password. You agree to notify
							Click By Cash immediately of any unauthorized use of your account.
						</p>
					</div>

					<div>
						<h2 className='text-xl text-gray-700 font-bold my-2'>
							4. Use of Services
						</h2>
						<div className=' space-y-2'>
							<p className=' text-xs text-gray-600'>
								Payments will be made to users via the payment method specified
								in their account. A minimum threshold amount must be reached
								before a payment is issued.
							</p>
						</div>
					</div>

					<div>
						<h2 className='text-xl text-gray-700 font-bold my-2'>5. Payment</h2>
						<p className=' text-xs text-gray-600'>
							You agree not to use our platform for any unlawful or prohibited
							purpose. You also agree not to engage in any activity that
							interferes with or disrupts the operation of our platform or
							violates the rights of others.
						</p>
					</div>

					<div>
						<h2 className='text-xl text-gray-700 font-bold my-2'>
							6. Termination
						</h2>
						<p className=' text-xs text-gray-600'>
							Click By Cash reserves the right to suspend or terminate any
							account at its discretion, without notice, for violations of these
							terms. Users can terminate their accounts at any time by
							contacting customer support.
						</p>
					</div>

					<div>
						<h2 className='text-xl text-gray-700 font-bold my-2'>
							7. Intellectual Property
						</h2>
						<p className=' text-xs text-gray-600'>
							All content provided through Click By Cash, including
							advertisements, text, graphics, and logos, is the property of
							Click By Cash or its licensors. Users are granted a limited,
							non-exclusive, and non-transferable license to access and use the
							platform.
						</p>
					</div>

					<div>
						<h2 className='text-xl text-gray-700 font-bold my-2'>
							8. Limitation of Liability
						</h2>
						<p className=' text-xs text-gray-600'>
							Click By Cash is not liable for any indirect, incidental, or
							consequential damages arising from the use of our services. Our
							liability in connection with the use of our platform is limited to
							the amount paid to you in the preceding 12 months.
						</p>
					</div>

					<div>
						<h2 className='text-xl text-gray-700 font-bold my-2'>
							9. Changes to Terms
						</h2>
						<p className=' text-xs text-gray-600'>
							Click By Cash reserves the right to modify these Terms and
							Conditions at any time. Any changes will be effective immediately
							upon posting on our website. Your continued use of the platform
							after any changes signifies your acceptance of the new terms.
						</p>
					</div>

					<div>
						<h2 className='text-xl text-gray-700 font-bold my-2'>
							10. Governing Law
						</h2>
						<p className=' text-xs text-gray-600'>
							These terms shall be governed by and construed in accordance with
							the laws of [Your Country/State]. Any disputes arising out of or
							in connection with these terms shall be subject to the exclusive
							jurisdiction of the courts of [Your Country/State].
						</p>
					</div>

					<div>
						<h2 className='text-xl text-gray-700 font-bold my-2'>
							11. Changes to Terms and Conditions
						</h2>
						<p className=' text-xs text-gray-600'>
							We reserve the right to update or modify these Terms and
							Conditions at any time without prior notice. Any changes will be
							effective immediately upon posting on our platform. Your continued
							use of our services after the posting of changes constitutes your
							acceptance of such changes.
						</p>
					</div>

					<div>
						<h2 className='text-xl text-gray-700 font-bold my-2'>
							Do you need extra help?
						</h2>
						<p className=' text-xs text-gray-600'>
							If you have any questions or concerns about this Privacy Policy or
							our data practices, please reach out to us at
							<br />
							<a
								href='mailto:service@clickbycash.com'
								className='text-cbc-orange font-bold'
							>
								{' '}
								Support Email
							</a>
						</p>
					</div>
				</div>
				{/* Start Contact Us */}
				{/* <div className=' md:col-span-2'>
					<ContactUs />
				</div> */}
				{/* End Contact Us */}
			</div>
		</div>
	);
};

export default TermsAndConditions;
