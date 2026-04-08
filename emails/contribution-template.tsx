import { Body, Container, Head, Heading, Html, Img, Preview, Section, Text } from "@react-email/components";

interface ContributionEmailProps {
  comment?: string;
  contributionId?: number;
}

const baseUrl = process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL : "";

export const ContributionEmail = ({
  comment, contributionId
}: ContributionEmailProps) => (
  <Html>
    <Head />
    <Preview>New Contribution Added</Preview>
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
        <Heading style={h1}>New Contribution added</Heading>
        <Text style={heroText2}>
          Check out the contribution below that was just added.
        </Text>
        <Text>
          <a href={`${baseUrl}/dashboard/contributions/${contributionId}`}>View new contribution here.</a>
        </Text>

        <Section style={codeBox}>
          <Text style={confirmationCodeText}>{comment}</Text>
        </Section>

      </Container>
    </Body>
  </Html>
);

export default ContributionEmail;

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
  fontSize: "12px",
  textAlign: "center" as const,
  verticalAlign: "middle",
};

const text = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
};
