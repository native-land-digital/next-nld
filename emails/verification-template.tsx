import { Body, Container, Column, Head, Heading, Html, Img, Link, Preview, Row, Section, Text } from "@react-email/components";

interface SlackConfirmEmailProps {
  verification_key?: string;
  email?: string;
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

export const SlackConfirmEmail = ({
  verification_key, email
}: SlackConfirmEmailProps) => (
  <Html>
    <Head />
    <Preview>Confirm your email address</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src={`${baseUrl}/public/images/general/nld-logo.png`}
            width="120"
            height="36"
            alt="Native Land Digital"
          />
        </Section>
        <Heading style={h1}>Confirm your email address</Heading>
        <Text style={heroText}>
          Welcome to Native Land Digital!
        </Text>
        <Text style={heroText2}>
          Your confirmation code is below - enter it in your open browser window
          and we'll help you get signed in.
        </Text>
        <Text>
          <a href={`${baseUrl}/auth/verify-email?email=${email}`}>Visit this link to verify, if you've closed the browser.</a>
        </Text>

        <Section style={codeBox}>
          <Text style={confirmationCodeText}>{verification_key}</Text>
        </Section>

        <Text style={text}>
          If you didn't request this email, there's nothing to worry about, you
          can safely ignore it.
        </Text>

      </Container>
    </Body>
  </Html>
);

export default SlackConfirmEmail;

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "0px 20px",
};

const logoContainer = {
  marginTop: "32px",
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "36px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
};

const heroText = {
  fontSize: "20px",
  lineHeight: "28px",
  marginBottom: "10px",
};

const heroText2 = {
  fontSize: "15px",
  lineHeight: "20px",
  marginBottom: "20px",
}

const codeBox = {
  background: "rgb(245, 244, 245)",
  borderRadius: "4px",
  marginBottom: "30px",
  padding: "40px 10px",
};

const confirmationCodeText = {
  fontSize: "20px",
  textAlign: "center" as const,
  verticalAlign: "middle",
};

const text = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
};
