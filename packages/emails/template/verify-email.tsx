import { Body, Head, Html, Link, Preview, Section, Tailwind, Text } from "@react-email/components";

interface Props {
    verifyLink: string;
}

export function VerifyAccountEmail({ verifyLink }: Props) {
    return (
        <Html>
            <Head />
            <Preview>Verify your email</Preview>
            <Tailwind>
                <Body>
                    <Text>Hi there 👋, </Text>
                    <Section>
                        <Text>Welcome to Blueprint!</Text>
                        <Text>
                            Before you get started, please verify your email address by clicking the
                            link below.
                        </Text>
                        <Link
                            className="underlined text-sm font-medium text-blue-500"
                            href={verifyLink}
                        >
                            Verify your email
                        </Link>
                        <Text>This token is only valid for the next 2 hours.</Text>
                    </Section>
                </Body>
            </Tailwind>
        </Html>
    );
}
