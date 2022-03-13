import React, {FC} from "react";
import Card from "@components/layout/components/card/Card";
import {Flex, Heading, Spacer} from "@chakra-ui/react";


interface HomeFeedHeaderProps {

}

const HomeFeedHeader: FC<HomeFeedHeaderProps> = () => {
    return (
        <Card>
            <Flex>
                <Heading
                    as="h2"
                    size="md"
                    maxHeight={ "2.8rem" }
                    sx={{ overflow: 'hidden' }}
                    pb='10px'
                >
                    Latest questions
                </Heading>
                <Spacer />
            </Flex>
        </Card>
    )
}

export default HomeFeedHeader;
