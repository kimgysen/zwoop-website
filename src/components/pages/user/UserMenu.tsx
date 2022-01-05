import {FC} from "react";
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import Card from "@components/layout/components/card/Card";


interface UserMenuProps {
    userId: string
}

const UserMenu: FC<UserMenuProps> = ({ userId }) => {
    return (
        <Card>
            <Tabs id='tabs'>
                <TabList>
                    <Tab>Reviews</Tab>
                    <Tab>Answers</Tab>
                    <Tab>Questions</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <p>User reviews here</p>
                    </TabPanel>
                    <TabPanel>
                        <p>Answers here</p>
                    </TabPanel>
                    <TabPanel>
                        <p>Questions here</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Card>
    )
}

export default UserMenu;
