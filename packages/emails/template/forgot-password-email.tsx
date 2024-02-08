import { Body, Head, Html, Link, Preview, Section, Tailwind, Text } from "@react-email/components";

interface Props {
    resetLink: string;
}

export function ResetPasswordEmail({ resetLink }: Props) {
    return (
        <Html>
            <Head />
            <Preview>Reset your password</Preview>
            <Tailwind>
                <Body>
                    <Text>Hi there 👋, </Text>
                    <Section>
                        <Text>
                            You recently requested to reset your password for your Blueprint
                            account. Click the link below to reset it.
                        </Text>
                        <Link
                            className="text-sm font-medium text-blue-500 underline underline-offset-2"
                            href={resetLink}
                        >
                            Reset password
                        </Link>
                        <Text>
                            If you did not request a password reset, please ignore this email or
                            reach out to support.
                        </Text>
                        <Text>This token is only valid for the next 2 hours.</Text>
                    </Section>
                </Body>
            </Tailwind>
        </Html>
    );
}
