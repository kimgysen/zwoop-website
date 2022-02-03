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
                    width={{ md: '15%' }}
                    mr={{ md: '20px' }}
                >
                    { leftComponent }
                </Box>
                <Box
                    flex={ 1 }
                    justifyContent={ 'flex-end' }
                    width={{ sm: '90%', md: '60%' }}
                >
                    { centerComponent }
                </Box>
                <Box
                    display={{ base: 'none', md: 'block' }}
                    width={{ md: '30%' }}
                    ml={{ md: '20px' }}
                >
                    { rightComponent }
                </Box>
            </Flex>
        </CenterContainer>
    )
}

export default ThreeColumnLayout;