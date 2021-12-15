import NextLink from 'next/link'
import {Box, Link, Stack, useColorModeValue} from "@chakra-ui/react";
import {NAV_ITEMS} from "../data/menuItems";
import React from "react";
import {DesktopSubNav} from "./DesktopSubNav";


export const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem, idx) => (
                <Box key={navItem.label}>
                    <Box>
                        <NextLink href={ navItem.href ?? '#'} passHref>
                            <Link
                                p={2}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}>
                                { navItem.label }
                            </Link>
                        </NextLink>
                    </Box>
                </Box>
            ))}
        </Stack>
    );
};

/*
    TODO: Re-add on new Chakra release after bugfix
    https://github.com/chakra-ui/chakra-ui/issues/4328
                    <Popover
                        trigger={'hover'}
                        placement={'bottom-start'}
                        id='main-menu'
                    >
                        <PopoverTrigger>
                            <Box>
                                <NextLink href={ navItem.href ?? '#'} passHref>
                                    <Link
                                        p={2}
                                        fontSize={'sm'}
                                        fontWeight={500}
                                        color={linkColor}
                                        _hover={{
                                            textDecoration: 'none',
                                            color: linkHoverColor,
                                        }}>
                                        { navItem.label }
                                    </Link>
                                </NextLink>
                            </Box>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                id={`popover-content-${ idx }`}
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'sm'}
                                minW={'sm'}
                                isLazy
                            >
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
 */