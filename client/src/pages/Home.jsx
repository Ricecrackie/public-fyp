import Navbar from "../components/Navbar";
import React , { useRef } from 'react'
import { Link } from 'react-router-dom';
import { Button, Stack, Typography, Box } from '@mui/material';
import { MuiTypography } from "../components/MuiTypography";
import { Style } from "../components/Theme";
import headerImage from "../assets/image/CYBER-SECURITY_header.png";
const SSSSexample = ['Good passwords are hard to memorize. A clever user could use a secret sharing scheme to generate a set of shares for a given password and store one share in his address book, one in his bank deposit safe, leave one share with a friend, etc. If one day he forgets his password, he can reconstruct it easily. Of course, writing passwords directly into the address book would pose a security risk, as it could be stolen by an "enemy". If a secret sharing scheme is used, the attacker has to steal many shares from different places.', 
'A dealer could send t shares, all of which are necessary to recover the original secret, to a single recipient, using t different channels. An attacker would have to intercept all t shares to recover the secret, a task which may be more difficult than intercepting a single message', 
'The director of a bank could generate shares for the bank\'s vault unlocking code and hand them out to his employees. Even if the director is not available, the vault can be opened, but only, when a certain number of employees do it together. Here secret sharing schemes allow the employment of not fully trusted people.'];

const Home = () => {
  return (
    <>
    <Navbar />
    <Box sx={Style.homeTextBox}>

    <div>
      <Typography variant="body1">
        Hi, we are CSE fyp group CD1 and we are going to implement Shamir's
        Secret Sharing Scheme (SSSS) in this web applicaiton.
      </Typography>
      <img src={headerImage} alt="My Image" />
    </div>

      <Typography variant="h2" component="h3">
        What is SSSS?
      </Typography>
      <Typography variant="body1">Shamir's Secret Sharing Scheme, named after its creator Adi Shamir, is a cryptographic algorithm used to divide a secret into multiple shares. The scheme ensures that the secret can only be reconstructed when a sufficient number of shares are combined, while keeping individual shares independent and providing no useful information about the secret.</Typography>
      <Typography variant="h2" component="h3">
        Overview:
      </Typography>
      <Typography>In the digital information age, we are all communicating, whether it is students attending classes, staff working in the office, or we chatting with netizens on social media, all of which are communicating with others. In some cases, we need to convey confidential information. How can we ensure that the confidential information can be successfully transmitted to the other party? Recently, in order to respond to environmental protection, everyone has encouraged the use of electronic statements, including government bills, electricity bills, gas bills, and banking monthly statements. Some bills, such as electronic water bills by the water department, use encrypted PDF files to protect your privacy. It may ask you to input your  ID card number to view the statement information. In fact, our information is used for identity authentication, and sometimes our information may be leaked. However, if all critical information is leaked, it will not be worth the loss. In the process of information transmission, data may be lost accidentally. How to accurately transmit information to the receiver even when some information is missing is a big question for the sender. Shamir’s Secret Sharing is one of the solutions. If two countries are engaged in war and intelligence personnel obtain important enemy intelligence, they then divide the three fragments into three agents. Even if one agent is intercepted and the other agents successfully transmit the intelligence fragments to the commander, the commander can use algorithms and protocols to calculate the lost fragments so that the commander can successfully obtain the intelligence. 
      </Typography>
      <Typography variant="h2" component="h3">
        Our Ojectives:
      </Typography>
      <Typography>The goal of this project is to design and implement a secret sharing website using Shamir’s Secret Sharing Scheme. Our system will use our protocol and self-derived algorithm to simulate a process of secret sharing, that is, formation of shares and message (text or image) reconstruction. </Typography>
      <Typography variant="h3" component="h4">
         Example:
      </Typography>
      <Typography>
       
        <ul>
      {SSSSexample.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
        </ul>
      </Typography>

      {/* <Typography>Good passwords are hard to memorize. A clever user could use a secret sharing scheme to generate a set of shares for a given password and store one share in his address book, one in his bank deposit safe, leave one share with a friend, etc. If one day he forgets his password, he can reconstruct it easily. Of course, writing passwords directly into the address book would pose a security risk, as it could be stolen by an "enemy". If a secret sharing scheme is used, the attacker has to steal many shares from different places.

A typical application of this scenario is the secure implementation of an encrypted backup system. Assuming that data recoveries are needed rarely, backup data can be public key encrypted -- this can be done automatically and without user interaction -- while the private recovery key is protected via secret sharing.

"A dealer could send t shares, all of which are necessary to recover the original secret, to a single recipient, using t different channels. An attacker would have to intercept all t shares to recover the secret, a task which may be more difficult than intercepting a single message" <a href="https://en.wikipedia.org/wiki/Secret_sharing">(Wikipedia)</a>.
The director of a bank could generate shares for the bank's vault unlocking code and hand them out to his employees. Even if the director is not available, the vault can be opened, but only, when a certain number of employees do it together. Here secret sharing schemes allow the employment of not fully trusted people.</Typography> */}
      {/* <Stack direction="row" spacing={2}>
      <Button variant="contained"> <Link to="/text" style={{ textDecoration: 'none' }}>Text Secret Sharing System</Link></Button> 
      <Button variant="contained"><Link to="/image" style={{ textDecoration: 'none' }}>Image Secret Sharing System</Link></Button> 
    </Stack> */}
    </Box>
    </>
  )
}

export default Home