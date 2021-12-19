import React from "react";
import CenterContainer from "../center/CenterContainer";
import {Box, Flex} from "@chakra-ui/react";

interface ThreeColumnLayoutProps {
    leftComponent: React.ReactNode,
    centerComponent: React.ReactNode,
    rightComponent: React.ReactNode
}

const ThreeColumnLayout: React.FC<ThreeColumnLayoutProps> = ({ leftComponent, centerComponent, rightComponent  }) => {
    return (
        <CenterContainer>
            <Flex pt={{ md: '10px' }}>
                <Box
                    display={{ base: 'none', lg: 'block' }}
                    width={{ md: 200 }}
                    mr={{ md: '20px' }}
                >
                    { leftComponent }
                </Box>
                <Box
                    flex={ 1 }
                    justifyContent={ 'flex-end' }
                >
                    { centerComponent }
                </Box>
                <Box
                    display={{ base: 'none', md: 'block' }}
                    width={{ md: 250 }}
                    ml={{ md: '20px' }}
                >
                    { rightComponent }
                </Box>
            </Flex>
        </CenterContainer>
    )
}

export default ThreeColumnLayout;