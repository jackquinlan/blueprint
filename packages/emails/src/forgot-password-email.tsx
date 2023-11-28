import * as React from "react";

import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";

interface Props {
    resetLink: string;
    name: string;
}

export function ResetPasswordEmail({ name, resetLink }: Props) {
    return (
        <Html>
            <Head />
            <Preview>Blueprint - Reset your password</Preview>
            <Tailwind>
                <Body className="bg-[#f6f9fc] px-0 py-[10px]">
                    <Container className="border border-[#f0f0f0] bg-[#ffffff] p-[45px]">
                        <Text className="text-[24px] font-semibold">Blueprint</Text>
                        <Section>
                            <Text className="text-[16px] leading-[26px] text-[#404040]">
                                Hi {name},
                            </Text>
                            <Text className="text-[16px] leading-[26px] text-[#404040]">
                                You recently requested to reset your password for your Blueprint
                                account. Click the button below to reset it.
                            </Text>
                            <Button
                                className="mt-[20px] block w-[210px] rounded-[4px] bg-black p-[14px] text-center text-[15px] font-medium text-[#fff]"
                                href={resetLink}
                            >
                                Reset password
                            </Button>
                            <Text className="text-[16px] leading-[26px] text-[#404040]">
                                If you did not request a password reset, please ignore this email or
                                reach out to support.
                            </Text>
                            <Text className="text-[16px] leading-[26px] text-[#404040]">
                                This token is only valid for the next 1 hour.
                            </Text>
                            <Text className="text-[16px] leading-[26px] text-[#404040]">
                                Thanks,
                            </Text>
                            <Text className="text-[16px] leading-[26px] text-[#404040]">
                                The Blueprint Team
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
